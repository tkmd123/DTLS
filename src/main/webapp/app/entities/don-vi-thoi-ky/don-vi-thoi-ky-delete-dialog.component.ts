import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';
import { DonViThoiKyService } from './don-vi-thoi-ky.service';

@Component({
    selector: 'jhi-don-vi-thoi-ky-delete-dialog',
    templateUrl: './don-vi-thoi-ky-delete-dialog.component.html'
})
export class DonViThoiKyDeleteDialogComponent {
    donViThoiKy: IDonViThoiKy;

    constructor(
        private donViThoiKyService: DonViThoiKyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.donViThoiKyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'donViThoiKyListModification',
                content: 'Deleted an donViThoiKy'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-don-vi-thoi-ky-delete-popup',
    template: ''
})
export class DonViThoiKyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ donViThoiKy }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DonViThoiKyDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.donViThoiKy = donViThoiKy;
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
