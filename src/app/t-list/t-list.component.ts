import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from "@angular/router"

import { Test } from "../test"
import { TestService } from "../test.service"
import { Tag } from "../tag"
import { TagService } from "../tag.service"
import { LazyLoadEvent, MenuItem, SelectItem, DataTable } from "primeng/primeng"

import { ListStateService } from "../list-state.service"

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-t-list',
  templateUrl: './t-list.component.html',
  styleUrls: ['./t-list.component.css']
})
export class TListComponent implements OnInit {

  tests: Test[]
  pageNumber: number = 1
  pageSize: number = 2
  rowsPerPageOptions: number[] = [10, 20, 30]
  totalRecords: number
  selectedTests: Test[]

  allTags: SelectItem[]
  selectedTags: any[]

  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(
    private router: Router,
    private testService: TestService,
    private tService: TagService,
    private listStateService: ListStateService
  ) { }

  ngOnInit() {
    this.listStateService.listComponent = this

    this.allTags = []
    this.getTags().then(res => {
      // console.log(this.allTags)
    })

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
    this.pageNumber = event.first / event.rows + 1
    this.pageSize = event.rows
    this.testService.getTests(this.pageNumber, this.pageSize).then(data => {
      this.tests = data.list
      this.totalRecords = data.totalRecords
      // reset selected items on page change
      this.selectedTests = undefined

    })

  }

  handleRowSelect(event) {
    setTimeout(() => {
      this.listStateService.selectedItems = this.selectedTests
    }, 0)
  }

  handleRowUnselected(event) {
    this.listStateService.selectedItems = this.selectedTests
  }

  newItem(e) {
    alert("请在下方选择tag后生成试题")
  }

  editItem(e, q) {
    alert("暂不支持该功能")
  }

  delItems(e, qs) {
    let ids: string[]
    ids = qs.map(q => q._id)
    // console.log(ids)
    this.testService.delTests(ids)
      .subscribe(q => {
        if (q["ok"]) {
          alert("delete successfully")
          this.tests = this.tests.filter(q => {
            return ids.indexOf(q["_id"]) < 0
          })
          // this.totalRecords = this.totalRecords - q.n
          this.dataTableComponent.reset()
        }
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

  makeATest() {
    let tags = this.selectedTags
    // console.log(tags)
    return this.testService.makeATest(tags)
      .toPromise()
      .then(res => {
        // console.log(res)
        this.dataTableComponent.reset()
      })
    // .subscribe()
  }



}
