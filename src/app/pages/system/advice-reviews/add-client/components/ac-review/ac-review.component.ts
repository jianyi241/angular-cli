import { Component, OnInit } from '@angular/core';
import {Version} from "../../../../../../model/po/version";
import {PropertyInfo} from "../../../../../../model/po/propertyInfo";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {ConfigurationRepository} from "../../../../../../repository/configuration-repository";
import {VersionRepository} from "../../../../../../repository/version-repository";
import {Constants} from "../../../../../../model/constants";
import {TabType} from "../../../../../../model/enums/tab-type";

@Component({
  selector: 'app-ac-review',
  templateUrl: './ac-review.component.html',
  styleUrls: ['./ac-review.component.less']
})
export class AcReviewComponent implements OnInit {

  routerSubscription: any;
  activatedRouteSubscription: any;
  list = [
    {
      name: 'Floyd’s review performed in Q1 2022 ',
      visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0314%252F94ad46dbj00qpy1do0021d200rs00rsg008t008t.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655100950&t=4a0578068394f4b8b17927d8db4a289f',
      fullName: 'Miracle Gouse',
      updateTime: 'Last updated at 3:56PM, 2 Feb 2022',
      status: 1,
    },
    {
      name: 'Floyd’s review performed in Q1 2022 ',
      visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0314%252F94ad46dbj00qpy1do0021d200rs00rsg008t008t.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655100950&t=4a0578068394f4b8b17927d8db4a289f',
      fullName: 'Miracle Gouse',
      updateTime: 'Last updated at 3:56PM, 2 Feb 2022',
      status: 2,
    },
    {
      name: 'Floyd’s review performed in Q1 2022 ',
      visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0314%252F94ad46dbj00qpy1do0021d200rs00rsg008t008t.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655100950&t=4a0578068394f4b8b17927d8db4a289f',
      fullName: 'Miracle Gouse',
      updateTime: 'Last updated at 3:56PM, 2 Feb 2022',
      status: 3,
    },
    {
      name: 'Floyd’s review performed in Q1 2022 ',
      visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0314%252F94ad46dbj00qpy1do0021d200rs00rsg008t008t.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655100950&t=4a0578068394f4b8b17927d8db4a289f',
      fullName: 'Miracle Gouse',
      updateTime: 'Last updated at 3:56PM, 2 Feb 2022',
      status: 4,
    }
  ]

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private toastRepository: ToastRepository) {
  }

  ngOnInit(): void {
    this.subscribe();
    this.init();
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
    this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
  }

  subscribe(): void {
    this.routerSubscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  init(): void {
    this.getReviewList();
  }

  getReviewList(): void {

  }
}
