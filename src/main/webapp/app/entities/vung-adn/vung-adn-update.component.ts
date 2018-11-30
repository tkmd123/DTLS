import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVungADN } from 'app/shared/model/vung-adn.model';
import { VungADNService } from './vung-adn.service';

@Component({
    selector: 'jhi-vung-adn-update',
    templateUrl: './vung-adn-update.component.html'
})
export class VungADNUpdateComponent implements OnInit {
    vungADN: IVungADN;
    isSaving: boolean;

    constructor(private vungADNService: VungADNService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vungADN }) => {
            this.vungADN = vungADN;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vungADN.id !== undefined) {
            this.subscribeToSaveResponse(this.vungADNService.update(this.vungADN));
        } else {
            this.subscribeToSaveResponse(this.vungADNService.create(this.vungADN));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVungADN>>) {
        result.subscribe((res: HttpResponse<IVungADN>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
