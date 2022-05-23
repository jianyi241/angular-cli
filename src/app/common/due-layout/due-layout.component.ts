import {Component, OnInit, ViewChild} from '@angular/core';
import {DueHeaderComponent} from "../due-header/due-header.component";

@Component({
    selector: 'app-due-layout',
    templateUrl: './due-layout.component.html',
    styleUrls: ['./due-layout.component.less']
})
export class DueLayoutComponent implements OnInit {
    @ViewChild(DueHeaderComponent)
    public viewHead: DueHeaderComponent;

    constructor() {
    }

    ngOnInit(): void {
    }
}
