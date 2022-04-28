import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {ConfigurationRepository} from "../../../../repository/configuration-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {Version} from "../../../../model/po/version";
import {VersionType} from "../../../../model/enums/version-type";
import * as moment from 'moment';

@Component({
    selector: 'app-change-history',
    templateUrl: './change-history.component.html',
    styleUrls: ['./change-history.component.less']
})
export class ChangeHistoryComponent implements OnInit {
    versions: Array<Version> = new Array<Version>();


    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private configurationRepository: ConfigurationRepository,
                private versionRepository: VersionRepository) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.versionList();
    }

    versionList(): void {
        this.configurationRepository.versionList().subscribe(res => {
            this.versions = res.data;
        })
    }

    getVersionName(version: Version): string {
        if (version.type == VersionType.Draft.value) return VersionType.Draft.name;
        return `Release ${moment(version.updateTime).format('D MMM YY')}`;
    }

    getVersionTime(version: Version): string {
        //Last updated 5:34pm 27 Mar 22
        if (version.type == VersionType.Draft.value) return `Last updated ${moment(version.updateTime).format('h:mma D MMM YY')}`;
        //2:34pm 1 Jan 22
        return `Released ${moment(version.updateTime).format('h:mma D MMM YY')}`;
    }

    editConfig(version: Version): void {
        this.route.navigateByUrl('/', {
            skipLocationChange: true
        }).then(() => {
            this.route.navigate([`/configuration/configuration-tab/overview/${version.id}`]);
        });
    }

    viewRelease(version: Version): void {
        this.route.navigateByUrl('/configuration', {
            skipLocationChange: true
        }).then(() => {
            this.route.navigate([`/configuration/configuration-tab/overview/${version.id}`]);
        });
    }
}
