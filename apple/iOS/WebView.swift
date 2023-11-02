//
//  WebView.swift
//  multicalc
//
//  Created by Alex Titarenko on 4/2/22.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {    
    typealias UIViewType = WKWebView
    
    @ObservedObject var webViewModel: WebViewModel
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self, webViewModel)
    }
    
    func makeUIView(context: Context) -> WKWebView {
        return self.makeWebView(context: context)
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
    }
    
    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        WebView.destroyWebView(uiView, coordinator)
    }
}
