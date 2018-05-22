import { Injectable } from '@angular/core';
import { Vin } from '../class/vin';
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
export class VinsService {

  vin: Vin[];

  private api = 'http://localhost:3001/api/';
  // private api = 'https://datacenterproject.herokuapp.com/api/';
  private urlVin = 'vins';
  private userToken =  JSON.parse(localStorage.getItem('token'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor( private http: HttpClient ) { }

  newVin (vin: any): Observable<any> {
    return this.http.post( this.api + 'newVin', vin, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getVins (vin: any): Observable<any> {
    return this.http.post(this.api + this.urlVin, vin, {headers: this.headers})
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
