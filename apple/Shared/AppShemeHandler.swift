//
//  AppShemeHandler.swift
//  noteshub
//
//  Created by Alex Titarenko on 10/26/22.
//

import WebKit

let contentTypeMap = [
    "html": "text/html; charset=utf-8",
    "css": "text/css; charset=utf-8",
    "json": "application/json; charset=utf-8",
    "js": "application/javascript; charset=utf-8",
    "map": "text/plain",
    "woff2": "font/woff2",
    "svg": "image/svg+xml",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg"
]

class AppShemeHandler : NSObject, WKURLSchemeHandler {
    var contentRootDir: String
    var staticAssets: [String]
    
    init(contentRootDir: String) {
        self.contentRootDir = contentRootDir
        self.staticAssets = AppShemeHandler.GenerateStaticAssetsList(contentRootDir)
    }
    
    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        let originalRequest = urlSchemeTask.request
        let originalUrl = originalRequest.url!
        let requestPath = originalUrl.path
        let isStaticAsset = self.staticAssets.contains { staticAsset in requestPath.hasPrefix(staticAsset) }
        
        let url: URL
        let contentType: String
        
        if (isStaticAsset) {
            let path = String(originalUrl.path[..<originalUrl.path.lastIndex(of: "/")!])
            let subdirectory = "\(self.contentRootDir)\(path)"
            guard let staticAssetUrl = Bundle.main.url(
                forResource: originalUrl.pathComponents.last,
                withExtension: nil,
                subdirectory: subdirectory) else {
                // This may occur if you start inspecting the content in the browser
                // and it will request map files that do not exist
                urlSchemeTask.didReceive(notFoundResponse(originalRequest.url!))
                urlSchemeTask.didFinish()
                return
            }
            
            url = staticAssetUrl
            contentType = contentTypeMap[originalUrl.pathExtension]!
        } else {
            url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: self.contentRootDir)!
            contentType = "text/html; charset=utf-8"
        }
        
        do {
            let data = try Data(contentsOf: url)
            
            let headers: [String : String]? = [
                "Content-Type": contentType,
                "Cache-Control": "no-cache, max-age=0, must-revalidate, no-store"
            ]
            
            let newResponse = HTTPURLResponse(
                url: originalRequest.url!,
                statusCode: 200,
                httpVersion: "HTTP/1.1",
                headerFields: headers
            )

            urlSchemeTask.didReceive(newResponse!)
            urlSchemeTask.didReceive(data)
        } catch {
            urlSchemeTask.didReceive(notFoundResponse(originalRequest.url!))
        }
        
        urlSchemeTask.didFinish()
    }
    
    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
    }
    
    func notFoundResponse(_ url: URL) -> HTTPURLResponse {
        let notFoundResponse = HTTPURLResponse(
            url: url,
            statusCode: 404,
            httpVersion: "HTTP/1.1",
            headerFields: ["content-type": ""]
        )
        
        return notFoundResponse!
    }
    
    private static func GenerateStaticAssetsList(_ contentRootDir: String) -> [String] {
        let propertyKeys: [URLResourceKey] = [
            .isRegularFileKey,
            .isDirectoryKey
        ]
        let fileManager = FileManager.default
        let targetPath = Bundle.main.url(forResource: contentRootDir, withExtension: nil)!
        
        do {
            let folderItems = try fileManager.contentsOfDirectory(
                at: targetPath,
                includingPropertiesForKeys: propertyKeys
            )
            
            let staticAssets = folderItems.map {
                let itemName = $0.lastPathComponent
                let folderItemAttributes = try? $0.resourceValues(forKeys: Set(propertyKeys))
                
                if (folderItemAttributes != nil && folderItemAttributes!.isDirectory!) {
                    return "/\(itemName)/"
                } else {
                    return "/\(itemName)"
                }
            }
            
            return staticAssets
        } catch {
            print(error)
            return []
        }
    }
}
