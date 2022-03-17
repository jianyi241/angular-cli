import {Injectable} from '@angular/core';
import {TabType} from "../model/enums/tab-type";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    readonly Group_Type = {
        Group: 'Group',
        SubGroup: 'SubGroup'
    }

    constructor() {
    }

    tabTypeList(): Array<TabType> {
        return TabType.Values();
    }

}
