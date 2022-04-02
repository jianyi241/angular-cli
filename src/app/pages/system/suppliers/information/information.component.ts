import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {Version} from "../../../../model/po/version";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";
import {Reminder} from "../../../../model/vo/reminder";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit, OnDestroy {
    version: Version = new Version();
    moveSections: Array<GroupInfo> = new Array<GroupInfo>();
    freezeSections: Array<GroupInfo> = new Array<GroupInfo>();
    moveProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    freezeProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    reminder: Reminder = new Reminder();
    routerSubscription: any;
    activatedRouteSubscription: any;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private localStorage: LocalStorageObServable,
                private supplierRepository: SupplierRepository,
                private versionRepository: VersionRepository) {
        this.localStorage.getItem('reminder' + TabType.information.value).subscribe(data => {
            if (data != 'undefined' && data) {
                this.reminder = data;
            }
        })
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
        this.parseRouterParam();
        if (!this.version.id || this.version.id === 'version') {
            return;
        }
        this.supplierVersion();
        this.sectionList();
    }

    subscribe(): void {
        this.routerSubscription = this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.init();
            }
        });
    }

    parseRouterParam(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
            this.version.id = res['version'];
        });
    }

    supplierVersion(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        })
    }

    sectionList(): void {
        this.supplierRepository.groupList(TabType.information.value, this.version.id).subscribe(res => {
            if (!res.data) {
                return;
            }
            let section = res.data.find(g => g.id == this.reminder.groupId);
            this.reminder.groupId = section?.id || '';
            this.moveSections = res.data.filter(g => g.moveFlag);
            this.freezeSections = res.data.filter(g => !g.moveFlag);
            if (this.freezeSections && this.freezeSections.length > 0) {
                this.propList(this.reminder.groupId || this.freezeSections[0].id);
                return;
            }
            if (this.moveSections && this.moveSections.length > 0) {
                this.propList(this.reminder.groupId || this.moveSections[0].id);
            }
        });
    }

    propList(groupId: string): void {
        this.reminder.groupId = groupId;
        this.supplierRepository.propList(this.reminder.groupId, this.version.id).subscribe(res => {
            if (!res.data) return;
            this.moveProps = res.data.filter(p => p.moveFlag);
            this.freezeProps = res.data.filter(p => !p.moveFlag);
        })
    }

    dropSections($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.moveSections, $event.previousIndex, $event.currentIndex);
    }

    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        moveItemInArray(this.moveProps, $event.previousIndex, $event.currentIndex);
    }

    saveProp(id?: string): void {
        this.route.navigateByUrl(`/supplier/edit-prop/${TabType.information.value}/${id || Constants.NON_ID}/${this.reminder.groupId}/${this.version.id}`);
    }

    saveSection(id?: string, event?: any): void {
        event && event.stopPropagation();
        this.storageReminder('groupId', id);
        this.route.navigateByUrl(`/supplier/edit-group/${TabType.information.value}/${id || Constants.NON_ID}/${this.version.id}`);
    }

    chooseSection(id: string) {
        this.storageReminder('groupId', id);
        this.propList(id);
    }

    storageReminder(name: string, value: string):void {
        this.reminder[name] = value;
        this.localStorage.setItem('reminder' + TabType.information.value, this.reminder);
    }

    activeGroup(id: string): string {
        return this.reminder.groupId == id ? 'active' : '';
    }
}
