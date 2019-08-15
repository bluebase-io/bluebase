import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GatewayService} from './gateway.service';
import { Gateway } from '../models/gateway.model';
import { Observable } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  constructor(private _gatewayService: GatewayService) {
  }
  public keys: Gateway;
  public gateways$: Observable<Array<Gateway>>;

  ngOnInit() {
        this.gateways$ = this._gatewayService.updatedGateways$;
  }

}
