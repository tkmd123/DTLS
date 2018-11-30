import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPCRMoi } from 'app/shared/model/pcr-moi.model';
import { PCRMoiService } from './pcr-moi.service';

@Component({
    selector: 'jhi-pcr-moi-delete-dialog',
    templateUrl: './pcr-moi-delete-dialog.component.html'
})
export class PCRMoiDeleteDialogComponent {
    pCRMoi: IPCRMoi;

    constructor(private pCRMoiService: PCRMoiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pCRMoiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pCRMoiListModification',
                content: 'Deleted an pCRMoi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pcr-moi-delete-popup',
    template: ''
})
export class PCRMoiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRMoi }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PCRMoiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pCRMoi = pCRMoi;
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
