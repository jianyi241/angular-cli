import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {AdminRepository} from "../../../../repository/admin-repository";
import {Router} from "@angular/router";
import {Page} from "../../../../model/vo/page";
import {Condition} from "../../../../model/condition";
import {Constants} from "../../../../model/constants";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.less']
})
export class AdminListComponent implements OnInit, OnDestroy {
  routerSubscription: any;
  activatedRouteSubscription: any;
  adminPage: Page<any> = new Page<any>();
  condition: Condition = new Condition(1,10)
  constructor(private router: Router,
              private adminRepository: AdminRepository,
              public configService: ConfigService) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
    this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
  }

  init(): void {
    this.getSuppliesList()
  }

  getSuppliesList(): void {
    this.adminRepository.getAdminInfoList(this.condition).subscribe(res => {
      console.log('get admin list ===> ', res)
      this.adminPage = res.data
    },err => {})
  }

  sortList(column: string, sortType: number): void {
    // sortType 0.normal 1.asc 2.desc
    console.log('sort list...', column, '------ ', sortType)
    let newList: Array<any> = []
    if (sortType === 1) {
      newList = this.adminPage.records.sort((a,b) => {
        const prev = a[column]
        const next = b[column]
        if (Number(prev)) {
          return prev - next
        } else {
          return prev.toString().length  - next.toString().length
        }
      })
    } else if (sortType === 2) {
      newList = this.adminPage.records.sort((a,b) => {
        const prev = a[column]
        const next = b[column]
        if (Number(prev)) {
          return next - prev
        } else {
          return next.toString().length - prev.toString().length
        }
      })
    } else {
      this.getSuppliesList()
      return
    }
    this.adminPage.records = newList
    console.log('admin records new ===> ', this.adminPage.records)
  }

  toDetail(type, id): void {
    console.log('current row id ===> ', id)
    this.router.navigateByUrl(`/admin/detail/${type}/${id || Constants.NON_ID}`)
  }

  pageChange(current: number) {
    this.condition.current = current
    this.getSuppliesList()
    console.log('current ===> ', current)
  }

}


