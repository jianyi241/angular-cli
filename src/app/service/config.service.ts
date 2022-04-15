import {Injectable} from '@angular/core';
import {TabType} from "../model/enums/tab-type";
import {Router} from "@angular/router";
import {PropType} from "../model/enums/prop-type";
import {VersionType} from "../model/enums/version-type";
import {PracticeStatus} from "../model/enums/practice-status";
import {UserStatus} from "../model/enums/user-status";
import {RoleType} from "../model/enums/role-type";

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

    roleType = {
        accountAdmin: RoleType.AccountAdmin.value,
        adviser: RoleType.Adviser.value,
        support: RoleType.Support.value,
    }

    constructor(private router: Router) {
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

    activeMatch(routerUrl: string): string {
        return this.router.url.includes(routerUrl.toLowerCase().replace(' ', '-')) ? 'active' : '';
    }

    isEditable(versionType: string, status?: string): boolean {
        if (!status) return versionType === VersionType.Draft.value;
        return versionType === VersionType.Draft.value && status != 'Archive';
    }

    showArchiveBtn(versionType: string, flag: boolean): boolean {
        return versionType != VersionType.Publish.value && flag;
    }

    getClassByStatus(value: string, versionType: string): string {
        if (versionType === VersionType.Publish.value) return '';
        switch (value) {
            case 'Insert':
            case 'Update':
                return 'bg-blue';
            case 'Archive':
                return 'bg-red';
            default:
                return '';
        }
    }

    getColorByStatus(status: string, versionType: string): string {
        if (versionType === VersionType.Publish.value) return '';
        switch (status) {
            case 'Insert':
            case 'Update':
                return 'tx-blue';
            case 'Archive':
                return 'tx-red';
            default:
                return '';
        }
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
}
