import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router"

import { Question } from "../question"
import { QuestionService } from "../question.service"
import {TagService} from "../tag.service"
import { LazyLoadEvent, MenuItem, SelectItem } from "primeng/primeng"

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  questions: Question[]
  pageNumber: number = 1
  pageSize: number = 2
  rowsPerPageOptions: number[] = [10, 20, 30]
  totalRecords: number
  selectedQuesions: Question[]

  allTags: SelectItem[]
  testTags:any[]

  test: number = 1

  private items: MenuItem[]

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private tService: TagService
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'New',
        icon: 'fa-plus',
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.newQuestion(event)
        }

      },
      {
        label: 'Edit',
        icon: 'fa-edit',
        command: (event) => {
          if (!this.selectedQuesions || this.selectedQuesions.length !== 1) {
            alert("Choose one question to edit")
            return
          }
          this.editQuestion(event, this.selectedQuesions[0])
        }
      },
      {
        label: 'Delete',
        icon: 'fa-minus',
        command: (event) => {
          if (!this.selectedQuesions || this.selectedQuesions.length < 1) {
            alert("No question choosed")
            return
          }
          this.delQuestions(event, this.selectedQuesions)
        }
      }
    ];

    this.allTags = []
    this.getTags().then(res=>{
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
  
  loadData(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    console.log(event)
    this.pageNumber = event.first / event.rows + 1
    this.pageSize = event.rows
    this.questionService.getQuestions(this.pageNumber, this.pageSize).then(data => {
      this.questions = data.list
      this.totalRecords = data.totalRecords

    })

  }

  newQuestion(e) {
    this.router.navigate(["q"])
  }

  editQuestion(e, q) {
    this.router.navigate(["q", q._id])
  }

  delQuestions(e, qs) {
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

  makeATest(){
    let tags = this.testTags
    this.questionService.makeATest(tags)
    .subscribe(qs=>{
      console.log(qs)
    })
  }

}
