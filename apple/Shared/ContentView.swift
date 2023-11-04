//
//  ContentView.swift
//  Shared
//
//  Created by Alex Titarenko on 4/1/22.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var webViewModel: WebViewModel
    
    init() {
        var styleSheets = [
            "html, body { height: 100vh !important; }",
            "#preloader { height: 100vh !important; }"
        ]
        
        #if os(macOS)
        styleSheets.append(contentsOf: [
            "mat-toolbar.mat-toolbar.mat-toolbar-single-row { padding-top: 38px !important; }"
        ])
        #endif
        
        self.webViewModel = WebViewModel(
            url: "app://noteshub.app",
            styleSheets: styleSheets
        )
    }
    
    var body: some View {
        ZStack(alignment: .top) {
            WebView(webViewModel: webViewModel)
                .navigationTitle(webViewModel.title)
            
            #if os(macOS)
            Rectangle()
                .fill(Color.black.opacity(0.05))
                .frame(height: 28.0)
            #endif
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
