import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';
import { NhanDangLietSiService } from './nhan-dang-liet-si.service';

@Component({
    selector: 'jhi-nhan-dang-liet-si-delete-dialog',
    templateUrl: './nhan-dang-liet-si-delete-dialog.component.html'
})
export class NhanDangLietSiDeleteDialogComponent {
    nhanDangLietSi: INhanDangLietSi;

    constructor(
        private nhanDangLietSiService: NhanDangLietSiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nhanDangLietSiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nhanDangLietSiListModification',
                content: 'Deleted an nhanDangLietSi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nhan-dang-liet-si-delete-popup',
    template: ''
})
export class NhanDangLietSiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nhanDangLietSi }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NhanDangLietSiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.nhanDangLietSi = nhanDangLietSi;
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
