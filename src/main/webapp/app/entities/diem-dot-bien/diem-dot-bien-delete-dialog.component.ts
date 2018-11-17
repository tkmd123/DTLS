import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiemDotBien } from 'app/shared/model/diem-dot-bien.model';
import { DiemDotBienService } from './diem-dot-bien.service';

@Component({
    selector: 'jhi-diem-dot-bien-delete-dialog',
    templateUrl: './diem-dot-bien-delete-dialog.component.html'
})
export class DiemDotBienDeleteDialogComponent {
    diemDotBien: IDiemDotBien;

    constructor(
        private diemDotBienService: DiemDotBienService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diemDotBienService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'diemDotBienListModification',
                content: 'Deleted an diemDotBien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-diem-dot-bien-delete-popup',
    template: ''
})
export class DiemDotBienDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diemDotBien }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiemDotBienDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.diemDotBien = diemDotBien;
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
