import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Question } from './question';
import {Tag} from './tag'

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import server from './server'



@Injectable()
export class QuestionService {
    // private path = '/showcase/resources/data';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = server.host
    private path = server.path

    constructor(private http: Http) { }

    getQuestions(pNumber, pSize): Promise<any> {
        const url = `${this.host}${this.path}/questions`
        // const url = `${this.path}/questions.json`
        return this.http.get(url + "?pageNumber=" + pNumber + "&pageSize=" + pSize)
            .toPromise()
            .then(res => {
                console.log(res)
                return res.json().data
            })
            .then(data => {
                console.log(data)
                return Promise.resolve(data);
            });
    }

    getQuestion(id: number): Promise<Question> {
        // const url = `${this.path}/question.json`
        const url = `${this.host}${this.path}/question/${id}`
        return this.http.get(url)
            .toPromise()
            .then(res => res.json().data)
            .then(data => {
                // console.log(data)
                return Promise.resolve(data);
            });
    }

    delQuestions(ids: string[]): Observable<any> {
        const url = `${this.host}${this.path}/questions/del`
        // console.log(ids)
        let options = new RequestOptions({ headers: this.headers })
        return this.http.post(url, { "id": ids }, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveQuestion(q: Question): Observable<Question> {
        // const url = `${this.path}/save.json`
        const url = `${this.host}${this.path}/question`
        let options = new RequestOptions({ headers: this.headers })
        if (q['_id']) {
            return this.http.put(url + `/${q['_id']}`, q, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
        return this.http.post(url, q, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    makeATest(tags: Tag[]): Observable<Question[]> {
        const url = `${this.host}${this.path}/makeatest`
        let options = new RequestOptions({ headers: this.headers })
        return this.http.post(url, tags, options)
            .map(this.extractData)
            .catch(this.handleError)
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { data: {} };
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}