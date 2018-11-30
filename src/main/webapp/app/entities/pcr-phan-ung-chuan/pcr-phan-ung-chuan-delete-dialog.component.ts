import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';
import { PCRPhanUngChuanService } from './pcr-phan-ung-chuan.service';

@Component({
    selector: 'jhi-pcr-phan-ung-chuan-delete-dialog',
    templateUrl: './pcr-phan-ung-chuan-delete-dialog.component.html'
})
export class PCRPhanUngChuanDeleteDialogComponent {
    pCRPhanUngChuan: IPCRPhanUngChuan;

    constructor(
        private pCRPhanUngChuanService: PCRPhanUngChuanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pCRPhanUngChuanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pCRPhanUngChuanListModification',
                content: 'Deleted an pCRPhanUngChuan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pcr-phan-ung-chuan-delete-popup',
    template: ''
})
export class PCRPhanUngChuanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRPhanUngChuan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PCRPhanUngChuanDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pCRPhanUngChuan = pCRPhanUngChuan;
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
