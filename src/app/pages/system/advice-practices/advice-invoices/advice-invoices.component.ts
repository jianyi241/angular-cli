import { Component, OnInit } from '@angular/core';
import {AdviceLayoutComponent} from "../advice-layout/advice-layout.component";

@Component({
  selector: 'app-advice-invoices',
  templateUrl: './advice-invoices.component.html',
  styleUrls: ['./advice-invoices.component.less']
})
export class AdviceInvoicesComponent implements OnInit {

  constructor(public adviceLayoutComponent:AdviceLayoutComponent) {
    this.adviceLayoutComponent.isTeamPage =false;
  }

  ngOnInit(): void {
  }

}
