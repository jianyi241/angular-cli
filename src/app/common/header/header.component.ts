import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VersionRepository} from "../../repository/version-repository";
import {ConfigService} from "../../service/config.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    constructor(
        private versionRepository: VersionRepository,
        public configService: ConfigService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
    }

    chooseType(type: string) {
        if (type.includes('/supplier') && !this.router.url.includes('/supplier/supplier-tab')) {
            this.router.navigateByUrl('/supplier/supplier-tab');
        } else if (type.includes('/platform')) {
            this.router.navigateByUrl('/platform/product');
        }
    }
}
