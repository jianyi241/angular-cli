import {Component, OnInit} from '@angular/core';
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../../service/config.service";
import {CurrentUserService} from "../../../../../../service/current-user.service";
import {Constants} from "../../../../../../model/constants";
import {TabType} from "../../../../../../model/enums/tab-type";
import {DueRepository} from "../../../../../../repository/due-repository";
import {DueCondition} from "../../../../../../model/condition/due-condition";

@Component({
    selector: 'app-kanban-board',
    templateUrl: './kanban-board.component.html',
    styleUrls: ['./kanban-board.component.less']
})
export class KanbanBoardComponent implements OnInit {
    condition: DueCondition = new DueCondition(1, 10);
    dueBoard: any;
    constructor(private router: Router,
                private dueRepository: DueRepository,
                public configService: ConfigService,
                public currentUserService: CurrentUserService) {
    }

    ngOnInit(): void {
        this.dueRepository.getBoard(this.condition).subscribe(res => {
            this.dueBoard = res.data;
            console.log(this.dueBoard);
        })
    }


    toView(product: ProductInfo): void {
        this.router.navigateByUrl(`/platform/product-box-detail/overview/${product.id}/${product.versionId || Constants.VERSION}/${TabType.overview.value}`)
    }

}
