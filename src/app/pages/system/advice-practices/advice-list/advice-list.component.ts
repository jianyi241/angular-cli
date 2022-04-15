import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../model/vo/page";
import {PracticeInfo} from "../../../../model/po/practiceInfo";
import {AdviceRepository} from "../../../../repository/advice-repository";
import {Router} from "@angular/router";
import {AdviceCondition} from "../../../../model/condition/advice-condition";
import {Constants} from "../../../../model/constants";
import {ConfigService} from "../../../../service/config.service";

@Component({
    selector: 'app-advice-list',
    templateUrl: './advice-list.component.html',
    styleUrls: ['./advice-list.component.less']
})
export class AdviceListComponent implements OnInit {
    advicePage: Page<PracticeInfo> = new Page<PracticeInfo>();
    condition: AdviceCondition = new AdviceCondition(1, 10);

    constructor(private adviceRepository: AdviceRepository,
                public configService: ConfigService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.getAdvicePage();
    }

    getAdvicePage(): void {
        this.adviceRepository.practiceList(this.condition).subscribe(res => {
            this.advicePage = Object.assign(this.advicePage, res.data);
        })
    }

    pageChange(current: number) {
        this.condition.current = current;
        this.getAdvicePage();
    }

    NameSortChange(e): void {
        console.log(e)
    }

    save(practice?: PracticeInfo): void {
        this.router.navigateByUrl(`/advice-practices/advice-tab/overview/${practice?.id || Constants.NON_ID}`);
    }



}
