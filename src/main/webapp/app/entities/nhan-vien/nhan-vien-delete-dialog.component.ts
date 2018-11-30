import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from './nhan-vien.service';

@Component({
    selector: 'jhi-nhan-vien-delete-dialog',
    templateUrl: './nhan-vien-delete-dialog.component.html'
})
export class NhanVienDeleteDialogComponent {
    nhanVien: INhanVien;

    constructor(private nhanVienService: NhanVienService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nhanVienService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nhanVienListModification',
                content: 'Deleted an nhanVien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nhan-vien-delete-popup',
    template: ''
})
export class NhanVienDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nhanVien }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NhanVienDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nhanVien = nhanVien;
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
