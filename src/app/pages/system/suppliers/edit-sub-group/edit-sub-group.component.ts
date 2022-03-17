import {Component, OnInit} from '@angular/core';
import {GroupInfo} from "../../../../model/po/groupInfo";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-edit-sub-group',
    templateUrl: './edit-sub-group.component.html',
    styleUrls: ['./edit-sub-group.component.less']
})
export class EditSubGroupComponent implements OnInit {
    subGroup: GroupInfo;
    type: string;
    reminder: any;
    public config = {
        placeholder: 'Description',
    };
    public Editor = ClassicEditor;

    constructor(private route: Router, public configService: ConfigService) {
        let state = this.route.getCurrentNavigation().extras.state;
        this.subGroup = state.subGroup;
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
