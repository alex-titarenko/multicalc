//
//  WebView.swift
//  multicalc
//
//  Created by Alex Titarenko on 4/2/22.
//

import SwiftUI
import WebKit

struct WebView: NSViewRepresentable {
    typealias NSViewType = WKWebView
    
    @ObservedObject var webViewModel: WebViewModel
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self, webViewModel)
    }
    
    func makeNSView(context: Context) -> WKWebView {
        return self.makeWebView(context: context)
    }
    
    func updateNSView(_ nsView: WKWebView, context: Context) {
    }
    
    static func dismantleNSView(_ nsView: WKWebView, coordinator: Coordinator) {
        WebView.destroyWebView(nsView, coordinator)
    }
}
