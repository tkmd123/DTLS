import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';
import { HoSoGiamDinhService } from './ho-so-giam-dinh.service';

@Component({
    selector: 'jhi-ho-so-giam-dinh-delete-dialog',
    templateUrl: './ho-so-giam-dinh-delete-dialog.component.html'
})
export class HoSoGiamDinhDeleteDialogComponent {
    hoSoGiamDinh: IHoSoGiamDinh;

    constructor(
        private hoSoGiamDinhService: HoSoGiamDinhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoSoGiamDinhService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hoSoGiamDinhListModification',
                content: 'Deleted an hoSoGiamDinh'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ho-so-giam-dinh-delete-popup',
    template: ''
})
export class HoSoGiamDinhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoSoGiamDinh }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HoSoGiamDinhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hoSoGiamDinh = hoSoGiamDinh;
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
