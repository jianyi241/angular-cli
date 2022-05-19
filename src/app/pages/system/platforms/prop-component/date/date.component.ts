import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PropertyVo} from "../../../../../model/vo/PropertyVo";
import {FocusService} from "../../../../../service/focus.service";
import * as moment from "moment";

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.less']
})
export class DateComponent implements OnInit {

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
    date: Date;
    @Input()
    required: boolean;

    constructor(private focusService: FocusService) {
    }

    ngOnInit(): void {
        if (this.prop?.productPropVo?.propValue) {
            this.date = moment(this.prop.productPropVo.propValue, 'YYYY-MM-DD HH:mm:ss').toDate();
        }
    }

    blur(): void {
        if (!this.date) {
            return;
        }
        let format = moment(this.date).format('YYYY-MM-DD HH:mm:ss');
        if (this.prop.productPropVo.propValue == format) {
            this.focusService.deleteFocus();
            return;
        }
        this.focusService.deleteFocus();
        this.prop.productPropVo.propValue = format;
        this.change.emit(this.prop);
    }

    focus(): void {
        this.focusService.addFocus();
    }
}
