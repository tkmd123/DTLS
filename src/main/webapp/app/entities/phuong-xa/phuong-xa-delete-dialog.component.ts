import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhuongXa } from 'app/shared/model/phuong-xa.model';
import { PhuongXaService } from './phuong-xa.service';

@Component({
    selector: 'jhi-phuong-xa-delete-dialog',
    templateUrl: './phuong-xa-delete-dialog.component.html'
})
export class PhuongXaDeleteDialogComponent {
    phuongXa: IPhuongXa;

    constructor(private phuongXaService: PhuongXaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.phuongXaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'phuongXaListModification',
                content: 'Deleted an phuongXa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-phuong-xa-delete-popup',
    template: ''
})
export class PhuongXaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ phuongXa }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PhuongXaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.phuongXa = phuongXa;
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
