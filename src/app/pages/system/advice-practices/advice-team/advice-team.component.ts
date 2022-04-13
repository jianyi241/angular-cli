import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advice-team',
  templateUrl: './advice-team.component.html',
  styleUrls: ['./advice-team.component.less']
})
export class AdviceTeamComponent implements OnInit {
  page = 4;
  constructor() { }

  ngOnInit(): void {
  }

}
