import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';
import { QuanHeThanNhanService } from './quan-he-than-nhan.service';

@Component({
    selector: 'jhi-quan-he-than-nhan-update',
    templateUrl: './quan-he-than-nhan-update.component.html'
})
export class QuanHeThanNhanUpdateComponent implements OnInit {
    quanHeThanNhan: IQuanHeThanNhan;
    isSaving: boolean;

    constructor(private quanHeThanNhanService: QuanHeThanNhanService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quanHeThanNhan }) => {
            this.quanHeThanNhan = quanHeThanNhan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.quanHeThanNhan.id !== undefined) {
            this.subscribeToSaveResponse(this.quanHeThanNhanService.update(this.quanHeThanNhan));
        } else {
            this.subscribeToSaveResponse(this.quanHeThanNhanService.create(this.quanHeThanNhan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQuanHeThanNhan>>) {
        result.subscribe((res: HttpResponse<IQuanHeThanNhan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
