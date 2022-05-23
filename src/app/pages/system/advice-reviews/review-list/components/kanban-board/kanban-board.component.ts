import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {CurrentUserService} from "../../../../../../service/current-user.service";
import {Constants} from "../../../../../../model/constants";
import {TabType} from "../../../../../../model/enums/tab-type";
import {DueRepository} from "../../../../../../repository/due-repository";
import {DueCondition} from "../../../../../../model/condition/due-condition";
import {DueListVo} from "../../../../../../model/vo/dueListVo";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {DueService} from "../../../../../../service/due.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-kanban-board',
    templateUrl: './kanban-board.component.html',
    styleUrls: ['./kanban-board.component.less']
})
export class KanbanBoardComponent implements OnInit, OnDestroy{
    condition: DueCondition = new DueCondition(1, 10);
    dueBoard: any;
    subscription: Subscription;

    constructor(private router: Router,
                private dueRepository: DueRepository,
                private toastRepository: ToastRepository,
                public configService: ConfigService,
                private dueService: DueService,
                public currentUserService: CurrentUserService) {
    }

    ngOnInit(): void {
        this.getBoard();
        this.subscription = this.dueService.reviewObservable(data => {
            this.condition.keyword = data;
            this.getBoard();
        });
    }

    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }




    getBoard() {
        this.dueRepository.getBoard(this.condition).subscribe(res => {
            this.dueBoard = res.data;
            console.log(this.dueBoard);
        })
    }

    toView(product: ProductInfo): void {
        this.router.navigateByUrl(`/platform/product-box-detail/overview/${product.id}/${product.versionId || Constants.VERSION}/${TabType.overview.value}`)
    }

    unarchive(due: DueListVo) {
        due.archived = false;
        this.save(due);
    }

    archive(due: DueListVo) {
        due.archived = true
        this.save(due);
    }

    save(due: DueListVo): void {
        this.dueRepository.save(due).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.getBoard();
        })
    }

}
