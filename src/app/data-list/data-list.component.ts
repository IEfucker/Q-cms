import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router"

import { Question } from "../question"
import { QuestionService } from "../question.service"
import { LazyLoadEvent, MenuItem } from "primeng/primeng"

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
  selectedQuesions:Question[]

  test:number = 1

  private items: MenuItem[]

  constructor(
    private router: Router,
    private questionService: QuestionService
    ) { }

  ngOnInit() {
    let self = this
    this.items = [
      {
        label: 'New',
        icon: 'fa-plus', 
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          self.newQuestion(event)
        }

      },
      {
        label: 'Edit',
        icon: 'fa-edit', 
        command: (event) => {
          if(!self.selectedQuesions||self.selectedQuesions.length !== 1) {
            alert("Choose one question to edit")
            return
          }
          self.editQuestion(event,self.selectedQuesions[0])
        }
      },
      {
        label: 'Delete',
        icon: 'fa-minus', 
        command: (event) => {
          if(!self.selectedQuesions||self.selectedQuesions.length < 1) {
            alert("No question choosed")
            return
          }
          self.delQuestions(event,self.selectedQuesions)
        }
      }
    ];
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

  newQuestion(e){
    this.router.navigate(["q"])
  }

  editQuestion(e,q){
    this.router.navigate(["q",q._id])
  }
  
  delQuestions(e,qs){
    let ids:number[]
    ids = qs.map(q=>q._id)
    // console.log(ids)
    this.questionService.delQuestions(ids)
  }

}
