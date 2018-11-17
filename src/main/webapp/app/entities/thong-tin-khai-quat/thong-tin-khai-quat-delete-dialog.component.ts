import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';
import { ThongTinKhaiQuatService } from './thong-tin-khai-quat.service';

@Component({
    selector: 'jhi-thong-tin-khai-quat-delete-dialog',
    templateUrl: './thong-tin-khai-quat-delete-dialog.component.html'
})
export class ThongTinKhaiQuatDeleteDialogComponent {
    thongTinKhaiQuat: IThongTinKhaiQuat;

    constructor(
        private thongTinKhaiQuatService: ThongTinKhaiQuatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thongTinKhaiQuatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thongTinKhaiQuatListModification',
                content: 'Deleted an thongTinKhaiQuat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thong-tin-khai-quat-delete-popup',
    template: ''
})
export class ThongTinKhaiQuatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thongTinKhaiQuat }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThongTinKhaiQuatDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.thongTinKhaiQuat = thongTinKhaiQuat;
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
