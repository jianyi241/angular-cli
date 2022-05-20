import { Component, OnInit } from '@angular/core';
import {Page} from "../../../../../../model/vo/page";
import {Condition} from "../../../../../../model/condition";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminRepository} from "../../../../../../repository/admin-repository";
import {ConfigService} from "../../../../../../service/config.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddClientModalComponent} from "../../../modal/add-client-modal/add-client-modal.component";

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.less']
})
export class ClientTableComponent implements OnInit {


  routerSubscription: any;
  activatedRouteSubscription: any;
  adminPage: Page<any> = new Page<any>();
  condition: Condition = new Condition(1,10)
  currentSwitch: string = 'review'
  constructor(private router: Router,
              private adminRepository: AdminRepository,
              public configService: ConfigService,
              private ngbModal: NgbModal,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
    this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
  }

  init(): void {
    this.activatedRoute.params.subscribe(res => {
      console.log('res ', res)
      this.currentSwitch = res.type
    })
    this.getSuppliesList()
  }

  switchTable(val: string): void {
    this.currentSwitch = val
  }
  getSuppliesList(): void {
    this.adminRepository.getAdminInfoList(this.condition).subscribe(res => {
      this.adminPage = res.data
    },err => {})
  }

  sortList(column: string, sortType: number): void {

  }

  addFunc(): void {
    if (this.currentSwitch === 'review') {
      this.toDetail()
    } else {
      this.router.navigateByUrl('/advice-review/add-client/Overview')
    }
  }

  toDetail(): void {
    // this.router.navigateByUrl(`/admin/detail/${type}/${id || Constants.NON_ID}`)
    this.showAddClientModal()
  }

  pageChange(current: number) {
    this.condition.current = current
    this.getSuppliesList()
  }

  showAddClientModal() :void{
    const modal = this.ngbModal.open(AddClientModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    })
    // modal.componentInstance.
  }
}