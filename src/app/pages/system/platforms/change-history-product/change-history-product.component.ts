import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {Version} from "../../../../model/po/version";
import {VersionType} from "../../../../model/enums/version-type";
import * as moment from "moment";
import {ProductInfo} from "../../../../model/po/productInfo";

@Component({
    selector: 'app-change-history-product',
    templateUrl: './change-history-product.component.html',
    styleUrls: ['./change-history-product.component.less']
})
export class ChangeHistoryProductComponent implements OnInit {
    product: ProductInfo = new ProductInfo();
    versions: Array<Version> = new Array<Version>();

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
                private platformRepository: PlatformRepository) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(res => {
            this.product.id = res['productId'];
        })
        this.init();
    }

    init(): void {
        this.versionList();
    }

    versionList(): void {
        this.platformRepository.versionList(this.product.id).subscribe(res => {
            this.versions = res.data;
        })
    }

    getVersionName(version: Version): string {
        if (version.type == VersionType.Draft.value) return VersionType.Draft.name;
        return `Release ${moment(version.updateTime).format('D MMM YY')}`;
    }

    getVersionTime(version: Version): string {
        if (version.type == VersionType.Draft.value) return `Last updated ${moment(version.updateTime).format('h:mma D MMM YY')}`;
        return `Released ${moment(version.updateTime).format('h:mma D MMM YY')}`;
    }

    editConfig(version: Version): void {
        this.route.navigateByUrl('/', {
            skipLocationChange: true
        }).then(() => {
            this.route.navigate([`/platform/product-tab/overview/${this.product.id}/${version.id}`]);
        });
    }

    viewRelease(version: Version): void {
        this.route.navigateByUrl('/', {
            skipLocationChange: true
        }).then(() => {
            this.route.navigate([`/platform/product-tab/overview/${this.product.id}/${version.id}`]);
        });
    }

}
