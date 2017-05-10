import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Router } from "@angular/router"

import { Question } from "../question"
import { QuestionService } from "../question.service"
import { TagService } from "../tag.service"
import { LazyLoadEvent, MenuItem, SelectItem } from "primeng/primeng"

import { QListComponent } from '../q-list/q-list.component'

import { ListStateService } from "../list-state.service"

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, AfterViewInit {
  questions: Question[]
  pageNumber: number = 1
  pageSize: number = 2
  rowsPerPageOptions: number[] = [10, 20, 30]
  totalRecords: number

  allTags: SelectItem[]
  testTags: any[]

  test: any

  private items: MenuItem[]

  ngAfterViewInit() {
    setTimeout(() => {
    }, 500)
  }

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private tService: TagService,
    private listStateService: ListStateService
  ) { }

  ngOnInit() {

    this.items = [
      {
        label: 'New',
        icon: 'fa-plus',
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.newItem(event)
        },

      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        command: (event) => {
          let selectedItems = this.listStateService.selectedItems
          if (!selectedItems || selectedItems.length !== 1) {
            alert("Choose one question to edit")
            return
          }
          this.editItem(event, selectedItems[0])
        }
      },
      {
        label: 'Delete',
        icon: 'fa-minus',
        command: (event) => {
          let selectedItems = this.listStateService.selectedItems
          if (!selectedItems || selectedItems.length < 1) {
            alert("No question choosed")
            return
          }
          this.delItems(event, selectedItems)
        }
      }
    ];


  }




  newItem(e) {
    this.listStateService.newItem(e)
  }

  editItem(e, item) {
    this.listStateService.editItem(e, item)
  }

  delItems(e, items) {
    this.listStateService.delItems(e, items)
  }

}
