import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {Constants} from "../../../../model/constants";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../repository/toast-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {TabType} from "../../../../model/enums/tab-type";

@Component({
    selector: 'app-edit-prop',
    templateUrl: './edit-prop.component.html',
    styleUrls: ['./edit-prop.component.less']
})
export class EditPropComponent implements OnInit {
    id: string;
    prop: PropertyInfo = new PropertyInfo();
    config = {...Constants.EDITOR_CONFIG};
    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private supplierRepository: SupplierRepository) {
        this.prop.tabType = TabType.features.value;
        this.prop.type = 3;
        this.prop.status = 1;
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.parseRouteParam();
    }

    goBack(): void {
        this.route.navigate(['/supplier/comparison/4']);
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            let subGroupId = params['subGroupId'];
            if (params['id'] != Constants.NON_ID) {
                this.id = params['id'];
                this.detail();
            } else {
                this.prop.shGroupId = subGroupId;
                this.subGroup();
            }
        })
    }

    detail(): void {
        this.supplierRepository.propDetail(this.id).subscribe(res => {
            this.prop = Object.assign(this.prop, res.data);
        })
    }

    subGroup(): void {
        this.supplierRepository.subGroupDetail(this.prop.shGroupId).subscribe(res => {
            this.prop.topGroupName = res.data.parentName;
            this.prop.subGroupName = res.data.name;
        })
    }

    saveProp() {
        if (!this.prop.name) {
            this.toastRepository.showDanger('Name is required.')
            return;
        }
        this.supplierRepository.saveProp(this.prop).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess(`${this.id ? 'Update' : 'Save'} Successfully.`);
        });
    }
}
