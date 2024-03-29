import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {ConfigurationRepository} from "../../../../repository/configuration-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {Version} from "../../../../model/po/version";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";
import {Reminder} from "../../../../model/vo/reminder";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {PropStatus} from "../../../../model/enums/prop-status";
import {GroupStatus} from "../../../../model/enums/group-status";
import {ToastRepository} from "../../../../repository/toast-repository";
import {Sort} from "../../../../model/vo/sort";

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
    hideSectionArchive = true;
    hidePropArchive = true;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private localStorage: LocalStorageObServable,
                private toastRepository: ToastRepository,
                private configurationRepository: ConfigurationRepository,
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
        if (!this.version.id || this.version.id === Constants.VERSION) {
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
            this.version.id = res[Constants.VERSION];
        });
    }

    supplierVersion(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        })
    }

    sectionList(): void {
        this.configurationRepository.groupList(TabType.information.value, this.version.id).subscribe(res => {
            if (!res.data) {
                return;
            }
            let section = res.data.find(g => g.id == this.reminder.groupId && g.status != GroupStatus.Archive.value);
            this.reminder.groupId = section?.id || '';
            this.moveSections = res.data.filter(g => g.moveFlag);
            this.freezeSections = res.data.filter(g => !g.moveFlag);
            let filter1 = this.freezeSections.filter(f => f.status != GroupStatus.Archive.value);
            let filter2 = this.moveSections.filter(f => f.status != GroupStatus.Archive.value);
            if (filter1.length > 0) {
                this.propList(this.reminder.groupId || filter1[0].id);
                return;
            }
            if (filter2.length > 0) {
                this.propList(this.reminder.groupId || filter2[0].id);
            }
        });
    }

    propList(groupId: string): void {
        this.reminder.groupId = groupId;
        this.configurationRepository.propList(this.reminder.groupId, this.version.id).subscribe(res => {
            if (!res.data) return;
            this.moveProps = res.data.filter(p => p.moveFlag);
            this.freezeProps = res.data.filter(p => !p.moveFlag);
        })
    }

    dropSections($event: CdkDragDrop<GroupInfo, any>) {
        let cur = this.moveSections[$event.previousIndex];
        let tar = this.moveSections[$event.currentIndex];
        let sort = new Sort(cur.id, $event.previousIndex, tar.id, $event.currentIndex);
        console.log(`Tar => ${tar.name}-${$event.currentIndex}, Cur => ${cur.name}-${$event.previousIndex}`);
        moveItemInArray(this.moveSections, $event.previousIndex, $event.currentIndex);
        this.configurationRepository.sortGroup(sort).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        let cur = this.moveProps[$event.previousIndex];
        let tar = this.moveProps[$event.currentIndex];
        let sort = new Sort(cur.id, $event.previousIndex, tar.id, $event.currentIndex);
        console.log(`Tar => ${tar.name}-${$event.currentIndex}, Cur => ${cur.name}-${$event.previousIndex}`);
        moveItemInArray(this.moveProps, $event.previousIndex, $event.currentIndex);
        this.configurationRepository.sortProp(sort).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    saveProp(id?: string): void {
        this.route.navigateByUrl(`/configuration/edit-prop/${TabType.information.value}/${id || Constants.NON_ID}/${this.reminder.groupId}/${this.version.id}`);
    }

    saveSection(id?: string, event?: any,type?: string): void {
        event && event.stopPropagation();
        this.storageReminder('groupId', id);
        this.route.navigateByUrl(`/configuration/edit-group/${TabType.information.value}/${id || Constants.NON_ID}/${this.version.id}/${type}`);
    }

    chooseSection(id: string) {
        this.storageReminder('groupId', id);
        this.propList(id);
    }

    storageReminder(name: string, value: string): void {
        this.reminder[name] = value;
        this.localStorage.setItem('reminder' + TabType.information.value, this.reminder);
    }

    activeGroup(id: string): string {
        return this.reminder.groupId == id ? 'active' : '';
    }

    emptyList(): boolean {
        if (this.hideSectionArchive) {
            if (this.hidePropArchive) {
                let filter1 = this.moveProps.filter(m => m.status != PropStatus.Archive.value);
                let filter2 = this.freezeProps.filter(m => m.status != PropStatus.Archive.value);
                return filter1.length == 0 && filter2.length == 0;
            } else {
                return this.moveProps.length == 0 && this.freezeProps.length == 0;
            }
        } else {
            return this.moveProps.length == 0 && this.freezeProps.length == 0;
        }
    }

    showSectionArchived(): void {
        this.hideSectionArchive = !this.hideSectionArchive;
    }

    showPropArchived(): void {
        this.hidePropArchive = !this.hidePropArchive;
    }
}
