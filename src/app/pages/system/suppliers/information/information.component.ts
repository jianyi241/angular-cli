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

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit, OnDestroy {
    version: Version = new Version();
    groupId: string;
    moveSections: Array<GroupInfo> = new Array<GroupInfo>();
    freezeSections: Array<GroupInfo> = new Array<GroupInfo>();
    moveProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    freezeProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    routerSubscription: any;
    activatedRouteSubscription: any;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private supplierRepository: SupplierRepository,
                private versionRepository: VersionRepository) {
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
            this.moveSections = res.data.filter(g => g.moveFlag);
            this.freezeSections = res.data.filter(g => !g.moveFlag);
            if (this.freezeSections && this.freezeSections.length > 0) {
                this.propList(this.freezeSections[0].id);
                return;
            }
            if (this.moveSections && this.moveSections.length > 0) {
                this.propList(this.moveSections[0].id);
            }
        });
    }

    propList(groupId: string): void {
        this.groupId = groupId;
        this.supplierRepository.propList(groupId, this.version.id).subscribe(res => {
            if (!res.data) return;
            this.moveProps = res.data.filter(p => p.moveFlag);
            this.freezeProps = res.data.filter(p => !p.moveFlag);
        })
    }

    goSectionEdit(): void {
        this.route.navigateByUrl(`/supplier/edit-section`);
    }

    dropSections($event: CdkDragDrop<GroupInfo, any>) {
        moveItemInArray(this.moveSections, $event.previousIndex, $event.currentIndex);
    }

    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        moveItemInArray(this.moveProps, $event.previousIndex, $event.currentIndex);
    }

    saveProp(id?: string): void {
        this.route.navigateByUrl(`/supplier/edit-prop/${TabType.information.value}/${id || Constants.NON_ID}/${this.groupId}/${this.version.id}`);
    }

    saveSection(id?: string, event?: any): void {
        event && event.stopPropagation();
        this.route.navigateByUrl(`/supplier/edit-group/${TabType.information.value}/${id || Constants.NON_ID}/${this.version.id}`);
    }

    chooseSection(id: string) {
        this.propList(id);
    }
}
