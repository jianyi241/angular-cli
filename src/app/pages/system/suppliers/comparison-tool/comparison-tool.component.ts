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
import {GroupStatus} from "../../../../model/enums/group-status";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PropStatus} from "../../../../model/enums/prop-status";

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
    hideGroupArchive = true;
    hideSubGroupArchive = true;
    hidePropArchive = true;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                private versionRepository: VersionRepository,
                private toastRepository: ToastRepository,
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
            this.moveGroups = res.data.filter(g => g.moveFlag);
            this.freezeGroups = res.data.filter(g => !g.moveFlag);
            let group = res.data.find(g => g.id == this.reminder.groupId && g.status != GroupStatus.Archive.value);
            this.reminder.groupId = group?.id || '';
            if (this.reminder.groupId) {
                this.subGroups = group.subList || [];
                let filter = this.subGroups.filter(sg => sg.status != GroupStatus.Archive.value);
                let subGroup = this.subGroups.find(sg => sg.id == this.reminder.subGroupId && sg.status != GroupStatus.Archive.value);
                this.chooseSubGroup(subGroup || filter[0]);
                return;
            }
            let filter1 = this.freezeGroups.filter(f => f.status != GroupStatus.Archive.value);
            let filter2 = this.moveGroups.filter(f => f.status != GroupStatus.Archive.value);
            if (filter1.length > 0) {
                this.reminder.groupId = filter1[0].id;
                this.subGroups = filter1[0].subList || [];
            } else if (filter2.length > 0) {
                this.reminder.groupId = filter2[0].id;
                this.subGroups = filter2[0].subList || [];
            }
            let filter = this.subGroups.filter(sg => sg.status != GroupStatus.Archive.value);
            this.chooseSubGroup(filter[0]);

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
        let prop = {...this.properties[$event.currentIndex]};
        prop.newSort = $event.currentIndex + 1;
        this.supplierRepository.sortProp(prop).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    dropSubGroup($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.subGroups, $event.previousIndex, $event.currentIndex);
        let subGroup = {...this.subGroups[$event.currentIndex]};
        subGroup.newSort = $event.currentIndex + 1;
        this.supplierRepository.sortGroup(subGroup).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    dropGroup($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.moveGroups, $event.previousIndex, $event.currentIndex);
        let group = {...this.moveGroups[$event.currentIndex]};
        group.newSort = $event.currentIndex + 1;
        this.supplierRepository.sortGroup(group).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    emptyList(): boolean {
        if (this.hidePropArchive) {
            let filter = this.properties.filter(m => m.status != PropStatus.Archive.value);
            return filter.length == 0;
        } else {
            return this.properties.length == 0
        }
    }

    showGroupArchived(): void {
        this.hideGroupArchive = false;
    }

    showSubGroupArchived(): void {
        this.hideSubGroupArchive = false;
    }

    showPropArchived(): void {
        this.hidePropArchive = false;
    }
}
