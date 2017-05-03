import { Injectable } from '@angular/core';

@Injectable()
export class ListStateService {
  private _items: any[]
  constructor() { }

  get selectedItems(): any[] {
    return this._items
  }

  set selectedItems(items: any[]) {
    this._items = items
  }

}
