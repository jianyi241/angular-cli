import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {VersionRepository} from "../../../../repository/version-repository";
import {Version} from "../../../../model/po/version";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {ConfigService} from "../../../../service/config.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Constants} from "../../../../model/constants";
import {PropStatus} from "../../../../model/enums/prop-status";

@Component({
    selector: 'app-platform-details',
    templateUrl: './platform-details.component.html',
    styleUrls: ['./platform-details.component.less']
})
export class PlatformDetailsComponent implements OnInit, OnDestroy {
    version: Version = new Version();
    freezeProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    moveProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    routerSubscription: any;
    activatedRouteSubscription: any;
    hideArchive: boolean = true;

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

    subscribe(): void {
        this.routerSubscription = this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.init();
            }
        });
    }

    init(): void {
        this.parseRouterParam();
        if (!this.version.id || this.version.id === 'version') {
            return;
        }
        this.supplierVersion();
        this.propList();
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

    propList(): void {
        this.supplierRepository.propListByType(TabType.overview.value, this.version.id).subscribe(res => {
            if (!res.data) {
                return;
            }
            this.freezeProps = res.data.filter(p => !p.moveFlag);
            this.moveProps = res.data.filter(p => p.moveFlag);
        });
    }

    save(id?: string): void {
        this.route.navigateByUrl(`/supplier/edit-prop/${TabType.overview.value}/${id || Constants.NON_ID}/0/${this.version.id}`);
    }

    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        moveItemInArray(this.moveProps, $event.previousIndex, $event.currentIndex);
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
