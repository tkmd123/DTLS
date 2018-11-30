import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';
import { PCRPhanUngService } from './pcr-phan-ung.service';

@Component({
    selector: 'jhi-pcr-phan-ung-delete-dialog',
    templateUrl: './pcr-phan-ung-delete-dialog.component.html'
})
export class PCRPhanUngDeleteDialogComponent {
    pCRPhanUng: IPCRPhanUng;

    constructor(private pCRPhanUngService: PCRPhanUngService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pCRPhanUngService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pCRPhanUngListModification',
                content: 'Deleted an pCRPhanUng'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pcr-phan-ung-delete-popup',
    template: ''
})
export class PCRPhanUngDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRPhanUng }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PCRPhanUngDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pCRPhanUng = pCRPhanUng;
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
