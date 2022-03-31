import {Component, OnInit} from '@angular/core';
import {GroupInfo} from "../../../../model/po/groupInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../repository/toast-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";
import {Reminder} from "../../../../model/vo/reminder";

@Component({
    selector: 'app-edit-sub-group',
    templateUrl: './edit-sub-group.component.html',
    styleUrls: ['./edit-sub-group.component.less']
})
export class EditSubGroupComponent implements OnInit {
    id: string;
    subGroup: GroupInfo = new GroupInfo();
    config = {...Constants.EDITOR_CONFIG};
    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private supplierRepository: SupplierRepository) {
        this.subGroup.tabType = TabType.features.value;
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.parseRouteParam();
    }

    goBack(): void {
        this.route.navigate(['/supplier/supplier-tab/comparison/4']);
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            let parentId = params['parentId'];
            if (params['id'] != Constants.NON_ID) {
                this.id = params['id'];
                this.detail();
            } else {
                this.subGroup.parentId = parentId;
                this.parent();
            }
        })
    }

    detail(): void {
        this.supplierRepository.subGroupDetail(this.id).subscribe(res => {
            this.subGroup = Object.assign(this.subGroup, res.data);
        })
    }

    parent(): void {
        this.supplierRepository.groupDetail(this.subGroup.parentId).subscribe(res => {
            this.subGroup.parentName = res.data.name;
        })
    }

    saveSubGroup() {
        if (!this.subGroup.name) {
            this.toastRepository.showDanger('Name is required.')
            return;
        }
        this.supplierRepository.saveGroup(this.subGroup).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.storage.getItem<Reminder>('reminder').subscribe(data => {
                data.subGroupId = res.data.id;
                this.storage.setItem<Reminder>('reminder', data);
            });
            this.toastRepository.showSuccess(`${this.id ? 'Update' : 'Save'} Successfully.`);
            this.id = res.data.id;
            this.subGroup.id = this.id;
        });
    }
}
