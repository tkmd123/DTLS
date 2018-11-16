import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICapBac } from 'app/shared/model/cap-bac.model';
import { CapBacService } from './cap-bac.service';

@Component({
    selector: 'jhi-cap-bac-delete-dialog',
    templateUrl: './cap-bac-delete-dialog.component.html'
})
export class CapBacDeleteDialogComponent {
    capBac: ICapBac;

    constructor(private capBacService: CapBacService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.capBacService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'capBacListModification',
                content: 'Deleted an capBac'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cap-bac-delete-popup',
    template: ''
})
export class CapBacDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ capBac }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CapBacDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.capBac = capBac;
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
