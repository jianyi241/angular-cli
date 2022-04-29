import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";

@Component({
  selector: 'app-manage-supplier-users',
  templateUrl: './edit-supplier-team.component.html',
  styleUrls: ['./edit-supplier-team.component.less']
})
export class EditSupplierTeamComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};

  accountType:string ='BusinessDevelopmentManager';
  constructor() { }

  ngOnInit(): void {
  }

}
