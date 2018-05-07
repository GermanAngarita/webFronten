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
export class CrmsurveysService {

  private api = 'http://localhost:3001/api/';
  private url = 'report/';
  private userToken =  JSON.parse(localStorage.getItem('token'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor( private http:HttpClient ) { }

  getKasc(search:any): Observable<any>{
    return this.http.post(this.api+this.url+'kasc', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getKascLast(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'kascLast', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getkascGeneral(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'kascGeneral', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getIndicatorSat(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'indicatorSat', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getDcsiByDate(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getDcsiByDate', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getKacsResult(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getKacsResult', search,{headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getKacsResultTrimonth(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getKacsTrimonth', search ,{headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getLoyaltyByDealer(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getLoyaltyByDealer', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }

  getKascDetails(search: any):Observable<any>{
    return this.http.post(this.api+this.url+'getKascDetails', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  getRevisitDetails(search:any): Observable<any>{
    return this.http.post(this.api+this.url+'getRevisitDetails', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getRecommendDetails(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getRecommendDetails', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getFrftByDealer(search:any): Observable<any>{
    return this.http.post(this.api+this.url+'getFrftByDealer', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getFrftOffenders(search:any): Observable<any>{
    return this.http.post(this.api+this.url+'getFrftOffenders', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getfrftTopOffenders(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getfrftTopOffenders', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getFrftbyPer(search:any):Observable<any>{
    return this.http.post(this.api+this.url+'getFrftbyPer', search, {headers:this.headers})
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
