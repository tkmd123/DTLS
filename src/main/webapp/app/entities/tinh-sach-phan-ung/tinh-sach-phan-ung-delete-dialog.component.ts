import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';
import { TinhSachPhanUngService } from './tinh-sach-phan-ung.service';

@Component({
    selector: 'jhi-tinh-sach-phan-ung-delete-dialog',
    templateUrl: './tinh-sach-phan-ung-delete-dialog.component.html'
})
export class TinhSachPhanUngDeleteDialogComponent {
    tinhSachPhanUng: ITinhSachPhanUng;

    constructor(
        private tinhSachPhanUngService: TinhSachPhanUngService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tinhSachPhanUngService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tinhSachPhanUngListModification',
                content: 'Deleted an tinhSachPhanUng'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tinh-sach-phan-ung-delete-popup',
    template: ''
})
export class TinhSachPhanUngDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tinhSachPhanUng }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TinhSachPhanUngDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tinhSachPhanUng = tinhSachPhanUng;
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
