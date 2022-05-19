import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PropertyVo} from "../../../../../model/vo/PropertyVo";
import {FocusService} from "../../../../../service/focus.service";

@Component({
    selector: 'integer',
    templateUrl: './integer.component.html',
    styleUrls: ['./integer.component.less']
})
export class IntegerComponent implements OnInit {
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
    @Input()
    required: boolean;

    constructor(private focusService: FocusService) {
    }

    ngOnInit(): void {
    }

    blur(): void {
        this.focusService.deleteFocus();
        let propValue = this.prop.productPropVo.propValue;
        this.prop.productPropVo.propValue = Number.isNaN(propValue) ? '' : propValue;
        this.change.emit(this.prop);
    }

    focus(): void {
        this.focusService.addFocus();
    }
}
