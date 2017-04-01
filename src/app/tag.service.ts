import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Tag } from './tag';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import server from './server'

@Injectable()

export class TagService {
    // private path = '/showcase/resources/data';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private host = server.host
    private path = server.path

    constructor(private http: Http) { }

    getTags(): Promise<any> {
        const url = `${this.host}${this.path}/tags`
        return this.http.get(url)
            .toPromise()
            .then(res => {
              return res.json().data
            })
            .then(data => { 
              return Promise.resolve(data);
             });
    }

    getTag(id: number): Promise<Tag> {
        const url = `${this.host}${this.path}/tag/${id}`
        return this.http.get(url)
            .toPromise()
            .then(res => res.json().data)
            .then(data => {
                // console.log(data)
                return Promise.resolve(data);
            });
    }

    delTags(ids: number[]): Promise<void> {
        const url = `${this.path}/remove.json`;
        let idsStr = ids.join()
        // return this.http.delete(url + `?ids=` + idsStr, { headers: this.headers })
        //     .toPromise()
        //     .then(() => null)
        //     .catch(this.handleError)
        console.log(idsStr + " deleted")
        return Promise.resolve()
    }

    saveTag(q: Tag): Observable<Tag> {
        // const url = `${this.path}/save.json`
        const url = `${this.host}${this.path}/tag`
        let options = new RequestOptions({ headers: this.headers })
        if(q['_id']){
            return this.http.put(url+`/${q['_id']}`, q, options)
            .map(this.extractData)
            .catch(this.handleError);
        }
        return this.http.post(url, q, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}