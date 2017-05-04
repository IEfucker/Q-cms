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

  @ViewChild(QListComponent)
  private qList: QListComponent;

  ngAfterViewInit() {
    setTimeout(function () {
      console.log(this.qList, this.test)
    }, 3000)
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
        }

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

    this.allTags = []
    this.getTags().then(res => {
      console.log(this.allTags)
    })
  }

  getTags(): Promise<any> {
    return this.tService.getTags().then(res => {
      res.forEach(element => {
        this.allTags.push({ label: element.name, value: element["_id"] });
      });
    }, function (err) {
      console.log(err)
    })
  }


  newItem(e) {
    this.router.navigate(["q"])
  }

  editItem(e, q) {
    this.router.navigate(["q", q._id])
  }

  delItems(e, qs) {
    let ids: string[]
    ids = qs.map(q => q._id)
    // console.log(ids)
    this.questionService.delQuestions(ids)
      .subscribe(q => {
        console.log(q)
        if (q["ok"]) {
          alert("delete successfully")
          this.questions = this.questions.filter(q => {
            return ids.indexOf(q["_id"]) < 0
          })
          this.totalRecords = this.totalRecords - q.n

        }
      })
  }

  makeATest() {
    let tags = this.testTags
    this.questionService.makeATest(tags)
      .subscribe(qs => {
        console.log(qs)
      })
  }

}
