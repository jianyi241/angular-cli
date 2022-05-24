import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PropertyVo} from "../../../../../model/vo/PropertyVo";
import {FocusService} from "../../../../../service/focus.service";

@Component({
    selector: 'short-text',
    templateUrl: './short-text.component.html',
    styleUrls: ['./short-text.component.less']
})
export class ShortTextComponent implements OnInit {
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
    required: boolean;
    @Input()
    change: EventEmitter<PropertyVo>;
    focusValue: string;

    constructor(private focusService: FocusService) {
    }

    ngOnInit(): void {
    }

    blur(): void {
        this.focusService.deleteFocus();
        if (this.focusValue === this.prop.productPropVo.propValue) {
            return;
        }
        this.change.emit(this.prop);
    }

    focus(): void {
        this.focusValue = this.prop.productPropVo.propValue;
        this.focusService.addFocus();
    }
}
