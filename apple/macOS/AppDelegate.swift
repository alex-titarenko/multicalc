//
//  File.swift
//  multicalc (macOS)
//
//  Created by Alex Titarenko on 5/11/22.
//

import Foundation
import SwiftUI

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}
