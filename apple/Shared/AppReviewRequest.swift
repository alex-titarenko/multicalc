//
//  AppReviewRequest.swift
//  noteshub
//
//  Created by Alex Titarenko on 5/7/22.
//

import Foundation
import SwiftUI
import StoreKit

class AppReviewRequest {
    private static let threshold = 5
    @AppStorage("runsSinceLastRequest") private static var runsSinceLastRequest = 0
    @AppStorage("version") private static var version = ""
    
    static func requestReviewIfNeeded() {
        runsSinceLastRequest += 1
        let appBuild = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as! String
        let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as! String
        let thisVersion = "\(appVersion) build:\(appBuild)"
        
        print("Run Count: \(runsSinceLastRequest)")
        print("Version: \(thisVersion)")
        
        if (thisVersion != version) {
            if (runsSinceLastRequest >= threshold) {
                #if os(macOS)
                SKStoreReviewController.requestReview()
                #elseif os(iOS)
                let sceneSelector: (UIScene) -> Bool = { uiScene in
                    uiScene.activationState == .foregroundActive || uiScene.activationState == .foregroundInactive
                }
                
                if let scene = UIApplication.shared.connectedScenes.first(where: sceneSelector) as? UIWindowScene {
                    SKStoreReviewController.requestReview(in: scene)
                }
                #endif
                
                version = thisVersion
                runsSinceLastRequest = 0
            }
        } else {
            runsSinceLastRequest = 0
        }
    }
}
