import { Injectable } from '@angular/core';
import { Dealer } from '../class/dealer';
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
export class DealerService {

  dealer: Dealer[]
  private api = 'http://localhost:3001/api/';
  // private api = 'https://datacenterproject.herokuapp.com/api/';
  private url = 'dealers';
  private userToken =  JSON.parse(localStorage.getItem('token'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });


  constructor( private http: HttpClient) { }

  getDealers(): Observable<Dealer[]> {
    return this.http.get<Dealer[]>(this.api + this.url, {headers: this.headers}).pipe(
      tap( dealer => this.log(`fetched Dealers`)),
      catchError(this.handleError('getDealers', []))
    );
  }

  newDealer(newDealer: any): Observable<Dealer[]>{
    return this.http.post(this.api + this.url, newDealer, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  updateDealer(dealer: any): Observable<Dealer[]>{
    const dealerId = dealer._id;
    return this.http.post( this.api + this.url +'/'+dealerId, dealer, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  getDealerByZone(): Observable<any>{
    return this.http.get<any>(this.api+'dealer/dealerByZone', {headers: this.headers}).pipe(
      tap( dealer => this.log(`fetched Dealers`)),
      catchError(this.handleError('getDealers', []))
    );
  }

  getDealerByGroup(): Observable<any> {
    return this.http.get<any>(this.api+'dealer/dealerByGroup', {headers: this.headers}).pipe(
      tap( dealer => this.log(`fetched Dealers`)),
      catchError(this.handleError('getDealers', []))
    );
  }

  getdealerByDealer(dealers:any): Observable<any> {
    return this.http.post(this.api+'dealer/dealerByDealer',dealers, {headers:this.headers})
    .map( this.extractData)
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
