import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.less']
})
export class SupplierListComponent implements OnInit {
  page = 4;
  constructor() { }

  ngOnInit(): void {
  }

}
