import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../../service/config.service";
import {PropertyInfo} from "../../../../../model/po/propertyInfo";
import {Constants} from "../../../../../model/constants";
import {LocalStorageObServable} from "../../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";
import {ConfigurationRepository} from "../../../../../repository/configuration-repository";
import {TabType} from "../../../../../model/enums/tab-type";
import {PropStatus} from "../../../../../model/enums/prop-status";
import {Version} from "../../../../../model/po/version";
import {VersionRepository} from "../../../../../repository/version-repository";
import {PropType} from "../../../../../model/enums/prop-type";
import {environment} from "../../../../../../environments/environment";
import {SaveService} from "../../../../../service/save.service";

@Component({
    selector: 'app-edit-prop',
    templateUrl: './edit-prop.component.html',
    styleUrls: ['./edit-prop.component.less']
})
export class EditPropComponent implements OnInit {
    version: Version = new Version();
    prop: PropertyInfo = new PropertyInfo();
    config = {...Constants.EDITOR_CONFIG};
    editType = '';
    currentTab: number;
    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                private saveService: SaveService,
                public configService: ConfigService,
                private versionRepository: VersionRepository,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private configurationRepository: ConfigurationRepository) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.parseRouteParam();
        this.versionDetail();
        this.initByCurrentTab();
        this.detail();
    }

    versionDetail(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data;
        })
    }

    initByCurrentTab(): void{
        this.prop.tabType = this.currentTab;
        if (this.currentTab == TabType.features.value) {
            this.prop.type = PropType.boolean.value;
        }
        switch (this.currentTab) {
            case TabType.overview.value:
                break;
            case TabType.information.value:
                break;
            case TabType.esg.value:
                break;
            case TabType.features.value:
                this.getGroup();
                break;
            case TabType.feesAndRates.value:
                break;
            case TabType.changeHistory.value:
                break;
        }
    }

    goBack(): void {
        let tabType = TabType.parseEnum(this.currentTab);
        let tab = this.configService.converterTabToRouter(tabType.name);
        this.route.navigate([`/configuration/configuration-tab/${tab}/${this.version.id}`]);
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.version.id = params[Constants.VERSION];
            this.currentTab = parseInt(params['tab']);
            this.prop.shGroupId = params['groupId'] == Constants.NON_ID ? '': params['groupId'];
            this.prop.id = params['id'] == Constants.NON_ID ? '' : params['id'];
        })
        this.activatedRoute.queryParams.subscribe(query => {
            console.log('edit prop query params ===> ', query)
            this.editType = query['type']
        })
    }

    detail(): void {
        if (!this.prop.id) {
            return;
        }
        this.configurationRepository.propDetail(this.prop.id, this.version.id).subscribe(res => {
            this.prop = Object.assign(this.prop, res.data);
        });
    }


    getGroup(): void {
        if (!this.prop.shGroupId) {
            return;
        }
        this.configurationRepository.subGroupDetail(this.prop.shGroupId, this.version.id).subscribe(res => {
            this.prop.topGroupName = res.data.parentName;
            this.prop.subGroupName = res.data.name;
        });
    }

    updateStatus(status: string): void {
        const _prop = JSON.parse(JSON.stringify(this.prop))
        _prop.status = status;
        this.saveProp(_prop);
    }

    saveProp(_prop: PropertyInfo) {
        if (!_prop.name) {
            this.toastRepository.showDanger('Name is required.');
            return;
        }
        if (!_prop.type) {
            this.toastRepository.showDanger('Field type is required.');
            return;
        }
        if (this.saveService.saveCheck(`${environment.baseURL}/supplier/saveOrUpdateProperty`)) {
            return;
        }
        this.configurationRepository.saveProp(_prop).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess(`${_prop.id ? 'Update' : 'Save'} Successfully.`);
            this.prop.id = res.data.id;
            this.prop.moveFlag = res.data.moveFlag;
            this.prop.status = res.data.status
        });
    }
}
