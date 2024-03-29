import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {PropertyVo} from "../../../../../model/vo/PropertyVo";
import {FocusService} from "../../../../../service/focus.service";

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
    index: string;
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
    @Input()
    required: boolean;
    focusValue: string;

    constructor(private focusService: FocusService) {

    }

    ngOnInit(): void {
        this.config.editorplaceholder = this.prop?.name || '';
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
