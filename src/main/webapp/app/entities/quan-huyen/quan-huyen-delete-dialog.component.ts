import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';
import { QuanHuyenService } from './quan-huyen.service';

@Component({
    selector: 'jhi-quan-huyen-delete-dialog',
    templateUrl: './quan-huyen-delete-dialog.component.html'
})
export class QuanHuyenDeleteDialogComponent {
    quanHuyen: IQuanHuyen;

    constructor(private quanHuyenService: QuanHuyenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.quanHuyenService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'quanHuyenListModification',
                content: 'Deleted an quanHuyen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-quan-huyen-delete-popup',
    template: ''
})
export class QuanHuyenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quanHuyen }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QuanHuyenDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.quanHuyen = quanHuyen;
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
