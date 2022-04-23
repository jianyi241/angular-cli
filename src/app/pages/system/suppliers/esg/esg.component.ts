import {Component, OnDestroy, OnInit} from '@angular/core';
import {Version} from "../../../../model/po/version";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {Constants} from "../../../../model/constants";
import {PropStatus} from "../../../../model/enums/prop-status";
import {ToastRepository} from "../../../../repository/toast-repository";
import {Sort} from "../../../../model/vo/sort";

@Component({
    selector: 'app-esg',
    templateUrl: './esg.component.html',
    styleUrls: ['./esg.component.less']
})
export class EsgComponent implements OnInit, OnDestroy {
    version: Version = new Version();
    moveProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    freezeProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    routerSubscription: any;
    activatedRouteSubscription: any;
    hideArchive = true;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
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
        if (!this.version.id || this.version.id === Constants.VERSION) {
            return;
        }
        this.supplierVersion();
        this.propList();
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
        if (!this.version.id || this.version.id === Constants.VERSION) {
            return;
        }
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        })
    }

    propList(): void {
        this.supplierRepository.propListByType(TabType.esg.value, this.version.id).subscribe(res => {
            if (!res.data) {
                return;
            }
            this.moveProps = res.data.filter(g => g.moveFlag);
            this.freezeProps = res.data.filter(g => !g.moveFlag);
        });
    }

    save(id?: string): void {
        this.route.navigateByUrl(`/supplier/edit-prop/${TabType.esg.value}/${id || Constants.NON_ID}/0/${this.version.id}`);
    }

    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        let cur = this.moveProps[$event.previousIndex];
        let tar = this.moveProps[$event.currentIndex];
        let sort = new Sort(cur.id, $event.previousIndex, tar.id, $event.currentIndex);
        console.log(`Tar => ${tar.name}-${$event.currentIndex}, Cur => ${cur.name}-${$event.previousIndex}`);
        moveItemInArray(this.moveProps, $event.previousIndex, $event.currentIndex);
        this.supplierRepository.sortProp(sort).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    emptyList(): boolean {
        if (this.hideArchive) {
            let filter1 = this.moveProps.filter(m => m.status != PropStatus.Archive.value);
            let filter2 = this.freezeProps.filter(m => m.status != PropStatus.Archive.value);
            return filter1.length == 0 && filter2.length == 0;
        } else {
            return this.moveProps.length == 0 && this.freezeProps.length == 0;
        }
    }

    showArchived(): void {
        this.hideArchive = false;
    }

}
