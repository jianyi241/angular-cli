import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VersionRepository} from "../../repository/version-repository";
import {ConfigService} from "../../service/config.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoginTipModalComponent} from "../../pages/auth/login-tip-modal/login-tip-modal.component";
import {CurrentUserService} from "../../service/current-user.service";
import {Constants} from "../../model/constants";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    constructor(
        private versionRepository: VersionRepository,
        public configService: ConfigService,
        public currentUserService: CurrentUserService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        if (this.router.url == '/supplier') {
            this.router.navigateByUrl('/supplier/supplier-tab');
        }
    }

    chooseType(type: string) {
        if (type.includes('/supplier') && !this.router.url.includes('/supplier/supplier-tab')) {
            this.router.navigateByUrl('/supplier/supplier-tab');
        } else if (type.includes('/platform')) {
            this.router.navigateByUrl('/platform/product');
        }
    }

    logOut(): void {
        const modalRef = this.modalService.open(LoginTipModalComponent, {
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Do you want to log out from Sutability Hub?';
        modalRef.componentInstance.info = 'You will always be able to log back in.';
        modalRef.componentInstance.btnText = 'Yes, log me out';
        modalRef.result.then((result) => {
            localStorage.removeItem(Constants.CURRENT_USER);
            localStorage.removeItem(Constants.ACCESS_TOKEN);
            this.currentUserService.authentication = null;
            this.router.navigateByUrl('/login');
        }, (reason) => {
        });
    }
}
