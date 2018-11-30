import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';
import { LoaiThaoTacService } from './loai-thao-tac.service';

@Component({
    selector: 'jhi-loai-thao-tac-delete-dialog',
    templateUrl: './loai-thao-tac-delete-dialog.component.html'
})
export class LoaiThaoTacDeleteDialogComponent {
    loaiThaoTac: ILoaiThaoTac;

    constructor(
        private loaiThaoTacService: LoaiThaoTacService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loaiThaoTacService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loaiThaoTacListModification',
                content: 'Deleted an loaiThaoTac'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loai-thao-tac-delete-popup',
    template: ''
})
export class LoaiThaoTacDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiThaoTac }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LoaiThaoTacDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.loaiThaoTac = loaiThaoTac;
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
