import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advice-list',
  templateUrl: './advice-list.component.html',
  styleUrls: ['./advice-list.component.less']
})
export class AdviceListComponent implements OnInit {

  page = 4;
  constructor() { }

  ngOnInit(): void {
  }

  NameSortChange(e):void{
    console.log(e)
  }

}
