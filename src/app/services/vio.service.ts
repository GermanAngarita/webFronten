import { Injectable } from '@angular/core';
import { Vio } from '../class/vio';
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
export class VioService {

  vio: Vio[];

  private api = 'http://localhost:3001/api/';
  private url = 'vio';
  private park = 'park';
  private userToken =  JSON.parse(localStorage.getItem('token'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });
  private headersToDownload = new HttpHeaders({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'authorization': 'Bearer ' + this.userToken });


  constructor( private http: HttpClient ) { }

  getVio(filter: any): Observable<any> {
    return this.http.post( this.api + this.url, filter, {headers: this.headers })
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getDealers(): Observable<any> {
    return this.http.get<any>(this.api+this.url+'/dealers', {headers: this.headers }).pipe( 
      tap( dealers=> this.log('fetched Dealers from Master')),
    catchError(this.handleError('getDealers', []))
    );
  }

  getPark(filter: any): Observable<any> {
    return this.http.post( this.api + this.park, filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  
  getParkMonth(filter: any): Observable<any> {
    return this.http.post(this.api+'vio/parkMonth', filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getModels(): Observable<any> {
    return this.http.get<any>(this.api + 'vio/models', {headers: this.headers}).pipe(
      tap( models => this.log('fetched Models from Master')),
      catchError(this.handleError( 'getModels', []))
    )
  }

  getTotal(filter: any): Observable<any> {
    return this.http.post(this.api + 'vio/total',filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getTypeuse(filter: any): Observable<any> {
    return this.http.post(this.api + 'vio/typeUse',filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getTotalByYear(filter: any): Observable<any> {
    return this.http.post(this.api + 'vio/totalByYear',filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getTotalByCl(filter: any): Observable<any> {
    return this.http.post(this.api+'vio/totalByCl', filter, { headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getTotalByModel(filter: any): Observable<any> {
    return this.http.post(this.api+'vio/totalByModel', filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getTotalByFrom(filter: any): Observable<any>{
    return this.http.post(this.api+'vio/totalByFrom', filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getStatusWarranty(): Observable<any> {
    return this.http.get<any>(this.api+'vio/statusWarranty', {headers:this.headers}).pipe(
      tap( models => this.log('fetched Status Warranty')),
      catchError(this.handleError( 'getStatusWarranty', []))
    )
  }

  getByBillDate(filter:any): Observable<any> {
    return this.http.post(this.api+'vio/byBillDate',filter ,{ headers: this.headers}).map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getExcelReport(filter: any) {
    return this.http.post(this.api+'setFilters',filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getByBillPerYear(filter:any): Observable<any>{
    return this.http.post(this.api+this.url+'/byBillModel', filter, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getAllModelCode():Observable<any>{
    return this.http.get<any>(this.api+'vio/allModelCode', {headers: this.headers}).pipe(
      tap( models => this.log('fetched Model Code')),
      catchError(this.handleError( 'getAllModelCode', []))
    )
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
