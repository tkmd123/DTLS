import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';

@Component({
    selector: 'jhi-loai-mau-xet-nghiem-detail',
    templateUrl: './loai-mau-xet-nghiem-detail.component.html'
})
export class LoaiMauXetNghiemDetailComponent implements OnInit {
    loaiMauXetNghiem: ILoaiMauXetNghiem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiMauXetNghiem }) => {
            this.loaiMauXetNghiem = loaiMauXetNghiem;
        });
    }

    previousState() {
        window.history.back();
    }
}
