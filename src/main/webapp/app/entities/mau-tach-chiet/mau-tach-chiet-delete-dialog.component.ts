import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMauTachChiet } from 'app/shared/model/mau-tach-chiet.model';
import { MauTachChietService } from './mau-tach-chiet.service';

@Component({
    selector: 'jhi-mau-tach-chiet-delete-dialog',
    templateUrl: './mau-tach-chiet-delete-dialog.component.html'
})
export class MauTachChietDeleteDialogComponent {
    mauTachChiet: IMauTachChiet;

    constructor(
        private mauTachChietService: MauTachChietService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mauTachChietService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mauTachChietListModification',
                content: 'Deleted an mauTachChiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mau-tach-chiet-delete-popup',
    template: ''
})
export class MauTachChietDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mauTachChiet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MauTachChietDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mauTachChiet = mauTachChiet;
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
