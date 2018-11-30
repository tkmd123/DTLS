import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoaiDiVat } from 'app/shared/model/loai-di-vat.model';

@Component({
    selector: 'jhi-loai-di-vat-detail',
    templateUrl: './loai-di-vat-detail.component.html'
})
export class LoaiDiVatDetailComponent implements OnInit {
    loaiDiVat: ILoaiDiVat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiDiVat }) => {
            this.loaiDiVat = loaiDiVat;
        });
    }

    previousState() {
        window.history.back();
    }
}
