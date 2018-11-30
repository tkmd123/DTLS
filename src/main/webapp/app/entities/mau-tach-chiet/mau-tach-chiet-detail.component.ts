import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

@Component({
    selector: 'jhi-mau-tach-chiet-detail',
    templateUrl: './mau-tach-chiet-detail.component.html'
})
export class MauTachChietDetailComponent implements OnInit {
    mauTachChiet: IMauTachChiet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mauTachChiet }) => {
            this.mauTachChiet = mauTachChiet;
        });
    }

    previousState() {
        window.history.back();
    }
}
