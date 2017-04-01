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

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.css']
})
export class DataDetailComponent implements OnInit {
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
    private tService: TagService
  ) { }

  getQuestions(): void {
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
        console.log(this.q.tags)
      })
  }

  getTags(): Promise<any> {
    return this.tService.getTags().then(res => {
      res.forEach(element => {
        this.allTags.push({ label: element.name, value: element["_id"] });
      });
      console.log(this.allTags)
    }, function (err) {
      console.log(err)
    })
    //need a service to get all tags

    // this.allTags.push({ label: 'tag1', value: '58dca8382746fa2778ae38e0' });
    // this.allTags.push({ label: 'tag2', value: '58dca8412746fa2778ae38e1' });
    // this.allTags.push({ label: 'tag3', value: '58dca8432746fa2778ae38e2' });
    // this.allTags.push({ label: 'tag4', value: '58dca8462746fa2778ae38e3' });
    // this.allTags.push({ label: 'tag5', value: '58dca8482746fa2778ae38e4' });
    // this.allTags.push({ label: 'tag6', value: '58df588e7b5d692d64b295b9' });

    // this.allTags.push({ label: 'tag1', value: 'tag1' });
    // this.allTags.push({ label: 'tag2', value: 'tag2' });
    // this.allTags.push({ label: 'tag3', value: 'tag3' });
    // this.allTags.push({ label: 'tag4', value: 'tag4' });
    // this.allTags.push({ label: 'tag5', value: 'tag5' });
    // this.allTags.push({ label: 'tag6', value: 'tag6' });
    // console.log(this.allTags)
  }

  ngOnInit() {
    this.allTags = []
    //get all tags first all multiselect component would has a bug, 
    // which choose item would show "null"
    this.getTags().then(res=>{
      this.getQuestions()
    })
    

    // this.allTagsData = 


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
