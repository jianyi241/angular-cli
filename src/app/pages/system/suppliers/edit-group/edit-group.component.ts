import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {ConfigService} from "../../../../service/config.service";

@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.less']
})
export class EditGroupComponent implements OnInit {
    group: GroupInfo;
    reminder: any;
    type: string;
    constructor(private route: Router, public configService: ConfigService) {
        let state = this.route.getCurrentNavigation().extras.state;
        this.group = state.group;
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
