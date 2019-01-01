import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobItemService {
  private item: any;
  private title: any;

  constructor() {}

  public setItem(item) {
    this.item = item;
  }

  getItem() {
    return this.item;
  }

  public setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
}
