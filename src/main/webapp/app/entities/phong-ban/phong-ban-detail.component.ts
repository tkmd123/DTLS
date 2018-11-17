import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhongBan } from 'app/shared/model/phong-ban.model';

@Component({
    selector: 'jhi-phong-ban-detail',
    templateUrl: './phong-ban-detail.component.html'
})
export class PhongBanDetailComponent implements OnInit {
    phongBan: IPhongBan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ phongBan }) => {
            this.phongBan = phongBan;
        });
    }

    previousState() {
        window.history.back();
    }
}
