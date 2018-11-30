import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';
import { QuanHeThanNhanService } from './quan-he-than-nhan.service';

@Component({
    selector: 'jhi-quan-he-than-nhan-delete-dialog',
    templateUrl: './quan-he-than-nhan-delete-dialog.component.html'
})
export class QuanHeThanNhanDeleteDialogComponent {
    quanHeThanNhan: IQuanHeThanNhan;

    constructor(
        private quanHeThanNhanService: QuanHeThanNhanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quanHeThanNhanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'quanHeThanNhanListModification',
                content: 'Deleted an quanHeThanNhan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quan-he-than-nhan-delete-popup',
    template: ''
})
export class QuanHeThanNhanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quanHeThanNhan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QuanHeThanNhanDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.quanHeThanNhan = quanHeThanNhan;
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
