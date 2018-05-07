import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private api = 'http://localhost:3001/api/';
  private userToken =  JSON.parse(localStorage.getItem('token'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor( private http:HttpClient) { }

  singUp(user:any): Observable<any>{
    return this.http.post(this.api+'signup', user, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  singIn(user:any): Observable<any> {
    return this.http.post(this.api+'signin', user, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getUserByEmail(user:any): Observable<any> {
    return this.http.post(this.api+'getuserbyemail', user, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.api+'users', {headers:this.headers}).pipe(
      tap( models => this.log('fetched Status Warranty')),
      catchError(this.handleError( 'getStatusWarranty', []))
    )
  }

  updateUser(user:any): Observable<any>{
    let userId = user._id
    return this.http.post(this.api+'users/'+userId, user, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  deletUser(user: any ):Observable<any>{
    let userId = user._id
    return this.http.post( this.api+'deletUser/'+userId, user, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getNewPass(user:any):Observable<any>{
    return this.http.post(this.api+'mail/getNewPass', user, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }


  private extractData(res: Response) {
    const body = JSON.stringify(res);
          return body || {};
  }
  private handleErrorObservable (error: Response | any) {
    // console.error(error.message || error);
    return Observable.throw(error || error);
  }

  private log(message: string) {
    console.log('AccountService: ' + message);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
