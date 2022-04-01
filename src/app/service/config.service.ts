import {Injectable} from '@angular/core';
import {TabType} from "../model/enums/tab-type";
import {Router} from "@angular/router";
import {PropType} from "../model/enums/prop-type";
import {VersionType} from "../model/enums/version-type";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private router: Router) {
    }

    tabTypeList(): Array<TabType> {
        return TabType.Values();
    }

    propTypeList(): Array<PropType> {
        return PropType.Values();
    }

    getPropType(value: number): string {
        return PropType.parseEnum(value).name;
    }

    activeMatch(routerUrl: string): string {
        return this.router.url.includes(routerUrl.toLowerCase()) ? 'active' : '';
    }

    isEditable(versionType: string): boolean {
        return versionType === VersionType.Draft.value;
    }
}
