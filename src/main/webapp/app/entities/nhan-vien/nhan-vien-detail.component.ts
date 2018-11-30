import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INhanVien } from 'app/shared/model/nhan-vien.model';

@Component({
    selector: 'jhi-nhan-vien-detail',
    templateUrl: './nhan-vien-detail.component.html'
})
export class NhanVienDetailComponent implements OnInit {
    nhanVien: INhanVien;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nhanVien }) => {
            this.nhanVien = nhanVien;
        });
    }

    previousState() {
        window.history.back();
    }
}
