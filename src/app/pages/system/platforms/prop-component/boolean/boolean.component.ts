import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PropertyVo} from "../../../../../model/vo/PropertyVo";

@Component({
    selector: 'boolean',
    templateUrl: './boolean.component.html',
    styleUrls: ['./boolean.component.less']
})
export class BooleanComponent implements OnInit {
    @Input()
    prop: PropertyVo;
    @Input()
    index: string;
    @Input()
    disable: boolean;
    @Input()
    editable: boolean;
    @Input()
    tabType: number;
    @Input()
    prop_class: string;
    @Input()
    change: EventEmitter<PropertyVo>;

    constructor() {
    }

    ngOnInit(): void {
    }

    onChange(): void {
        this.change.emit(this.prop);
    }
}
