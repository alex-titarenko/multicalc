//
//  WebViewExtensions.swift
//  multicalc
//
//  Created by Alex Titarenko on 4/2/22.
//

import SwiftUI
import WebKit

extension WebView {
    func makeWebView(context: Context) -> WKWebView {
        guard let url = URL(string: self.webViewModel.url) else {
            return WKWebView()
        }
        
        let config = WKWebViewConfiguration()
        
        config.limitsNavigationsToAppBoundDomains = false
        config.preferences.setValue(true, forKey: "standalone")
        
        config.setURLSchemeHandler(AppShemeHandler(contentRootDir: "assets/www"), forURLScheme: "app")
        
        let userContentController = WKUserContentController()
        
        for styleSheet in self.webViewModel.styleSheets {
            let script = """
              var style = document.createElement('style');
              style.innerHTML = '\(styleSheet)';
              document.head.appendChild(style);
            """
            
            let userScript = WKUserScript(source: script, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
            userContentController.addUserScript(userScript)
        }


        config.userContentController = userContentController
        
        let request = URLRequest(url: url)
        
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        
        #if os(iOS)
        webView.scrollView.bounces = false
        webView.scrollView.alwaysBounceHorizontal = false
        webView.scrollView.alwaysBounceVertical = false
        webView.isOpaque = false
        #endif
        
        webView.addObserver(context.coordinator, forKeyPath: #keyPath(WKWebView.title), options: .new, context: nil)
        if #available(iOS 15.0, macOS 12.0, *) {
            webView.addObserver(context.coordinator, forKeyPath: #keyPath(WKWebView.themeColor), options: .new, context: nil)
        }
        
        webView.allowsBackForwardNavigationGestures = true
        webView.load(request)
        
        #if DEBUG
        if #available(iOS 16.4, macOS 13.3, *) {
            webView.isInspectable = true
        }
        #endif
        
        return webView
    }
    
    static func destroyWebView(_ webView: WKWebView, _ coordinator: Coordinator) {
        webView.removeObserver(coordinator, forKeyPath: #keyPath(WKWebView.title))
        if #available(iOS 15.0, macOS 12.0, *) {
            webView.removeObserver(coordinator, forKeyPath: #keyPath(WKWebView.themeColor))
        }
    }
    
    class Coordinator : NSObject, WKNavigationDelegate {
        @ObservedObject private var webViewModel: WebViewModel
        private let parent: WebView
        
        init(_ parent: WebView, _ webViewModel: WebViewModel) {
            self.parent = parent
            self.webViewModel = webViewModel
        }
        
        func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        }
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            webViewModel.title = webView.title ?? ""
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        }
        
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            // Check for links.
            if navigationAction.navigationType == .linkActivated {
                // Make sure the URL is set.
                guard let url = navigationAction.request.url else {
                    decisionHandler(.allow)
                    return
                }

                // Check for the scheme component.
                let components = URLComponents(url: url, resolvingAgainstBaseURL: false)
                
                if ["http", "https", "mailto"].contains(components?.scheme) {
                    // Open the link in the external browser.
                    UIApplication.shared.open(url)
                    
                    // Cancel the decisionHandler because we managed the navigationAction.
                    decisionHandler(.cancel)
                } else {
                    decisionHandler(.allow)
                }
            } else {
                decisionHandler(.allow)
            }
        }
        
        override func observeValue(
            forKeyPath keyPath: String?,
            of object: Any?,
            change: [NSKeyValueChangeKey : Any]?,
            context: UnsafeMutableRawPointer?) {
                
            switch keyPath {
                case "title":
                    webViewModel.title = (change?[.newKey] as! String)
                
                case "themeColor":
                    webViewModel.themeColor = (change?[.newKey] as! UIColor)
            
            case .none: break;
            case .some(_): break;
            }
        }
    }
}
