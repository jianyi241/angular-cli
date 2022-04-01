import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../../../model/constants";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {ConfigService} from "../../../../service/config.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PropStatus} from "../../../../model/enums/prop-status";
import {VersionRepository} from "../../../../repository/version-repository";
import {Version} from "../../../../model/po/version";

@Component({
    selector: 'app-platform-edit',
    templateUrl: './platform-edit.component.html',
    styleUrls: ['./platform-edit.component.less']
})
export class PlatformEditComponent implements OnInit {
    version: Version = new Version();
    config = {...Constants.EDITOR_CONFIG};
    prop: PropertyInfo = new PropertyInfo();

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
                private supplierRepository: SupplierRepository) {
    }

    ngOnInit(): void {
        this.parseRouterParam();
        this.propDetail();
        this.versionDetail();

    }

    parseRouterParam(): void {
        this.activatedRoute.params.subscribe(res => {
            if (res['id'] != Constants.NON_ID) {
                this.prop.id = res['id'];
            }
            this.version.id = res['version'];
        })
    }

    propDetail(): void {
        this.supplierRepository.propDetail(this.prop.id, this.version.id).subscribe(res => {
            this.prop = res.data || this.prop;
        });
    }

    versionDetail(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data;
        })
    }

    goBack(): void {
        this.route.navigateByUrl(`/supplier/supplier-tab/overview/${this.version.id}`);
    }

    save(): void {
        if (!this.prop.name) {
            this.toastRepository.showDanger('Name is required');
            return;
        }
        if (!this.prop.type) {
            this.toastRepository.showDanger('Field type is required');
            return;
        }
        this.supplierRepository.saveProp(this.prop).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess(`${this.prop.id ? 'Update' : 'Save'} Successfully.`);
            this.prop.id = res.data.id;
        })
    }

    archive(): void {
        this.prop.status = PropStatus.Archive.value;
        this.save();
    }


}
