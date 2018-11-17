import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';
import { ThanNhanLietSiService } from './than-nhan-liet-si.service';

@Component({
    selector: 'jhi-than-nhan-liet-si-delete-dialog',
    templateUrl: './than-nhan-liet-si-delete-dialog.component.html'
})
export class ThanNhanLietSiDeleteDialogComponent {
    thanNhanLietSi: IThanNhanLietSi;

    constructor(
        private thanNhanLietSiService: ThanNhanLietSiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thanNhanLietSiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thanNhanLietSiListModification',
                content: 'Deleted an thanNhanLietSi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-than-nhan-liet-si-delete-popup',
    template: ''
})
export class ThanNhanLietSiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thanNhanLietSi }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThanNhanLietSiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.thanNhanLietSi = thanNhanLietSi;
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
