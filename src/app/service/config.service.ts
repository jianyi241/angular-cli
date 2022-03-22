import {Injectable} from '@angular/core';
import {TabType} from "../model/enums/tab-type";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    //下个版本移除
    currentTabType;

    constructor() {
    }

    tabTypeList(): Array<TabType> {
        return TabType.Values();
    }

    chooseTabType(tabType: number) {
        if (tabType != TabType.features.value) {
            return;
        }
        this.currentTabType = tabType;
    }

}
