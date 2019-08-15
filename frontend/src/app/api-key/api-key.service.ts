import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { ApiKey } from './../models/api-key.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  constructor(
    private _httpClient: HttpClient
  ) {
    this.updateApiKeys();
  }
  public updatedKeys$: BehaviorSubject<Array<ApiKey>> = new BehaviorSubject(
    new Array<ApiKey>(),
  );

  public getApiKeys(): Observable<Array<ApiKey>> {
    return this._httpClient
      .get(environment.nestjsBackend.url + '/api/gateway-key')
      .pipe(
        map(res => {
          return res as Array<ApiKey>;
        }),
      );
  }

  public updateApiKeys() {
    this.getApiKeys().subscribe(res => {
      this.updatedKeys$.next(res);
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
            this.updateApiKeys();
            observer.next(evt);
          });
      }
    });
  }
}
