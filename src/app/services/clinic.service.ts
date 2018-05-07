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
export class ClinicService {
  private api = 'http://localhost:3001/api/';
  private url = 'clinic/';
  private userToken =  JSON.parse(localStorage.getItem('token'));
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userToken });

  constructor( private http: HttpClient) { }

  newClinic(clinic:any): Observable<any>{
    return this.http.post(this.api+this.url+'new', clinic, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getClinics(search:any): Observable<any>{
    return this.http.post(this.api+'clinics', search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getLength(): Observable<any>{
    return this.http.get<any>(this.api+'clinics/count', {headers:this.headers}).pipe(
      tap( dealer => this.log(`fetched Clinics`)),
      catchError(this.handleError('getclinis', []))
    );
  }

  deletClinic(clinic:any):Observable<any> {
    let clinicId = clinic._id
    return this.http.post(this.api+'clinics/'+clinicId,null, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getOneClinic(clinic:any):Observable<any> {
    let clinicId = clinic
    return this.http.post(this.api+'clinic/'+clinicId,null, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getClinicForAdvisor():Observable<any>{
    return this.http.get<any>(this.api+'clinics/advisor', {headers:this.headers}).pipe(
      tap( dealer => this.log(`fetched Clinics`)),
      catchError(this.handleError('getclinis', []))
    );
  }

  reqClinicVisit(reqClinic:any):Observable<any>{
    return this.http.post(this.api+'registerClinicVisit',reqClinic,{ headers:this.headers} )
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  
  getReqFromClinics(clinic:any, search:any): Observable<any>{
    let clinicId = clinic
    return this.http.post(this.api+'registerClinicVisit/getByClinic/'+clinicId, search, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getReqResumen(clinic:any):Observable<any>{
    let clinicId = clinic
    return this.http.post(this.api+'registerClinicVisit/resume/'+clinicId,null, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  getByGroup(clinic:any):Observable<any>{
    let clinicId = clinic
    return this.http.post(this.api+'clinic/report/getByGroup/'+clinicId, null, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  getDetailByGroup(clinic:any):Observable<any>{
    let clinicId = clinic
    return this.http.post(this.api+'clinic/report/getDetailByGroup/'+clinicId, null, {headers:this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }

  reportClinicResume(search:any):Observable<any>{
    return this.http.post(this.api+'clinic/report/general', search, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  reportClinicCot(search:any):Observable<any>{
    return this.http.post(this.api+'clinic/report/general/cot', search, {headers: this.headers})
    .map(this.extractData)
    .catch(this.handleErrorObservable)
  }
  
  getReportByClinic(search:any):Observable<any>{
    return this.http.post(this.api+'/clinic/report/general/byClinic', search, {headers: this.headers})
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
