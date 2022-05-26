import {Component, OnInit} from '@angular/core';
import {SupplierCondition} from "../../../../model/condition/supplier-condition";
import {SupplierInfo} from "../../../../model/po/supplierInfo";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {Page} from "../../../../model/vo/page";
import {Router} from "@angular/router";
import {Constants} from "../../../../model/constants";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.less']
})
export class SupplierListComponent implements OnInit {
    condition: SupplierCondition = new SupplierCondition(1, 10);
    supplierPage: Page<SupplierInfo> = new Page<SupplierInfo>();
    page = 4;

    constructor(private supplierRepository: SupplierRepository,
                private router: Router) {
        this.condition.order = {column: 'name', asc: true};
    }

    ngOnInit(): void {
        this.getSupplierList();
    }

    getSupplierList(): void {
        this.supplierRepository.getSupplierList(this.condition).subscribe(res => {
            this.supplierPage = res.data;
        })
    }

    search():void {
        this.condition.current = 1
        this.getSupplierList()
    }

    sortList(column: string,type: number): void {
        if (type === 0) {
            this.condition.order = {column: 'name', asc: true}
        } else {
            this.condition.order = {column, asc: false}
        }
        this.getSupplierList()
    }

    filterArchived() {
        if (this.condition.archived === null) {
             this.condition.archived = false
        } else {
            this.condition.archived = null
        }
        this.condition.current = 1
        this.getSupplierList()
    }

    pageChange(current: number): void {
        this.condition.current = current;
        this.getSupplierList();
    }

    saveSupplier(supplier?: SupplierInfo): void {
        this.router.navigateByUrl(`/supplier/supplier-edit/overview/${supplier?.id || Constants.NON_ID}`)
    }
}

