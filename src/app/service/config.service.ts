import {Injectable} from '@angular/core';
import {TabType} from "../model/enums/tab-type";
import {Router} from "@angular/router";
import {PropType} from "../model/enums/prop-type";
import {VersionType} from "../model/enums/version-type";

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
        return this.router.url.includes(routerUrl.toLowerCase()) ? 'active' : '';
    }

    isEditable(versionType: string): boolean {
        return versionType === VersionType.Draft.value;
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

    isArchive(status: string) {
        return status == 'Archive';
    }
}
