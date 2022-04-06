import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from "../../../../../service/config.service";
import {PropertyVo} from "../../../../../model/vo/PropertyVo";

@Component({
    selector: 'app-prop-view',
    templateUrl: './prop-view.component.html',
    styleUrls: ['./prop-view.component.less']
})
export class PropViewComponent implements OnInit {
    @Input()
    model: PropertyVo;
    @Input()
    type: number;
    @Input()
    name: string;
    @Input()
    index: number;
    @Input()
    editable: boolean;
    @Input()
    tabType: number;
    @Output()
    prop_change = new EventEmitter<PropertyVo>();


    constructor(public configService: ConfigService) {
    }

    ngOnInit(): void {
    }

}
