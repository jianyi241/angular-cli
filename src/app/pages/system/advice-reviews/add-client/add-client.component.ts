import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveService} from "../../../../service/save.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../../../../service/current-user.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PracticeService} from "../../../../service/practice.service";
import {PracticeInfo} from "../../../../model/po/practiceInfo";
import {AcOverviewComponent} from "./components/ac-overview/ac-overview.component";
import {Constants} from "../../../../model/constants";
import {ClientRepository} from "../../../../repository/client-repository";

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.less']
})
export class AddClientComponent implements OnInit, AfterViewInit {
    currentTab = 'overview'
    editType: string
    clientId: string
    clientName: string
    tabs = [
        {
            name: 'Overview',
            path: '/advice-review/add-client/overview'
        }, {
            name: 'Reviews',
            path: '/advice-review/add-client/reviews'
        }
    ]

    constructor(private modalService: NgbModal,
                private saveService: SaveService,
                private activatedRoute: ActivatedRoute,
                public currentUserService: CurrentUserService,
                private toastRepository: ToastRepository,
                public practiceService: PracticeService,
                private clientRepository: ClientRepository,
                private router: Router) {
        this.practiceService.practice = new PracticeInfo();
    }

    @ViewChild('clientOverview') clientOverview: AcOverviewComponent
    ngOnInit(): void {
        this.activatedRoute.params.subscribe(res => {
            console.log('params ', res)
            this.currentTab = res.tab
            this.clientId = res.id
            if (this.clientId === Constants.NON_ID) {
                this.editType = 'add'
                this.tabs = [
                    {
                        name: 'Overview',
                        path: '/advice-review/add-client/overview'
                    }
                ]
            } else {
                this.editType = 'update'
            }
        })
    }

    ngAfterViewInit(): void{
        if (this.editType === 'update') {
            this.getClientName()
        }
    }

    ngOnDestroy(): void {
        this.practiceService.practice = null;
    }

    save(): void {
        console.log('get client object')
        this.clientOverview.save()
    }

    updateStatus(status: string) {
        this.clientOverview.updateStatus(status);
    }

    getClientName(): void {
        this.clientRepository.getDetail(this.clientId).subscribe(res => {
            this.clientName = res.data.firstName + ' ' + res.data.lastName
        })
    }

    backPage(): void {
        this.router.navigateByUrl('/advice-review/review-list/client')
    }

}
