import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITinhSach } from 'app/shared/model/tinh-sach.model';
import { TinhSachService } from './tinh-sach.service';

@Component({
    selector: 'jhi-tinh-sach-delete-dialog',
    templateUrl: './tinh-sach-delete-dialog.component.html'
})
export class TinhSachDeleteDialogComponent {
    tinhSach: ITinhSach;

    constructor(private tinhSachService: TinhSachService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tinhSachService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tinhSachListModification',
                content: 'Deleted an tinhSach'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tinh-sach-delete-popup',
    template: ''
})
export class TinhSachDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tinhSach }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TinhSachDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tinhSach = tinhSach;
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
