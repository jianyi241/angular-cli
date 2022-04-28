import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigurationRepository} from "../../../../repository/configuration-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {VersionRepository} from "../../../../repository/version-repository";
import {Version} from "../../../../model/po/version";
import {PropertyInfo} from "../../../../model/po/propertyInfo";
import {ConfigService} from "../../../../service/config.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Constants} from "../../../../model/constants";
import {PropStatus} from "../../../../model/enums/prop-status";
import {ToastRepository} from "../../../../repository/toast-repository";
import {Sort} from "../../../../model/vo/sort";

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
                private toastRepository: ToastRepository,
                private configurationRepository: ConfigurationRepository,
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
        if (!this.version.id || this.version.id === Constants.VERSION) {
            return;
        }
        this.supplierVersion();
        this.propList();
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

    propList(): void {
        this.configurationRepository.propListByType(TabType.overview.value, this.version.id).subscribe(res => {
            if (!res.data) {
                return;
            }
            this.freezeProps = res.data.filter(p => !p.moveFlag);
            this.moveProps = res.data.filter(p => p.moveFlag);
        });
    }

    save(id?: string): void {
        this.route.navigateByUrl(`/configuration/edit-prop/${TabType.overview.value}/${id || Constants.NON_ID}/0/${this.version.id}`);
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
