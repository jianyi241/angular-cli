import { Component, OnInit } from '@angular/core';
import {AdviceLayoutComponent} from "../advice-layout/advice-layout.component";

@Component({
  selector: 'app-advice-overview',
  templateUrl: './advice-overview.component.html',
  styleUrls: ['./advice-overview.component.less']
})
export class AdviceOverviewComponent implements OnInit {

  constructor(public adviceLayoutComponent:AdviceLayoutComponent) {
    this.adviceLayoutComponent.isTeamPage =false;
  }

  ngOnInit(): void {
  }

}
