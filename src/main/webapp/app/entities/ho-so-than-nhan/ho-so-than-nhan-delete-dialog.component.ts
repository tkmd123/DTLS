import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';
import { HoSoThanNhanService } from './ho-so-than-nhan.service';

@Component({
    selector: 'jhi-ho-so-than-nhan-delete-dialog',
    templateUrl: './ho-so-than-nhan-delete-dialog.component.html'
})
export class HoSoThanNhanDeleteDialogComponent {
    hoSoThanNhan: IHoSoThanNhan;

    constructor(
        private hoSoThanNhanService: HoSoThanNhanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoSoThanNhanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hoSoThanNhanListModification',
                content: 'Deleted an hoSoThanNhan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ho-so-than-nhan-delete-popup',
    template: ''
})
export class HoSoThanNhanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoSoThanNhan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HoSoThanNhanDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hoSoThanNhan = hoSoThanNhan;
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
