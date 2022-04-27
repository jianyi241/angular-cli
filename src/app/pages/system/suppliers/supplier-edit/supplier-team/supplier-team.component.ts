import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-team',
  templateUrl: './supplier-team.component.html',
  styleUrls: ['./supplier-team.component.less']
})
export class SupplierTeamComponent implements OnInit {
  page = 4;
  constructor() { }

  ngOnInit(): void {
  }

}
