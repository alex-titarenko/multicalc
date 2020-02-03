import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public get<T>(key: string, defaultValue: T): T {
    const storageItem = localStorage.getItem(this.normalizeKey(key));

    const obj = JSON.parse(storageItem);
    const defaultCopy = <T>JSON.parse(JSON.stringify(defaultValue));
    return <T>Object.assign(defaultCopy, obj);
  }

  public set(key: string, value: any): void {
    const str = JSON.stringify(value);
    localStorage.setItem(this.normalizeKey(key), str);
  }

  private normalizeKey(baseKey: string): string {
    return `settings:${baseKey.toLowerCase()}`;
  }
}
