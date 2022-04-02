import {Component, OnDestroy, OnInit} from '@angular/core';
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {Reminder} from "../../../../model/vo/reminder";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Version} from "../../../../model/po/version";
import {VersionRepository} from "../../../../repository/version-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";

@Component({
    selector: 'app-comparison-tool',
    templateUrl: './comparison-tool.component.html',
    styleUrls: ['./comparison-tool.component.less']
})
export class ComparisonToolComponent implements OnInit, OnDestroy {
    version: Version = new Version();
    freezeGroups: Array<GroupInfo> = new Array<GroupInfo>();
    moveGroups: Array<GroupInfo> = new Array<GroupInfo>();
    subGroups: Array<GroupInfo> = new Array<GroupInfo>();
    properties: Array<PropertyInfo> = new Array<PropertyInfo>();
    reminder: Reminder = new Reminder();
    routerSubscription: any;
    activatedRouteSubscription: any;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                private versionRepository: VersionRepository,
                private supplierRepository: SupplierRepository,
                public configService: ConfigService) {
        this.storage.getItem<Reminder>('reminder' + TabType.features.value).subscribe(data => {
            if (data != 'undefined' && data) {
                this.reminder = data;
            }
        });
    }

    ngOnInit(): void {
        this.subscribe();
        this.init();
    }

    ngOnDestroy(): void {
        this.routerSubscription && this.routerSubscription.unsubscribe();
        this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
    }


    init(): void {
        this.parseRouteParam();
        if (!this.version.id || this.version.id === 'version') {
            return;
        }
        this.supplierVersion();
        this.getGroupList();
    }

    subscribe(): void {
        this.routerSubscription = this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.init();
            }
        });
    }

    parseRouteParam(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
            this.version.id = res['version'];
        });
    }

    supplierVersion(): void {
        if (!this.version.id || this.version.id === 'version') {
            return;
        }
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        })
    }

    getGroupList(): void {
        this.supplierRepository.groupList(TabType.features.value, this.version.id).subscribe(res => {
            if (!res.data) {
                return;
            }
            let group = res.data.find(g => g.id == this.reminder.groupId);
            this.reminder.groupId = group?.id || '';
            this.moveGroups = res.data.filter(g => g.moveFlag);
            this.freezeGroups = res.data.filter(g => !g.moveFlag);
            if (this.reminder.groupId) {
                this.subGroups = group.subList || [];
                let subGroup = this.subGroups.find(sg => sg.id == this.reminder.subGroupId);
                this.chooseSubGroup(subGroup || this.subGroups[0]);
                return;
            }
            if (this.freezeGroups && this.freezeGroups.length > 0) {
                this.reminder.groupId = this.freezeGroups[0].id;
                this.subGroups = this.freezeGroups[0].subList || [];
            } else if (this.moveGroups && this.moveGroups.length > 0) {
                this.reminder.groupId = this.moveGroups[0].id;
                this.subGroups = this.moveGroups[0].subList || [];
            }
            this.chooseSubGroup(this.subGroups[0]);

        })
    }

    getPropList(subGroupId: string): void {
        this.supplierRepository.propList(subGroupId, this.version.id).subscribe(res => {
            this.properties = res.data;
        });
    }

    saveGroup(group?: GroupInfo): void {
        this.reminder.groupId = group?.id;
        this.storage.setItem<Reminder>('reminder' + TabType.features.value, this.reminder);
        this.route.navigateByUrl(`/supplier/edit-group/${TabType.features.value}/${(group?.id) || Constants.NON_ID}/${this.version.id}`)
    }

    saveSubGroup(subGroup?: GroupInfo) {
        this.reminder.subGroupId = subGroup?.id;
        this.storage.setItem<Reminder>('reminder' + TabType.features.value, this.reminder);
        this.route.navigateByUrl(`/supplier/edit-sub-group/${TabType.features.value}/${(subGroup?.id) || Constants.NON_ID}/${this.reminder.groupId}/${this.version.id}`)
    }

    saveProp(prop?: PropertyInfo) {
        this.storage.setItem<Reminder>('reminder' + TabType.features.value, this.reminder);
        this.route.navigateByUrl(`/supplier/edit-prop/${TabType.features.value}/${(prop?.id) || Constants.NON_ID}/${this.reminder.subGroupId}/${this.version.id}`)
    }

    chooseGroup(group: GroupInfo) {
        this.reminder.groupId = group.id;
        this.storage.setItem<Reminder>('reminder' + TabType.features.value, this.reminder);
        this.subGroups = group.subList || [];
        if (this.subGroups.length == 0) {
            this.properties = new Array<PropertyInfo>();
            return;
        }
        this.chooseSubGroup(this.subGroups[0]);
    }

    chooseSubGroup(subGroup: GroupInfo) {
        if (!subGroup) return;
        this.reminder.subGroupId = subGroup.id;
        this.storage.setItem<Reminder>('reminder' + TabType.features.value, this.reminder);
        this.getPropList(subGroup.id);
    }


    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        moveItemInArray(this.properties, $event.previousIndex, $event.currentIndex);
    }

    dropSubGroup($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.subGroups, $event.previousIndex, $event.currentIndex);
    }

    dropGroup($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.moveGroups, $event.previousIndex, $event.currentIndex);
    }
}
