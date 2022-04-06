import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PropertyVo} from "../../../../../model/vo/PropertyVo";

@Component({
  selector: 'integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.less']
})
export class IntegerComponent implements OnInit {
  @Input()
  prop: PropertyVo;
  @Input()
  index: number;
  @Input()
  disable: boolean;
  @Input()
  editable: boolean;
  @Input()
  tabType: number;
  @Input()
  change: EventEmitter<PropertyVo>;

  constructor() {
  }

  ngOnInit(): void {
  }

  blur(): void {
    this.change.emit(this.prop);
  }

}
