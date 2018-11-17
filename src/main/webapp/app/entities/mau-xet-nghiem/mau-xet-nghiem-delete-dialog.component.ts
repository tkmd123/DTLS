import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';
import { MauXetNghiemService } from './mau-xet-nghiem.service';

@Component({
    selector: 'jhi-mau-xet-nghiem-delete-dialog',
    templateUrl: './mau-xet-nghiem-delete-dialog.component.html'
})
export class MauXetNghiemDeleteDialogComponent {
    mauXetNghiem: IMauXetNghiem;

    constructor(
        private mauXetNghiemService: MauXetNghiemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mauXetNghiemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mauXetNghiemListModification',
                content: 'Deleted an mauXetNghiem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mau-xet-nghiem-delete-popup',
    template: ''
})
export class MauXetNghiemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mauXetNghiem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MauXetNghiemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mauXetNghiem = mauXetNghiem;
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
