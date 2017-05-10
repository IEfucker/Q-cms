import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router"

import { Question } from "../question"
import { QuestionService } from "../question.service"
import { TagService } from "../tag.service"
import { LazyLoadEvent, MenuItem, SelectItem } from "primeng/primeng"

import { ListStateService } from "../list-state.service"

@Component({
  selector: 'app-q-list',
  templateUrl: './q-list.component.html',
  styleUrls: ['./q-list.component.css']
})
export class QListComponent implements OnInit, OnDestroy {

  questions: Question[]
  pageNumber: number = 1
  pageSize: number = 2
  rowsPerPageOptions: number[] = [10, 20, 30]
  totalRecords: number
  selectedQuesions: Question[]

  // allTags: SelectItem[]
  testTags: any[]

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private listStateService: ListStateService
  ) { }

  ngOnInit() {
    this.listStateService.listComponent = this
  }

  ngOnDestroy() {
    // console.log("destroy")
    // reset list state service
    this.listStateService.selectedItems = []
    this.listStateService.listComponent = null
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

  handleRowSelect(event) {
    setTimeout(() => {
      this.listStateService.selectedItems = this.selectedQuesions
    }, 0)
  }

  handleRowUnselected(event) {
    this.listStateService.selectedItems = this.selectedQuesions
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

}
