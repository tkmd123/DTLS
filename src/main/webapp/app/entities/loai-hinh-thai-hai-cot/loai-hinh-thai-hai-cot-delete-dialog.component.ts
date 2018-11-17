import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';
import { LoaiHinhThaiHaiCotService } from './loai-hinh-thai-hai-cot.service';

@Component({
    selector: 'jhi-loai-hinh-thai-hai-cot-delete-dialog',
    templateUrl: './loai-hinh-thai-hai-cot-delete-dialog.component.html'
})
export class LoaiHinhThaiHaiCotDeleteDialogComponent {
    loaiHinhThaiHaiCot: ILoaiHinhThaiHaiCot;

    constructor(
        private loaiHinhThaiHaiCotService: LoaiHinhThaiHaiCotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loaiHinhThaiHaiCotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loaiHinhThaiHaiCotListModification',
                content: 'Deleted an loaiHinhThaiHaiCot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loai-hinh-thai-hai-cot-delete-popup',
    template: ''
})
export class LoaiHinhThaiHaiCotDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiHinhThaiHaiCot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LoaiHinhThaiHaiCotDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.loaiHinhThaiHaiCot = loaiHinhThaiHaiCot;
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
