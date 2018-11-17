import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVungADN } from 'app/shared/model/vung-adn.model';

@Component({
    selector: 'jhi-vung-adn-detail',
    templateUrl: './vung-adn-detail.component.html'
})
export class VungADNDetailComponent implements OnInit {
    vungADN: IVungADN;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vungADN }) => {
            this.vungADN = vungADN;
        });
    }

    previousState() {
        window.history.back();
    }
}
