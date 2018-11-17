import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INhanDang } from 'app/shared/model/nhan-dang.model';
import { NhanDangService } from './nhan-dang.service';

@Component({
    selector: 'jhi-nhan-dang-delete-dialog',
    templateUrl: './nhan-dang-delete-dialog.component.html'
})
export class NhanDangDeleteDialogComponent {
    nhanDang: INhanDang;

    constructor(private nhanDangService: NhanDangService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nhanDangService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nhanDangListModification',
                content: 'Deleted an nhanDang'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nhan-dang-delete-popup',
    template: ''
})
export class NhanDangDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nhanDang }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NhanDangDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nhanDang = nhanDang;
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
