import { Component, OnInit } from '@angular/core';
import {AdviceLayoutComponent} from "../advice-layout/advice-layout.component";

@Component({
  selector: 'app-advice-team',
  templateUrl: './advice-team.component.html',
  styleUrls: ['./advice-team.component.less']
})
export class AdviceTeamComponent implements OnInit {
  page = 4;
  constructor(public adviceLayoutComponent:AdviceLayoutComponent) {
    this.adviceLayoutComponent.isTeamPage =true;
  }

  ngOnInit(): void {
  }

}
