import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';

@Component({
    selector: 'jhi-hinh-thai-hai-cot-detail',
    templateUrl: './hinh-thai-hai-cot-detail.component.html'
})
export class HinhThaiHaiCotDetailComponent implements OnInit {
    hinhThaiHaiCot: IHinhThaiHaiCot;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hinhThaiHaiCot }) => {
            this.hinhThaiHaiCot = hinhThaiHaiCot;
        });
    }

    previousState() {
        window.history.back();
    }
}
