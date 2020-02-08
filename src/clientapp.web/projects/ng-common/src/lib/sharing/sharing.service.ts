import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  constructor(private snackBar: MatSnackBar) {
  }

  public shareUrl(url: string): void {
    const nav: any = navigator;

    if (nav.share) {
      nav.share({ url: url });
      return;
    }

    this.copyToClipboard(url);
    this.snackBar.open('Message has been copied to clipboard', 'Dismiss', {
      duration: 3000
    });
  }

  private copyToClipboard(text: string): void {
    const textArea = this.createTextArea(text);
    this.selectText(textArea);
    this.execCopy(textArea);
  }

  private createTextArea(text: string): HTMLTextAreaElement {
    const textArea = <HTMLTextAreaElement>document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    return textArea;
  }

  private isOS(): boolean {
    return navigator.userAgent.match(/ipad|iphone/i) !== null;
  }

  private selectText(textArea: HTMLTextAreaElement) {
    if (this.isOS()) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  private execCopy(textArea: HTMLElement): void {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
