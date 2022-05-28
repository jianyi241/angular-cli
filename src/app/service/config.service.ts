import {Injectable} from '@angular/core';
import {TabType} from "../model/enums/tab-type";
import {Router} from "@angular/router";
import {PropType} from "../model/enums/prop-type";
import {VersionType} from "../model/enums/version-type";
import {PracticeStatus} from "../model/enums/practice-status";
import {UserStatus} from "../model/enums/user-status";
import {RoleEnum} from "../model/enums/role-enum";
import {VersionStatus} from "../model/enums/version-status";
import {CurrentUserService} from "./current-user.service";
import {Version} from "../model/po/version";
import {AnalysisType} from "../model/enums/analysis-type";
import {WorkFlowsStatus} from "../model/enums/work-flows-status";
// @ts-ignore
import {ComparisonStatus} from "../model/enums/comparison-status";
import {PlatformStatus} from "../model/enums/platform-status";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {


    tabType = {
        overview: TabType.overview.value,
        information: TabType.information.value,
        esg: TabType.esg.value,
        feesAndRates: TabType.feesAndRates.value,
        features: TabType.features.value,
        changeHistory: TabType.changeHistory.value
    }

    propType = {
        shortText: PropType.shortText.value,
        longText: PropType.longText.value,
        integer: PropType.integer.value,
        boolean: PropType.boolean.value,
        attachment: PropType.attachment.value,
        date: 6,
    }

    practiceStatus = {
        active: PracticeStatus.Active.value,
        disable: PracticeStatus.Disable.value,
    }

    userStatus = {
        active: UserStatus.Active.value,
        disable: UserStatus.Disable.value,
        pending: UserStatus.Pending.value
    }

    roles = {
        superAdmin: RoleEnum.SuperAdmin.value,
        admin: RoleEnum.Admin.value,
        accountAdmin: RoleEnum.AccountAdmin.value,
        adviser: RoleEnum.Adviser.value,
        support: RoleEnum.Support.value,
        owner: RoleEnum.Owner.value,
        administrator: RoleEnum.Administrator.value,
        premiumUser: RoleEnum.User.value,
        businessDevelopmentManager: RoleEnum.BusinessDevelopmentManager.value,
    }

    versionStatus = {
        normal: VersionStatus.Normal.value,
        wait: VersionStatus.Wait.value,
        waitPublish: VersionStatus.WaitPublish.value,
        frozen: VersionStatus.Frozen.value,
        rejected: VersionStatus.Rejected.value,
    }

    versionType = {
        publish: VersionType.Publish.value,
        draft: VersionType.Draft.value,
        history: VersionType.History.value
    }

    analysisType = {
        feature: AnalysisType.feature.value,
        metric: AnalysisType.metric.value,
        fee: AnalysisType.fee.value,
    }

    platformStatus = {
        Active: PlatformStatus.Active.value,
        Disabled: PlatformStatus.Disabled.value,
        Pending: PlatformStatus.Pending.value
    }

    workflowStatus = {
        dataRequired: WorkFlowsStatus.DataRequired.value,
        awaitingApproval: WorkFlowsStatus.AwaitingApproval.value,
        awaitingPublish: WorkFlowsStatus.AwaitingPublish.value,
    }

    comparisonStatus = {
        inProgress: ComparisonStatus.InProgress.value,
        completed: ComparisonStatus.Completed.value,
    }

    currentVersion: Version = new Version()

    constructor(private router: Router, public currentUserService: CurrentUserService) {
    }

    tabTypeList(): Array<TabType> {
        return TabType.Values();
    }

    propTypeList(): Array<PropType> {
        return PropType.Values();
    }

    getPropType(value: number): string {
        return PropType.parseEnum(value)?.name || '';
    }

    activeMatch(tab: string): string {
        return this.router.url.includes(this.converterTabToRouter(tab)) ? 'active' : '';
    }

    isEditable(versionType: string, status?: string): boolean {
        if (this.currentUserService.isAdminUser()) {
            if (!status) return versionType === VersionType.Draft.value;
            return versionType === VersionType.Draft.value && status != 'Archive';
        } else if (this.currentUserService.isSupplierUser()) {
            if (this.currentVersion.versionStatus === this.versionStatus.wait || this.currentVersion.versionStatus === this.versionStatus.waitPublish) {
                return false
            }
            if (!status) {
                return versionType === VersionType.Draft.value;
            } else {
                return versionType === VersionType.Draft.value && status != 'Archive';
            }
        }
    }

    showArchiveBtn(versionType: string, flag: boolean): boolean {
        return versionType != VersionType.Publish.value && flag;
    }

    isWaitPublish(): boolean {
        return this.currentVersion.versionStatus === VersionStatus.WaitPublish.value
    }


    getClassByStatus(value: string, versionType: string): string {
        if (versionType === VersionType.Publish.value) return '';
        switch (value) {
            case 'Insert':
            case 'Update':
                return 'bg-blue';
            // case 'Archive':
            //     return 'bg-red';
            default:
                return '';
        }
    }

    getColorByStatus(status: string, prodStatus: string, versionType: string): string {
        if (versionType === VersionType.Publish.value) return '';
        let blueArr = ['Insert', 'Update'];
        let redArr = ['Archive'];
        if (blueArr.includes(status) || blueArr.includes(prodStatus)) {
            return 'tx-blue';
        }
        if (redArr.includes(status) || redArr.includes(prodStatus)) {
            return 'tx-red';
        }
        return '';
    }

    //Archive
    isArchive(status: string, versionType?: string): boolean {
        if (!versionType) {
            return status == 'Archive';
        }
        return status == 'Archive' && versionType == VersionType.Publish.value;
    }

    emptyList(items: any[], status = 'Archive'): boolean {
        let filter = items.filter(i => i.status != status);
        return filter.length == 0;
    }

    converterTabToRouter(tab: string) {
        if (tab == TabType.changeHistory.name) {
            return tab.toLowerCase().replace(' ', '-');
        }
        if (tab == TabType.feesAndRates.name) {
            return tab.toLowerCase().replace(' & ', '-');
        }
        return tab.toLowerCase();
    }

    fullName(firstName: string, lastName: string) {
        return [firstName, lastName].join(' ');
    }

    editViewBtn(versionStatus: string, tabType: number, readyOnly: boolean = false) {
        return this.currentVersion.versionStatus === VersionStatus.WaitPublish.value || readyOnly || (this.currentVersion.versionStatus === VersionStatus.Normal.value && this.currentVersion.type === VersionType.Publish.value && !readyOnly) || this.currentVersion.type === VersionType.History.value
        // if (tabType === TabType.features.value) { // *ngIf
        //     return this.currentVersion.versionStatus === VersionStatus.WaitPublish.value || readyOnly || (this.currentVersion.versionStatus === VersionStatus.Normal.value && this.currentVersion.type === 'Publish' && !readyOnly)
        // } else if (tabType === TabType.information.value) { // *ngIf
        //     return (this.currentVersion.versionStatus === VersionStatus.WaitPublish.value || readyOnly) || (this.currentVersion.versionStatus === VersionStatus.Normal.value && this.currentVersion.type === 'Publish' && !readyOnly)
        // } else if (tabType === TabType.esg.value) { // *ngIf
        //     return (this.currentVersion.versionStatus === VersionStatus.WaitPublish.value || readyOnly) || (this.currentVersion.versionStatus === VersionStatus.Normal.value && this.currentVersion.type === 'Publish' && !readyOnly)
        // }
        // return true
    }
}
