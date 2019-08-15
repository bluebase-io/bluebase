import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiKey } from './../models/api-key.model';
import { ApiKeyService } from './api-key.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.scss']
})
export class ApiKeyComponent implements OnInit {

  constructor(private _apiKeyService: ApiKeyService, private _fb: FormBuilder) { }
  public keys: ApiKey;
  public keys$: Observable<Array<ApiKey>>;
  public myForm: FormGroup;

  ngOnInit() {

    this.myForm = this._fb.group({
      key: ''
    });
    this.keys$ = this._apiKeyService.updatedKeys$;
  }

  saveKey() {
    const key = this.myForm.value.key;
    this._apiKeyService.addApiKey(key)
    .subscribe((res) => { });
  }

}
