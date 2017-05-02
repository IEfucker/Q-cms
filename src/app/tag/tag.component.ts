import { Component, OnInit } from '@angular/core';

import { Tag } from "../tag"
import { TagService } from '../tag.service'

import { LazyLoadEvent, MenuItem } from "primeng/primeng"

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  private tags: Tag[]
  private items: MenuItem[]
  private selectedTags: Tag[]
  private tag: Tag

  constructor(
    private tService: TagService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'New',
        icon: 'fa-plus',
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
        }

      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        command: (event) => {
        }
      },
      {
        label: 'Delete',
        icon: 'fa-minus',
        command: (event) => {
          if (!this.selectedTags || this.selectedTags.length < 1) {
            alert("No tag choosed")
            return
          }
          this.delTags(event, this.selectedTags)
        }
      }
    ];

    this.tag = { name: "", id: "", category: "" }
  }
  loadData(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    console.log(event)
    this.getTags()
  }

  getTags(): Promise<any> {
    return this.tService.getTags().then(res => {
      this.tags = res
    }, function (err) {
      console.log(err)
    })
  }

  addModifyTag(): Promise<any> {
    return this.tService.saveTag(this.tag)
      .toPromise()
      .then(res => {
        this.tags.push(res)
      })
  }

  delTags(e, index) {
    this.tag = this.tags[index]
    let ids: string[]
    ids = [this.tag["_id"]]
    this.tagService.delTags(ids)
      .toPromise()
      .then(res=> {
        if (res.ok) {
          this.tags = this.tags.filter(tag => {
            return ids.indexOf(tag["_id"]) < 0
          })
        }
      })
  }


}
