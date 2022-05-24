import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {ClientRepository} from "../../../../../../repository/client-repository";
import {DueListVo} from "../../../../../../model/vo/dueListVo";

@Component({
    selector: 'app-ac-review',
    templateUrl: './ac-review.component.html',
    styleUrls: ['./ac-review.component.less']
})
export class AcReviewComponent implements OnInit {

    @Input() clientId?: string

    reviewsList: Array<DueListVo> = new Array<DueListVo>();

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private clientRepository: ClientRepository) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.getReviewList();
    }

    getReviewList(): void {
        this.clientRepository.getClientReviews(this.clientId).subscribe(res => {
            this.reviewsList = res.data
        })
    }

    //
    getStatusCls(statusName: string): string {
        if (statusName === 'In progress') {
            return 'status-blue'
        } else if (statusName === 'Approved') {
            return 'status-green'
        } else if (statusName === 'Pending approval') {
            return 'status-yellow'
        } else if (statusName === 'Archived') {
            return 'status-red'
        }
        return ''
    }

    editReview(review: DueListVo) {
        this.route.navigateByUrl(`/due/due-setup/${review.id}`)
    }
}
