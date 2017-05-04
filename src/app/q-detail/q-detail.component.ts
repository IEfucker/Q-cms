import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Router, ActivatedRoute, Params } from "@angular/router"

import { Question } from "../question"
import { QuestionService } from "../question.service"
import { TagService } from "../tag.service"

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
// import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/observable/of';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';


@Component({
  selector: 'app-data-detail',
  templateUrl: './q-detail.component.html',
  styleUrls: ['./q-detail.component.css']
})
export class QDetailComponent implements OnInit {
  // private q: Observable<Question>

  private q: Question

  private id: number

  private originalQ: Question

  private selectedOpt: string


  options: string[]
  tags: string[]
  allTags: SelectItem[]
  private emptyQuestion = {
    id: null,
    "question": "",
    "options": [],
    "correct": null,
    "tags": []
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qService: QuestionService,
    private tService: TagService,
    // private confirmationService: ConfirmationService
  ) { }

  getQuestion(): void {
    this.route.params
      // this.route.params
      .switchMap((params: Params) => {
        this.id = params['id'];
        if (this.id)
          return this.qService.getQuestion(this.id)
        else
          return Observable.of<Question>(this.emptyQuestion)
      })
      .subscribe((q: Question) => {
        this.q = q
        this.selectedOpt = q.options[q.correct]
        this.originalQ = JSON.parse(JSON.stringify(q))
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

  ngOnInit() {
    this.allTags = []
    //get all tags first all multiselect component would has a bug, 
    // which choose item would show "null"
    this.getTags().then(res=>{
      this.getQuestion()
    })

  }


  onRowSelect(event) {
    this.q.correct = this.q.options.indexOf(event.data)
  }

  onRowUnselect(event) {
  }


  addOpt() {
    this.q.options.push("")
  }
  deleteOpt(e, index) {
    this.q.options = this.q.options.filter(function (v, i) {
      return i !== index
    })
  }

  // manage tags
  manageTag(){
    this.router.navigate(["tags"])
  }

  save() {
    this.qService.saveQuestion(this.q)
      .subscribe(q => {
        console.log(q)
        if (q["_id"]) {
          alert("save successfully")
          this.router.navigate(["list"])
        }
      })
  }

  questionChanged(e) {

  }

  optsChanged(e, i) {
    if (i === undefined) throw Error("index error")
    var v = e.target.value
    this.q.options[i] = v
  }

}
