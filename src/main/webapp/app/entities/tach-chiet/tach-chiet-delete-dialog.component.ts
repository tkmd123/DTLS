import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITachChiet } from 'app/shared/model/tach-chiet.model';
import { TachChietService } from './tach-chiet.service';

@Component({
    selector: 'jhi-tach-chiet-delete-dialog',
    templateUrl: './tach-chiet-delete-dialog.component.html'
})
export class TachChietDeleteDialogComponent {
    tachChiet: ITachChiet;

    constructor(private tachChietService: TachChietService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tachChietService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tachChietListModification',
                content: 'Deleted an tachChiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tach-chiet-delete-popup',
    template: ''
})
export class TachChietDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tachChiet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TachChietDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tachChiet = tachChiet;
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
