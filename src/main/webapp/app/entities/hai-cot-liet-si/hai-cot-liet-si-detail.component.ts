import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';

@Component({
    selector: 'jhi-hai-cot-liet-si-detail',
    templateUrl: './hai-cot-liet-si-detail.component.html'
})
export class HaiCotLietSiDetailComponent implements OnInit {
    haiCotLietSi: IHaiCotLietSi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ haiCotLietSi }) => {
            this.haiCotLietSi = haiCotLietSi;
        });
    }

    previousState() {
        window.history.back();
    }
}
