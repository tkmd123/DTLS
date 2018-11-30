import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoaiDiVat } from 'app/shared/model/loai-di-vat.model';
import { LoaiDiVatService } from './loai-di-vat.service';

@Component({
    selector: 'jhi-loai-di-vat-delete-dialog',
    templateUrl: './loai-di-vat-delete-dialog.component.html'
})
export class LoaiDiVatDeleteDialogComponent {
    loaiDiVat: ILoaiDiVat;

    constructor(private loaiDiVatService: LoaiDiVatService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loaiDiVatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loaiDiVatListModification',
                content: 'Deleted an loaiDiVat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loai-di-vat-delete-popup',
    template: ''
})
export class LoaiDiVatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiDiVat }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LoaiDiVatDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.loaiDiVat = loaiDiVat;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
