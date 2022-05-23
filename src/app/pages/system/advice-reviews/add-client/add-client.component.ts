import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveService} from "../../../../service/save.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../../../../service/current-user.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PracticeService} from "../../../../service/practice.service";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {PracticeInfo} from "../../../../model/po/practiceInfo";
import {AcOverviewComponent} from "./components/ac-overview/ac-overview.component";
import {Constants} from "../../../../model/constants";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.less']
})
export class AddClientComponent implements OnInit {
  currentTab = 'Overview'
  editType: string
  clientId: string
  tabs = [
    {
      name: 'Overview',
      path: '/advice-review/add-client/Overview'
    }
  ]

  constructor(private modalService: NgbModal,
              private saveService: SaveService,
              private activatedRoute: ActivatedRoute,
              public currentUserService: CurrentUserService,
              private toastRepository: ToastRepository,
              public practiceService: PracticeService,
              private router: Router,
              private adviceRepository: AdviceRepository) {
    this.practiceService.practice = new PracticeInfo();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      console.log('params ', res)
      this.currentTab = res.tabName
      this.clientId = res.id
      if (this.clientId === Constants.NON_ID) {
        this.editType = 'add'
      } else {
        this.editType = 'update'
        this.tabs.push({
          name: 'Reviews',
          path: '/advice-review/add-client/Reviews'
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.practiceService.practice = null;
  }

  @ViewChild('clientOverview')clientOverview: AcOverviewComponent
  save(): void {
    console.log('get client object')
    this.clientOverview.save()
  }

  updateStatus(status: string) {
    this.clientOverview.updateStatus(status);
  }

  backPage(): void {
    this.router.navigateByUrl('/advice-review/review-list/client')
  }
}
