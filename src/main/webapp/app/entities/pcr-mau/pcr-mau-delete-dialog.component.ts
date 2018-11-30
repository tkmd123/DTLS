import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPCRMau } from 'app/shared/model/pcr-mau.model';
import { PCRMauService } from './pcr-mau.service';

@Component({
    selector: 'jhi-pcr-mau-delete-dialog',
    templateUrl: './pcr-mau-delete-dialog.component.html'
})
export class PCRMauDeleteDialogComponent {
    pCRMau: IPCRMau;

    constructor(private pCRMauService: PCRMauService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pCRMauService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pCRMauListModification',
                content: 'Deleted an pCRMau'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pcr-mau-delete-popup',
    template: ''
})
export class PCRMauDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRMau }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PCRMauDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pCRMau = pCRMau;
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
