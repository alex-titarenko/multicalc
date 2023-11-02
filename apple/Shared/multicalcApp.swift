//
//  multicalcApp.swift
//  Shared
//
//  Created by Alex Titarenko on 4/1/22.
//

import SwiftUI

@main
struct multicalcApp: App {
    @Environment(\.scenePhase) var scenePhase
    #if os(macOS)
    @NSApplicationDelegateAdaptor() private var applicationDelegate: AppDelegate
    #endif
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 350, minHeight: 350)
                .edgesIgnoringSafeArea(.all)
                .onAppear {
                    AppReviewRequest.requestReviewIfNeeded()
                }
        }
        #if os(macOS)
        .windowStyle(.hiddenTitleBar)
        #endif
    }
}
