import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../../../model/constants";

@Component({
  selector: 'app-manage-supplier-users',
  templateUrl: './manage-supplier-users.component.html',
  styleUrls: ['./manage-supplier-users.component.less']
})
export class ManageSupplierUsersComponent implements OnInit {
  config = {...Constants.EDITOR_CONFIG};

  accountType:string ='BusinessDevelopmentManager';
  constructor() { }

  ngOnInit(): void {
  }

}
