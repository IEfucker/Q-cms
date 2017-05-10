import { Injectable } from '@angular/core';

@Injectable()
export class ListStateService {
  private _items: any[]
  public listComponent: any
  constructor() { }

  get selectedItems(): any[] {
    return this._items
  }

  set selectedItems(items: any[]) {
    console.log(items)
    this._items = items
  }

  newItem(e) {
    if(this.listComponent){
      this.listComponent.newItem(e)
    }
  }

  editItem(e, item) {
    if(this.listComponent){
      this.listComponent.editItem(e, item)
    }
  }

  delItems(e, items) {
    if(this.listComponent){
      this.listComponent.delItems(e, items)
    }
  }

}
