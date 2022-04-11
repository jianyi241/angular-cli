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
    index: number;
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

    constructor(private focusService: FocusService) {
    }

    ngOnInit(): void {
    }

    blur(): void {
        this.focusService.deleteFocus();
        this.change.emit(this.prop);
    }

    focus(): void {
        this.focusService.addFocus();
    }
}
