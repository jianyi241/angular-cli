import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {PlatformFeeChartsComponent} from "../components/charts/platform-fee-charts/platform-fee-charts.component";
import {TotalCostChartsComponent} from "../components/charts/total-cost-charts/total-cost-charts.component";
import {ToastRepository} from "../../../repository/toast-repository";
import {FeeReviewChart} from "../../../model/po/feeReviewChart";
import {CompareMetricVo} from "../../../model/vo/compareMetircVo";
import {ComparisonProductVo} from "../../../model/vo/comparisonProductVo";
import {ComparisonProductInfo} from "../../../model/po/comparisonProductInfo";
import {environment} from "../../../../environments/environment";
import {SaveService} from "../../../service/save.service";
import {ComparisonCommentInfo} from "../../../model/po/comparisonCommentInfo";

@Component({
  selector: 'app-fee-review',
  templateUrl: './fee-review.component.html',
  styleUrls: ['./fee-review.component.less']
})
export class FeeReviewComponent implements OnInit,AfterViewInit {
  reviewNextObservable: any;
  reviewBackObservable: any;
  reviewSaveObservable: any;
  reviewLeaveObservable: any;
  comparisonId: string
  hideHaveWarning: boolean = false
  feeReviewData: FeeReviewChart
  // 右侧列表
  compareData: CompareMetricVo = new CompareMetricVo();

  constructor(public reviewService: ReviewService,
              public configService: ConfigService,
              private reviewRepository: ReviewRepository,
              private activatedRoute: ActivatedRoute,
              private toastRepository: ToastRepository,
              private saveService: SaveService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscribe();
  }

  @ViewChild('platformFeeChartsComponent')
  platformFeeChartsComponent: PlatformFeeChartsComponent

  @ViewChild('totalCostChartsComponent')
  totalCostChartsComponent: TotalCostChartsComponent

  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(res => {
      this.comparisonId = res.id
      this.getMetricComparison()
      this.getFeeReviewChartsData()
    })
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

  getMetricComparison(): void {
    if (!this.comparisonId) return
    this.reviewRepository.getMetricComparison(this.comparisonId).subscribe(res => {
      this.compareData = res.data
    });
  }

  getFeeReviewChartsData(): void {
    this.reviewRepository.queryFeeReviewCharts(this.comparisonId).subscribe(res => {
      if (res.statusCode !== 200) {
        this.toastRepository.showDanger(res.msg || 'get data failed.')
        return
      }
      if (res.data) {
        this.feeReviewData = res.data
        this.platformFeeChartsComponent.setChartsData(this.feeReviewData)
        this.totalCostChartsComponent.setChartsData(this.feeReviewData)
      }
    })
  }

  saveComment(product: ComparisonProductVo, pComment: NgbPopover) {
    if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComment`)) {
      return;
    }
    product.comparisonComment.shComparisonId = this.reviewService.comparison.id;
    let analyseInfo = this.reviewService.comparison.analyseVoList.find(a => a.name == AnalysisType.metric.value);
    product.comparisonComment.shAnalyseId = analyseInfo.shAnalyseId;
    product.comparisonComment.shProductId = product.shProductId;
    this.reviewRepository.saveComment(product.comparisonComment).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg);
        return;
      }
      pComment.close();
    })
  }

  changeHideHaveWarning(hideWarn: boolean) {
    this.hideHaveWarning = hideWarn
    this.platformFeeChartsComponent.setChartsData(this.feeReviewData, this.hideHaveWarning)
    this.totalCostChartsComponent.setChartsData(this.feeReviewData, this.hideHaveWarning)
  }

  isMainProduct(product: ComparisonProductVo): boolean {
    return this.reviewService.comparison.mainPlatformId == product.shProductId;
  }

  removePlatform(product: ComparisonProductVo) {
    product.showFlag = false;
    this.changeProduct(product, (data) => {
      product.id = data.id;
    }, () => {
      product.showFlag = true;
    });
  }

  resetPlatform(product: ComparisonProductVo) {
    product.showFlag = true;
    this.changeProduct(product, (data) => {
      product.id = data.id;
    }, () => {
      product.showFlag = false;
    });
  }

  changeProduct(product: ComparisonProductVo, callback?: (data: ComparisonProductInfo) => void, error?: () => void) {
    product.shComparisonId = this.reviewService.comparison.id;
    this.reviewRepository.changeProduct(product).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg);
        error && error();
        return;
      }
      callback && callback(res.data);
    })
  }

  removeOrResetForm(product: ComparisonProductVo) {
    if (product.showFlag) {
      this.removePlatform(product)
    } else {
      this.resetPlatform(product)
    }
  }

  getComment(product: ComparisonProductVo, pPlatform: NgbPopover) {
    let analyseInfo = this.reviewService.comparison.analyseVoList.find(a => a.name == AnalysisType.metric.value);
    product.comparisonComment = new ComparisonCommentInfo();
    this.reviewRepository.getComment(this.reviewService.comparison.id, analyseInfo.shAnalyseId, product.shProductId).subscribe(res => {
      Object.assign(product.comparisonComment, res.data);
      pPlatform.open();
    })
  }
}
