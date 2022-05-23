import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../../../model/vo/page";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddClientModalComponent} from "../../../modal/add-client-modal/add-client-modal.component";
import {DueRepository} from "../../../../../../repository/due-repository";
import {DueListVo} from "../../../../../../model/vo/dueListVo";
import {DueCondition} from "../../../../../../model/condition/due-condition";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {DueService} from "../../../../../../service/due.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-review-table',
    templateUrl: './review-table.component.html',
    styleUrls: ['./review-table.component.less']
})
export class ReviewTableComponent implements OnInit {

    duePage: Page<DueListVo> = new Page<DueListVo>();
    condition: DueCondition = new DueCondition(1, 10);
    currentSwitch: string = 'review'
    searchSub: Subscription;
    archivedSub: Subscription;

    constructor(private router: Router,
                private dueRepository: DueRepository,
                private toastRepository: ToastRepository,
                public configService: ConfigService,
                private dueService: DueService,
                private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
        this.init();
        this.searchSub = this.dueService.reviewObservable(data => {
            this.condition.keyword = data;
            this.getDuePage();
        });

        this.archivedSub = this.dueService.archivedObservable(data => {
            this.condition.archived = data ? null : data;
            this.getDuePage();
        })
    }

    ngOnDestroy(): void {
        this.searchSub && this.searchSub.unsubscribe();
        this.archivedSub && this.archivedSub.unsubscribe();
    }

    init(): void {
        this.getDuePage();
    }

    getDuePage(): void {
        this.dueRepository.getPage(this.condition).subscribe(res => {
            Object.assign(this.duePage, res.data);
        });
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
        this.getDuePage();
    }

    showAddClientModal(): void {
        const modal = this.ngbModal.open(AddClientModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        })
        // modal.componentInstance.
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
        })
    }
}
