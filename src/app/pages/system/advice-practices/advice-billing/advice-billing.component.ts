import { Component, OnInit } from '@angular/core';
import {AdviceLayoutComponent} from "../advice-layout/advice-layout.component";

@Component({
  selector: 'app-advice-billing',
  templateUrl: './advice-billing.component.html',
  styleUrls: ['./advice-billing.component.less']
})
export class AdviceBillingComponent implements OnInit {

  constructor(public adviceLayoutComponent:AdviceLayoutComponent) {
    this.adviceLayoutComponent.isTeamPage =false;
  }

  ngOnInit(): void {
  }

}
