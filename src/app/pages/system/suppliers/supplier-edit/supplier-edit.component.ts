import {Component, OnDestroy, OnInit} from '@angular/core';
import {SupplierService} from "../../../../service/supplier.service";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierInfo} from "../../../../model/po/supplierInfo";
import {Constants} from "../../../../model/constants";
import {ToastRepository} from "../../../../repository/toast-repository";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {TipModalComponent} from "../../advice-practices/tip-modal/tip-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CurrentUserService} from "../../../../service/current-user.service";

@Component({
    selector: 'app-supplier-edit',
    templateUrl: './supplier-edit.component.html',
    styleUrls: ['./supplier-edit.component.less']
})
export class SupplierEditComponent implements OnInit, OnDestroy {

    constructor(public supplierService: SupplierService,
                private modalService: NgbModal,
                private saveService: SaveService,
                public currentUserService: CurrentUserService,
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


    goBack(): void {
        if (this.currentUserService.isAdminUser()) {
            this.router.navigateByUrl('/supplier/supplier-list');
        }
    }


    supplierDetail(): void {
        this.supplierRepository.getSupplierDetail(this.supplierService.supplier.id).subscribe(res => {
            Object.assign(this.supplierService.supplier, res.data);
        })
    }

    saveSupplier(tip: boolean = true, msg?: string): void {
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
            if (tip) {
                this.toastRepository.showSuccess(msg || 'Save Successfully.')
            } else {
                //Disable, Archive
                this.toastRepository.showDanger(msg);
            }
            if (!this.supplierService.supplier.id) {
                this.supplierService.supplier = res.data;
                this.router.navigateByUrl('/supplier/supplier-edit/overview/' + res.data.id);
                return;
            }
            this.supplierService.supplier = res.data;

        });
    }

    archiveSupplier(): void {
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Archive the supplier?';
        modalRef.componentInstance.info = 'Archiving a supplier will remove the access of this supplier from all users. Only the admin can access archived supplier. \n' +
            'Are you sure to archive this supplier?';
        modalRef.componentInstance.btnText = 'Yes, archive it';
        modalRef.result.then((result) => {
            this.supplierService.supplier.archiveFlag = true;
            this.saveSupplier(false, `${this.supplierService.supplier.name} has been archived`);
        }, (reason) => {
        });
    }

    /*onDisable(): void {
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Disable the practice?';
        modalRef.componentInstance.info = 'Disabling a practice will freeze it from being changed.Are you sure to disable this practice?';
        modalRef.componentInstance.btnText = 'Yes, disable it';
        modalRef.result.then((result) => {
            this.practiceService.practice.status = PracticeStatus.Disable.value;
            this.save(false, `${this.practiceService.practice.name} has been disabled`);
        }, (reason) => {
        });
    }*/

}
