import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';
import { HinhThaiHaiCotService } from './hinh-thai-hai-cot.service';

@Component({
    selector: 'jhi-hinh-thai-hai-cot-delete-dialog',
    templateUrl: './hinh-thai-hai-cot-delete-dialog.component.html'
})
export class HinhThaiHaiCotDeleteDialogComponent {
    hinhThaiHaiCot: IHinhThaiHaiCot;

    constructor(
        private hinhThaiHaiCotService: HinhThaiHaiCotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hinhThaiHaiCotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hinhThaiHaiCotListModification',
                content: 'Deleted an hinhThaiHaiCot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hinh-thai-hai-cot-delete-popup',
    template: ''
})
export class HinhThaiHaiCotDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hinhThaiHaiCot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HinhThaiHaiCotDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hinhThaiHaiCot = hinhThaiHaiCot;
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
