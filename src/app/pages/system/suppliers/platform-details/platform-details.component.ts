import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {VersionRepository} from "../../../../repository/version-repository";
import {Version} from "../../../../model/po/version";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {ConfigService} from "../../../../service/config.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-platform-details',
    templateUrl: './platform-details.component.html',
    styleUrls: ['./platform-details.component.less']
})
export class PlatformDetailsComponent implements OnInit, OnDestroy {
    version: Version = new Version();
    notMoveProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    canMoveProps: Array<PropertyInfo> = new Array<PropertyInfo>();
    routerSubscription: any;

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
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
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
        this.supplierVersion();
        this.propList();
    }

    parseRouterParam(): void {
        this.activatedRoute.params.subscribe(res => {
            this.version.id = res['version'];
            if (!this.version.id || this.version.id === 'version') {
                return;
            }
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
            this.notMoveProps = res.data.filter(p => !p.moveFlag);
            this.canMoveProps = res.data.filter(p => p.moveFlag);
        });
    }

    save(id?: string): void {
        this.route.navigateByUrl(`/supplier/edit-platform/${id || 0}/${this.version.id}`);
    }

    dropProps($event: CdkDragDrop<PropertyInfo, any>) {
        moveItemInArray(this.canMoveProps, $event.previousIndex, $event.currentIndex);
    }
}
