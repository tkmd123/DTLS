import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMayPCR } from 'app/shared/model/may-pcr.model';
import { MayPCRService } from './may-pcr.service';

@Component({
    selector: 'jhi-may-pcr-delete-dialog',
    templateUrl: './may-pcr-delete-dialog.component.html'
})
export class MayPCRDeleteDialogComponent {
    mayPCR: IMayPCR;

    constructor(private mayPCRService: MayPCRService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mayPCRService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mayPCRListModification',
                content: 'Deleted an mayPCR'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-may-pcr-delete-popup',
    template: ''
})
export class MayPCRDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mayPCR }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MayPCRDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mayPCR = mayPCR;
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
