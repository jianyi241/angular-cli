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
import {ConfigService} from "../../../../service/config.service";
import {SupplierStatus} from "../../../../model/enums/supplier-status";

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
                private router: Router,
                public configService: ConfigService) {
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
                this.supplierService.refreshTeam()
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

    onDisable(): void {
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        const isDisabled = this.supplierService.supplier.status === this.configService.supplierStatus.disable
        modalRef.componentInstance.title = `${isDisabled ? 'Enable' : 'Disable'} the supplier?`
        modalRef.componentInstance.info = `${isDisabled ? 'Enabling' : 'Disabling'} a supplier will freeze it from being changed.Are you sure to ${isDisabled ? 'enable' : 'disable'} this supplier?`;
        modalRef.componentInstance.btnText = `Yes, ${isDisabled ? 'enable' : 'disable'} it`
        const msg = `${this.supplierService.supplier.name} has been ${isDisabled ? 'enabled' : 'disabled'}`
        modalRef.result.then((result) => {
            if (isDisabled) {
                this.supplierService.supplier.status = SupplierStatus.Active.value;
            } else {
                this.supplierService.supplier.status = SupplierStatus.Disable.value;
            }
            this.saveSupplier(false, msg);;
        }, (reason) => {
        });
    }

    archiveSupplier(): void {
        const modalRef = this.modalService.open(TipModalComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = `${this.supplierService.supplier.archiveFlag ? 'Unarchive' : 'Archive'} the supplier?`
        modalRef.componentInstance.info = `${this.supplierService.supplier.archiveFlag ? 'Unarchiving' : 'Archive'} a supplier will ${this.supplierService.supplier.archiveFlag ? 'bring back' : 'remove'} the access of this supplier from all users. ${this.supplierService.supplier.archiveFlag ? '' : 'Only the admin can access archived supplier.'}
            Are you sure to ${this.supplierService.supplier.archiveFlag ? 'unarchive' : 'archive'} this supplier?`;
        modalRef.componentInstance.btnText = `Yes, ${this.supplierService.supplier.archiveFlag ? 'unarchive' : 'archive'} it`
        const msg = `${this.supplierService.supplier.name} has been ${this.supplierService.supplier.archiveFlag ? 'unarchived' : 'archived'}`
        modalRef.result.then((result) => {
            this.supplierService.supplier.archiveFlag = !this.supplierService.supplier.archiveFlag;
            this.saveSupplier(false, msg);
        }, (reason) => {
        });
    }
}
