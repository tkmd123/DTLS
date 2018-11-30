import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITachChiet } from 'app/shared/model/tach-chiet.model';

@Component({
    selector: 'jhi-tach-chiet-detail',
    templateUrl: './tach-chiet-detail.component.html'
})
export class TachChietDetailComponent implements OnInit {
    tachChiet: ITachChiet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tachChiet }) => {
            this.tachChiet = tachChiet;
        });
    }

    previousState() {
        window.history.back();
    }
}
