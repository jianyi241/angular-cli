import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../../../model/vo/page";
import {Condition} from "../../../../../../model/condition";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddClientModalComponent} from "../../../modal/add-client-modal/add-client-modal.component";
import {ClientRepository} from "../../../../../../repository/client-repository";
import {ClientCondition} from "../../../../../../model/condition/client-condition";
import {ClientListVo} from "../../../../../../model/vo/clientListVo";
import {DueService} from "../../../../../../service/due.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-client-table',
    templateUrl: './client-table.component.html',
    styleUrls: ['./client-table.component.less']
})
export class ClientTableComponent implements OnInit {

    condition: ClientCondition = new ClientCondition(1, 10)
    clientPage: Page<ClientListVo> = new Page<ClientListVo>();
    searchSub: Subscription;
    archivedSub: Subscription;

    constructor(private router: Router,
                private clientRepository: ClientRepository,
                public configService: ConfigService,
                public dueService: DueService,
                private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
        this.init();
        this.searchSub = this.dueService.clientObservable(data => {
            this.condition.keyword = data;
            this.getPage();
        });
        this.archivedSub = this.dueService.archivedObservable(data => {
            this.condition.archived = data ? null : data;
            this.getPage();
        })
    }

    ngOnDestroy(): void {
        this.searchSub && this.searchSub.unsubscribe();
        this.archivedSub && this.archivedSub.unsubscribe();
    }

    init(): void {
        this.getPage();
    }

    getPage(): void {
        this.clientRepository.getPage(this.condition).subscribe(res => {
            Object.assign(this.clientPage, res.data);
        });
    }

    toDetail(id: string): void {
        this.router.navigateByUrl(`/advice-review/add-client/Overview/${id}`)
        // this.showAddClientModal()
    }

    pageChange(current: number) {
        this.condition.current = current
        this.getPage();
    }

    showAddClientModal(): void {
        const modal = this.ngbModal.open(AddClientModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        })
    }
}
