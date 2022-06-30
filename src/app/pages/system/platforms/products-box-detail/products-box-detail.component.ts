import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../../service/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlatformRepository} from '../../../../repository/platform-repository';
import {TabType} from '../../../../model/enums/tab-type';
import {Constants} from '../../../../model/constants';
import {CurrentUserService} from '../../../../service/current-user.service';
import PlatformOverview from '../../../../model/po/platformOverview';
import {ProductInfo} from '../../../../model/po/productInfo';
import {environment} from "../../../../../environments/environment";
import {SaveService} from '../../../../service/save.service';
import {ToastRepository} from "../../../../repository/toast-repository";

@Component({
    selector: 'app-products-box-detail',
    templateUrl: './products-box-detail.component.html',
    styleUrls: ['./products-box-detail.component.less']
})
export class ProductsBoxDetailComponent implements OnInit {


    productId: string;
    versionId: string;
    product: ProductInfo = new ProductInfo();
    platformOverviewInfo: PlatformOverview = new PlatformOverview();
    tabs = [
        {
            name: 'Overview',
            path: 'platform/product-box-detail/overview',
            type: TabType.overview.value
        },
        {
            name: 'Information',
            path: 'platform/product-box-detail/information',
            type: TabType.information.value
        },
        {
            name: 'ESG',
            path: 'platform/product-box-detail/esg',
            type: TabType.esg.value
        },
        {
            name: 'Features',
            path: 'platform/product-box-detail/features',
            type: TabType.features.value
        },
        {
            name: 'Fees & rates',
            path: 'platform/product-box-detail/fees-rates',
            type: TabType.feesAndRates.value
        },
        {
            name: 'Find BDM',
            path: 'platform/product-box-detail/find-bdm',
            type: 9
        }
    ];

    constructor(public configService: ConfigService,
                public router: Router,
                private activatedRoute: ActivatedRoute,
                private platformRepository: PlatformRepository,
                public currentUserService: CurrentUserService,
                private saveService: SaveService,
                private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.productId = this.activatedRoute.firstChild.snapshot.params['id'];
        this.versionId = this.activatedRoute.firstChild.snapshot.params['version'];
        this.getProduct();
        this.getFreezeData();
    }

    back(): void {
        if (this.currentUserService.isAdminUser()) {
            this.router.navigateByUrl('/platform/product');
        } else if (this.currentUserService.isSupplierUser()) {
            this.router.navigateByUrl('/platform/product-box');
        } else if (this.currentUserService.isAdviceUser()) {
            this.router.navigateByUrl('/platform/product-box');
        }
    }

    toWebSite(website: string): void {
        if (website) {
            if (!website.startsWith('https://') && !website.startsWith('http://')) {
                window.open(`https://${website}`, '_blank');
            } else {
                window.open(website, '_blank');
            }
        } else {
            window.open('', '_blank');
        }

    }

    getFreezeData(): void {
        this.platformRepository.getPlatformFreezeData(this.productId, 1).subscribe(res => {
            this.platformOverviewInfo = res.data;
        }, err => {
        });
    }

    getProduct(): void {
        this.platformRepository.productDetail(this.productId).subscribe(res => {
            this.product = res.data || this.product;
        });
    }

    chooseTab(tab) {
        const {path, name, type} = tab;
        // if (name === 'Fees & rates') {
        //   return
        // }
        this.router.navigateByUrl(`${path}/${this.productId}/${this.versionId}/${type}`);
    }

    editProduct(): void {
        this.router.navigateByUrl(`/platform/product-tab/overview/${this.productId}/${this.versionId || Constants.VERSION}`);
    }

    editProductInfo(): void {
        if (this.saveService.saveCheck(environment.baseURL + `/product/editProduct/${this.product.id}`)) {
            return;
        }
        this.platformRepository.editProduct(this.product.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.router.navigate([`/platform/product-tab/overview/${this.product.id}/${res.data.id}`], {queryParams: {from: 'view'}})
        });
    }

    canEdit(): boolean {
        return this.currentUserService.isAdminUser() || (this.currentUserService.isSupplierUser() && this.currentUserService.currentUser().companyId == this.product.companyId)
    }
}
