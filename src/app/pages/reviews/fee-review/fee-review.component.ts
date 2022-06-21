import { Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {PlatformFeeChartsOptions} from "../../../model/vo/chartsVo";

@Component({
  selector: 'app-fee-review',
  templateUrl: './fee-review.component.html',
  styleUrls: ['./fee-review.component.less']
})
export class FeeReviewComponent implements OnInit {
  reviewNextObservable: any;
  reviewBackObservable: any;
  reviewSaveObservable: any;
  reviewLeaveObservable: any;
  text = 'This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,'
  platformCharts: any
  platformChartsData: PlatformFeeChartsOptions = {
    min: 1,
    max: 100,
    seriesData: [[0,0,1],[1,0,2],[2,0,3],[3,0,4],[4,0,5],[5,0,6],[6,0,7],[7,0,8],[8,0,9],[9,0,10],
      [0,1,10],[1,1,9],[2,1,8],[3,1,7],[4,1,6],[5,1,5],[6,1,4],[7,1,3],[8,1,2],[9,1,1],
      [0,2,10],[1,2,9],[2,2,8],[3,2,7],[4,2,6],[5,2,5],[6,2,4],[7,2,3],[8,2,2],[9,2,1],
      [0,3,10],[1,3,9],[2,3,8],[3,3,7],[4,3,6],[5,3,5],[6,3,4],[7,3,3],[8,3,2],[9,3,1],
      [0,4,10],[1,4,9],[2,4,8],[3,4,7],[4,4,6],[5,4,5],[6,4,4],[7,4,3],[8,4,2],[9,4,1]],
    xAxisValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10'],
    yAxisValues: new Array(5).fill({
      name: 'Individual11',
      product: 'BT Panorama',
      logo: 'https://img1.baidu.com/it/u=2427267416,2184425688&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
    })
  }
  totalCastCharts: any
  totalCastData = [
    {
      name: 'Individual',
      product: 'BT Panorama',
      data: [120, 132, 101, 134, 90, 230, 210, 230, 210],
      color: '#7C77E9',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: false
    },
    {
      name: 'Individual1',
      product: 'BT Panorama',
      data: [120,220, 182, 191, 234, 290, 330, 310, 210],
      color: '#17B726',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: true
    },
    {
      name: 'Individual2',
      product: 'BT Panorama',
      data: [11, 22, 33, 44, 55, 66, 77, 99, 111],
      color: '#1890FF',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: true
    },
    {
      name: 'Individual3',
      product: 'Netwealth',
      data: [111, 132, 19, 34, 9, 23, 21, 240, 187],
      color: '#7938C9',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: false
    },
    {
      name: 'Individual4',
      product: 'BT Panorama',
      data: [155, 133, 126, 178, 230, 236, 120, 240, 170],
      color: '#EDA114',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: false
    }
  ]

  constructor(public reviewService: ReviewService,
              public configService: ConfigService,
              private reviewRepository: ReviewRepository,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
    this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
    this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
  }


  subscribe(): void {
    this.saveSubscribe();
    this.nextSubscribe();
    this.backSubscribe();
    this.leaveSubscribe();
  }

  nextSubscribe(): void {
    this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
      // this.router.navigateByUrl(`/review/summary/${this.reviewService.comparison.id}`);
      this.reviewService.nextStep(AnalysisType.fee);
    });
  }

  backSubscribe(): void {
    this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
      // this.reviewService.preStep(AnalysisType.fee);
      this.router.navigateByUrl(`/review/fee-comparison/${this.reviewService.comparison.id}`);
    })
  }

  saveSubscribe(): void {
    this.reviewSaveObservable = this.reviewService.saveObservable.subscribe((callback) => {
      callback && callback();
    })
  }

  leaveSubscribe(): void {
    this.reviewLeaveObservable = this.reviewService.leaveReviewObservable.subscribe(() => {
      this.router.navigateByUrl('/supplier/comparisons-list');
    })
  }

  openCommentPopover(pComment: NgbPopover) {
    pComment.open()
  }

  closeCommentPopover(pComment: NgbPopover) {
    pComment.close()
  }


}
