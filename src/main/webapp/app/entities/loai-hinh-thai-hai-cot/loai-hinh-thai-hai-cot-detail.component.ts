import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

@Component({
    selector: 'jhi-loai-hinh-thai-hai-cot-detail',
    templateUrl: './loai-hinh-thai-hai-cot-detail.component.html'
})
export class LoaiHinhThaiHaiCotDetailComponent implements OnInit {
    loaiHinhThaiHaiCot: ILoaiHinhThaiHaiCot;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiHinhThaiHaiCot }) => {
            this.loaiHinhThaiHaiCot = loaiHinhThaiHaiCot;
        });
    }

    previousState() {
        window.history.back();
    }
}
