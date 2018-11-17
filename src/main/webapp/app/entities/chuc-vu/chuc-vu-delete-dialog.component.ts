import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChucVu } from 'app/shared/model/chuc-vu.model';
import { ChucVuService } from './chuc-vu.service';

@Component({
    selector: 'jhi-chuc-vu-delete-dialog',
    templateUrl: './chuc-vu-delete-dialog.component.html'
})
export class ChucVuDeleteDialogComponent {
    chucVu: IChucVu;

    constructor(private chucVuService: ChucVuService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chucVuService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chucVuListModification',
                content: 'Deleted an chucVu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chuc-vu-delete-popup',
    template: ''
})
export class ChucVuDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chucVu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChucVuDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.chucVu = chucVu;
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
