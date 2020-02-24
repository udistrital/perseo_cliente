import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { RequestManager } from '../../managers/requestManager';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
  }),
};

const path = environment.PERSEO_MID;


@Injectable({
  providedIn: 'root',
})
export class PersepMidService {

  // private votacionRealizada = new BehaviorSubject([]);
  // public votacionRealizada$ = this.votacionRealizada.asObservable();

  constructor(private requestManager: RequestManager) {
    this.requestManager.setPath('PERSEO_MID');
  }
  get(endpoint) {
    this.requestManager.setPath('PERSEO_MID');
    return this.requestManager.get(endpoint);
  }
  post(endpoint, element) {
    this.requestManager.setPath('PERSEO_MID');
    return this.requestManager.post(endpoint, element);
  }
  put(endpoint, element) {
    this.requestManager.setPath('PERSEO_MID');
    return this.requestManager.putPerseo(endpoint, element);
  }
  delete(endpoint, element) {
    this.requestManager.setPath('PERSEO_MID');
    return this.requestManager.delete(endpoint, element.Id);
  }

  // getEvaluacion(endpoint) {
  //   this.votacionRealizada.next([]);
  //   if (endpoint !== 'nuevaEvaluacion') {
  //     this.requestManager.setPath('EVALUACIONCRUD_SERVICE');
  //     this.requestManager.get(endpoint)
  //       .subscribe((response: any) => {
  //         this.votacionRealizada.next(response);
  //       });
  //   } else {
  //     this.votacionRealizada.next([{}]);
  //   }
  // }
}
