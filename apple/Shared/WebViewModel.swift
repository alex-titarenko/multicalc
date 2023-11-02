//
//  WebViewModel.swift
//  multicalc
//
//  Created by Alex Titarenko on 4/2/22.
//

import Foundation
#if !os(macOS)
import UIKit
#endif

class WebViewModel : ObservableObject {
    @Published var title: String = ""
    @Published var themeColor: UIColor = .clear
    
    var url: String
    
    var styleSheets: [String]
    
    init(url: String, styleSheets: [String] = []) {
        self.url = url
        self.styleSheets = styleSheets
    }
}
