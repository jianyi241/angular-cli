import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-comparisons-list',
  templateUrl: './comparisons-list.component.html',
  styleUrls: ['./comparisons-list.component.less']
})
export class ComparisonsListComponent implements OnInit {
  page=4;
  constructor() { }

  ngOnInit(): void {
  }

}
