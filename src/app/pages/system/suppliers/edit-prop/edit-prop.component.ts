import {Component, OnInit} from '@angular/core';
import {GroupInfo} from "../../../../model/po/groupInfo";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {PropertyInfo} from "../../../../model/po/propertyInfo";

@Component({
    selector: 'app-edit-prop',
    templateUrl: './edit-prop.component.html',
    styleUrls: ['./edit-prop.component.less']
})
export class EditPropComponent implements OnInit {
    prop: PropertyInfo;
    type: string;
    reminder: any;
    constructor(private route: Router, public configService: ConfigService) {
        let state = this.route.getCurrentNavigation().extras.state;
        this.prop = state.prop;
        this.reminder = state.reminder;
    }

    ngOnInit(): void {
    }

    goBack(): void {
        this.route.navigate(['/supplier/comparison/4'], {
            state: this.reminder
        })
    }

}
