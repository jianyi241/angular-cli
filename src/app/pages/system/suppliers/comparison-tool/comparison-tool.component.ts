import {Component, OnInit} from '@angular/core';
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {Reminder} from "../../../../model/vo/reminder";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-comparison-tool',
    templateUrl: './comparison-tool.component.html',
    styleUrls: ['./comparison-tool.component.less']
})
export class ComparisonToolComponent implements OnInit {
    groups: Array<GroupInfo> = new Array<GroupInfo>();
    subGroups: Array<GroupInfo> = new Array<GroupInfo>();
    properties: Array<PropertyInfo> = new Array<PropertyInfo>();
    reminder: Reminder = new Reminder();

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                private supplierRepository: SupplierRepository,
                public configService: ConfigService) {
        this.storage.getItem<Reminder>('reminder').subscribe(data => {
            if (data != 'undefined' && data) {
                this.reminder = data;
            }
        });
    }

    ngOnInit(): void {
        this.init();
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.configService.currentTabType = TabType.parseEnum(params['type']).value;
            console.log(`supplier params ==>`, params);
        })
    }

    init(): void {
        this.parseRouteParam();
        this.getGroupList();
    }

    getGroupList(): void {
        this.supplierRepository.groupList(4).subscribe(res => {
            this.groups = res.data;
            if (this.groups.length == 0) return;
            let groupInfo;
            if (!this.reminder.groupId) {
                groupInfo = this.groups[0];
                this.reminder.groupId = groupInfo.id;
            } else {
                groupInfo = this.groups.find(group => group.id == this.reminder.groupId);
            }
            this.subGroups = groupInfo.subList || [];
            if (this.subGroups.length == 0) {
                this.properties = new Array<PropertyInfo>();
                return;
            }
            if (!this.reminder.subGroupId || !this.subGroups.some(subGroup => subGroup.id == this.reminder.subGroupId)) {
                this.chooseSubGroup(this.subGroups[0]);
            } else {
                this.chooseSubGroup(this.subGroups.find(subGroup => subGroup.id == this.reminder.subGroupId));
            }
        })
    }

    getPropList(): void {
        this.supplierRepository.propList(this.reminder.subGroupId).subscribe(res => {
            this.properties = res.data;
        });
    }

    saveGroup(group?: GroupInfo): void {
        this.reminder.groupId = group?.id;
        this.storage.setItem<Reminder>('reminder', this.reminder);
        this.route.navigateByUrl(`/supplier/edit-group/${(group?.id) || 0}`)
    }

    saveSubGroup(subGroup?: GroupInfo) {
        this.reminder.subGroupId = subGroup?.id;
        this.storage.setItem<Reminder>('reminder', this.reminder);
        this.route.navigateByUrl(`/supplier/edit-sub-group/${(subGroup?.id) || 0}/${this.reminder.groupId}`)
    }

    saveProp(prop?: PropertyInfo) {
        this.reminder.propId = prop?.id;
        this.storage.setItem<Reminder>('reminder', this.reminder);
        this.route.navigateByUrl(`/supplier/edit-prop/${(prop?.id) || 0}/${this.reminder.subGroupId}`)
    }

    chooseGroup(group: GroupInfo) {
        this.reminder.groupId = group.id;
        this.subGroups = group.subList || [];
        if (this.subGroups.length == 0) {
            this.properties = new Array<PropertyInfo>();
            return;
        }
        this.chooseSubGroup(this.subGroups[0]);
    }

    chooseSubGroup(subGroup: GroupInfo) {
        this.reminder.subGroupId = subGroup.id;
        this.getPropList();
    }


    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        moveItemInArray(this.properties, $event.previousIndex, $event.currentIndex);
    }

    dropSubGroup($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.subGroups, $event.previousIndex, $event.currentIndex);
    }

    dropGroup($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.groups, $event.previousIndex, $event.currentIndex);
    }
}
