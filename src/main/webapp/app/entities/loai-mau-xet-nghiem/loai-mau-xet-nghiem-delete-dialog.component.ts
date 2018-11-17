import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';
import { LoaiMauXetNghiemService } from './loai-mau-xet-nghiem.service';

@Component({
    selector: 'jhi-loai-mau-xet-nghiem-delete-dialog',
    templateUrl: './loai-mau-xet-nghiem-delete-dialog.component.html'
})
export class LoaiMauXetNghiemDeleteDialogComponent {
    loaiMauXetNghiem: ILoaiMauXetNghiem;

    constructor(
        private loaiMauXetNghiemService: LoaiMauXetNghiemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loaiMauXetNghiemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loaiMauXetNghiemListModification',
                content: 'Deleted an loaiMauXetNghiem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loai-mau-xet-nghiem-delete-popup',
    template: ''
})
export class LoaiMauXetNghiemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiMauXetNghiem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LoaiMauXetNghiemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.loaiMauXetNghiem = loaiMauXetNghiem;
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
