import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';
import { TinhThanhService } from './tinh-thanh.service';

@Component({
    selector: 'jhi-tinh-thanh-delete-dialog',
    templateUrl: './tinh-thanh-delete-dialog.component.html'
})
export class TinhThanhDeleteDialogComponent {
    tinhThanh: ITinhThanh;

    constructor(private tinhThanhService: TinhThanhService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tinhThanhService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tinhThanhListModification',
                content: 'Deleted an tinhThanh'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tinh-thanh-delete-popup',
    template: ''
})
export class TinhThanhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tinhThanh }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TinhThanhDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tinhThanh = tinhThanh;
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
