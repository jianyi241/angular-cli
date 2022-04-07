import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {PropertyVo} from "../../../../../model/vo/PropertyVo";

@Component({
    selector: 'long-text',
    templateUrl: './long-text.component.html',
    styleUrls: ['./long-text.component.less']
})
export class LongTextComponent implements OnInit {
    @Input()
    config = {...Constants.EDITOR_CONFIG};
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
    @Input()
    prop_class: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    blur(): void {
        this.change.emit(this.prop);
    }
}
