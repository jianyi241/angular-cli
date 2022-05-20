import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveService} from "../../../../service/save.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserService} from "../../../../service/current-user.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PracticeService} from "../../../../service/practice.service";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {PracticeInfo} from "../../../../model/po/practiceInfo";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.less']
})
export class AddClientComponent implements OnInit {
  name = 'Overview'
  tabs = [
    {
      name: 'Overview',
      path: '/advice-review/add-client/Overview'
    },
    {
      name: 'Reviews',
      path: '/advice-review/add-client/Reviews'
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
      this.name = res.tabName
    })
  }

  ngOnDestroy(): void {
    this.practiceService.practice = null;
  }

  backPage() {
    this.router.navigateByUrl('/advice-review/review-list/client')
  }
}
