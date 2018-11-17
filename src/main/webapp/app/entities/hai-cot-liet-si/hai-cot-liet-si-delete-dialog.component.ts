import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';
import { HaiCotLietSiService } from './hai-cot-liet-si.service';

@Component({
    selector: 'jhi-hai-cot-liet-si-delete-dialog',
    templateUrl: './hai-cot-liet-si-delete-dialog.component.html'
})
export class HaiCotLietSiDeleteDialogComponent {
    haiCotLietSi: IHaiCotLietSi;

    constructor(
        private haiCotLietSiService: HaiCotLietSiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.haiCotLietSiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'haiCotLietSiListModification',
                content: 'Deleted an haiCotLietSi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hai-cot-liet-si-delete-popup',
    template: ''
})
export class HaiCotLietSiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ haiCotLietSi }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HaiCotLietSiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.haiCotLietSi = haiCotLietSi;
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
