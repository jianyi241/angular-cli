import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {AdminRepository} from "../../../../repository/admin-repository";
import {Router} from "@angular/router";
import {Page} from "../../../../model/vo/page";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.less']
})
export class AdminListComponent implements OnInit, OnDestroy {
  routerSubscription: any;
  activatedRouteSubscription: any;
  adminPage: Page<any> = new Page<any>();

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
    // let arr: Array<any> = new Array<any>()
    // for(let i = 0; i < 8;i++) {
    //   arr.push({
    //     id: i,
    //     imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653543307&t=830821723bce41cea3a0802ce3bf212d',
    //     firstName: 'name',
    //     lastName: i,
    //     accountType: i % 2 === 0 ? 'Super administrator' : 'Administrator',
    //     status:  i % 2 === 0 ? 'Active' : 'Disable'
    //   })
    // }
    // this.adminPage.pages = 100
    // this.adminPage.current = 1
    // this.adminPage.size = 10
    // this.adminPage.total = 1000
    // this.adminPage.records = arr
    this.adminRepository.getAdminInfoList(null).subscribe(res => {
      console.log('get admin list ===> ', res)
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
    this.router.navigateByUrl('/admin-manage/detail/'+type+'/'+id)
  }

  pageChange(current: number) {
    console.log('current ===> ', current)
  }

}


