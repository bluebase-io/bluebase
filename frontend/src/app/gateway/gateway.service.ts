import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gateway } from '../models/gateway.model';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  constructor(private _httpClient: HttpClient) {
    this.updateGateways();
  }
  public updatedGateways$: BehaviorSubject<
    Array<Gateway>
  > = new BehaviorSubject(new Array<Gateway>());

  public getGateways(): Observable<Array<Gateway>> {
    return this._httpClient
      .get(environment.nestjsBackend.url + '/api/gateway')
      .pipe(
        map(res => {
          return res as Array<Gateway>;
        }),
      );
  }

  public updateGateways() {
    this.getGateways().subscribe(res => {
      this.updatedGateways$.next(res);
    });
  }

  addApiKey(key: string): Observable<any> {
    return Observable.create(observer => {
      if (key) {
        this._httpClient
          .post(environment.nestjsBackend.url + '/api/gateway-key', {
            key: key,
          })
          .subscribe(evt => {
            this.updateGateways();
            observer.next(evt);
          });
      }
    });
  }
}
