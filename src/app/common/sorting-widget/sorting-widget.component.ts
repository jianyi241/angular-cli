import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sorting-widget',
  templateUrl: './sorting-widget.component.html',
  styleUrls: ['./sorting-widget.component.less']
})
export class SortingWidgetComponent implements OnInit {

  ascActive:boolean = false;
  descActive:boolean =false;

  //0 default , 1 asc, 2 desc
  sortStatus:number = 0;

  @Output() sortChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  sortAscChange():void{
    this.ascActive = !this.ascActive;
    this.descActive = false;

    if(!this.ascActive && !this.descActive ){
      this.sortStatus = 0;
    }

    else if(this.ascActive){
      this.sortStatus = 1;
    }

    this.sortChange.emit(this.sortStatus);
  }

  sortDescChange():void{
    this.descActive = !this.descActive;
    this.ascActive = false;

    if(!this.ascActive && !this.descActive ){
      this.sortStatus = 0;
    }

    else if(this.descActive){
      this.sortStatus = 2;
    }

    this.sortChange.emit(this.sortStatus);
  }
}
