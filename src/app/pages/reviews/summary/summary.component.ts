import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {ReviewService} from "../../../service/review.service";
import {arr1ToArr2} from "../../../utils/array";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit {
    reviewSaveObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewLeaveObservable: any;
    idpsArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    superArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    mockPlatformData: Array<any> = []
    section: number = 4
    choiceAnalysis:Array<string> = ["Feature analysis","Business metric analysis","Fee analysis"]
    featuresIncludedReviewList: Array<Array<number>> = [[1,2,3,4,5],[1,2,3],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5],[1,2,3,4,5,6,7],[1,2],[1,2,3,4,5,6],[2,3,4,5,9]]
    modalMockVal: string = `BT is confident that issues dogging its Panorama wealth platform have been resolved, following a snafu where customer distributions in July were delayed and a separate error led to the platform being offline for an entire week.
                        BT is confident that issues dogging its Panorama wealth platform have been resolved, following a snafu where customer distributions in July were delayed and a separate error led to the platform being offline for an entire week.
                        BT is confident that issues dogging its Panorama wealth platform have been resolved,
                        July were delayed and a separate error led to the platform being offline for an entire week.`

    constructor(public reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.getPlatformSelectedList()
        window.addEventListener('resize',(e: UIEvent) => {
            const windowWidth = window.innerWidth
            this.updateViewList(windowWidth)
        })
    }

    getPlatformAnalysis() {
        return `
            Feature spotlight: Manage cash reserves and<br/> automate investing with Cash Settings. Feature<br/> spotlight: Manage cash reserves and automate<br/> investing with Cash Settings
        `
    }

    getPlatformSelectedList() {
        let list = [1,2,3,4,5,6,7]
        let _list = arr1ToArr2(JSON.parse(JSON.stringify(list)), 4)
        _list[_list.length - 1].length = 4
        this.mockPlatformData = _list
        console.log('mockPlatformData ', this.mockPlatformData)
        console.log('flat mockPlatformData ', this.mockPlatformData.flat())
    }

    updateViewList(windowWidth: number) {
        if (windowWidth <= 1540) {
            if (this.section != 3) {
                console.log('column -> 3')
                this.section = 3
                let _list = arr1ToArr2(this.mockPlatformData.flat(), this.section)
                _list[_list.length - 1].length = this.section
                this.mockPlatformData = _list
            }
        } else {
            if (this.section != 4) {
                console.log('column -> 4')
                this.section = 4
                let _list = arr1ToArr2(this.mockPlatformData.flat(), this.section)
                _list[_list.length - 1].length = this.section
                this.mockPlatformData = _list
            }
        }
    }

    ngOnDestroy(): void {
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }


    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
        this.saveSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            // this.router.navigateByUrl(`/due/summary/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
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

    openPopover(pComment: NgbPopover) {
        pComment.open();
        let isOpen = pComment.isOpen();
        console.log('open', isOpen)
    }

    closeComment(pComment: NgbPopover) {
        // if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComment`)) {
        //     return;
        // }
        pComment.close();
    }

}
