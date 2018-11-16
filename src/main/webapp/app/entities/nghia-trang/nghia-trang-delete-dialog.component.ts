import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INghiaTrang } from 'app/shared/model/nghia-trang.model';
import { NghiaTrangService } from './nghia-trang.service';

@Component({
    selector: 'jhi-nghia-trang-delete-dialog',
    templateUrl: './nghia-trang-delete-dialog.component.html'
})
export class NghiaTrangDeleteDialogComponent {
    nghiaTrang: INghiaTrang;

    constructor(private nghiaTrangService: NghiaTrangService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nghiaTrangService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nghiaTrangListModification',
                content: 'Deleted an nghiaTrang'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nghia-trang-delete-popup',
    template: ''
})
export class NghiaTrangDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nghiaTrang }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NghiaTrangDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nghiaTrang = nghiaTrang;
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
