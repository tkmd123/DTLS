import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';
import { PCRKetQuaService } from './pcr-ket-qua.service';

@Component({
    selector: 'jhi-pcr-ket-qua-delete-dialog',
    templateUrl: './pcr-ket-qua-delete-dialog.component.html'
})
export class PCRKetQuaDeleteDialogComponent {
    pCRKetQua: IPCRKetQua;

    constructor(private pCRKetQuaService: PCRKetQuaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pCRKetQuaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pCRKetQuaListModification',
                content: 'Deleted an pCRKetQua'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pcr-ket-qua-delete-popup',
    template: ''
})
export class PCRKetQuaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRKetQua }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PCRKetQuaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pCRKetQua = pCRKetQua;
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
