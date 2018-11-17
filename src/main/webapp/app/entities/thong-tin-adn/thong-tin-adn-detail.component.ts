import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';

@Component({
    selector: 'jhi-thong-tin-adn-detail',
    templateUrl: './thong-tin-adn-detail.component.html'
})
export class ThongTinADNDetailComponent implements OnInit {
    thongTinADN: IThongTinADN;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thongTinADN }) => {
            this.thongTinADN = thongTinADN;
        });
    }

    previousState() {
        window.history.back();
    }
}
