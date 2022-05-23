import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../../../model/vo/page";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ClientRepository} from "../../../../../../repository/client-repository";
import {ClientCondition} from "../../../../../../model/condition/client-condition";
import {ClientListVo} from "../../../../../../model/vo/clientListVo";
import {DueService} from "../../../../../../service/due.service";
import {Subscription} from "rxjs";
import {ToastRepository} from "../../../../../../repository/toast-repository";

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
                private toastRepository: ToastRepository,
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
        this.router.navigateByUrl(`/advice-review/add-client/overview/${id}`)
        // this.showAddClientModal()
    }

    pageChange(current: number) {
        this.condition.current = current
        this.getPage();
    }

    unarchive(client: ClientListVo) {
        client.archived = false;
        this.save(client);
    }

    archive(client: ClientListVo) {
        client.archived = true
        this.save(client);
    }

    save(client: ClientListVo) {
        this.clientRepository.save(client).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
        })
    }
}
