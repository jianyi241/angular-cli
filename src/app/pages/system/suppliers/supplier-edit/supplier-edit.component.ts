import {Component, OnDestroy, OnInit} from '@angular/core';
import {SupplierService} from "../../../../service/supplier.service";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierInfo} from "../../../../model/po/supplierInfo";
import {Constants} from "../../../../model/constants";
import {ToastRepository} from "../../../../repository/toast-repository";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-supplier-edit',
    templateUrl: './supplier-edit.component.html',
    styleUrls: ['./supplier-edit.component.less']
})
export class SupplierEditComponent implements OnInit, OnDestroy {

    constructor(public supplierService: SupplierService,
                private saveService: SaveService,
                private supplierRepository: SupplierRepository,
                private activatedRoute: ActivatedRoute,
                private toastRepository: ToastRepository,
                private router: Router) {
        this.supplierService.supplier = new SupplierInfo();
    }

    ngOnInit(): void {
        let supplierId = this.activatedRoute?.firstChild?.snapshot?.params['id'];
        if (supplierId && supplierId != Constants.NON_ID) {
            this.supplierService.supplier.id = supplierId;
            this.supplierDetail();
        }
    }

    ngOnDestroy(): void {
        this.supplierService.supplier = null;
    }


    supplierDetail(): void {
        this.supplierRepository.getSupplierDetail(this.supplierService.supplier.id).subscribe(res => {
            Object.assign(this.supplierService.supplier, res.data);
        })
    }

    saveSupplier(): void {
        let supplier = this.supplierService.supplier;
        if (!supplier.attachmentVo) {
            this.toastRepository.showDanger('Company logo is required.');
            return;
        }
        if (!supplier.name) {
            this.toastRepository.showDanger('Company name is required.');
            return;
        }
        if (!supplier.website) {
            this.toastRepository.showDanger('Website is required.');
            return;
        }
        if (this.saveService.saveCheck(environment.baseURL + '/supplier/saveOrUpdateSupplier')) {
            return;
        }
        this.supplierRepository.saveSupplier(this.supplierService.supplier).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.supplierService.supplier = res.data;
            this.toastRepository.showSuccess('Save Successfully.');
        });
    }

    archiveSupplier(): void {
        this.supplierService.supplier.archiveFlag = true;
        this.saveSupplier();
    }
}
