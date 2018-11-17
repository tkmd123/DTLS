import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from './ho-so-liet-si.service';

@Component({
    selector: 'jhi-ho-so-liet-si-delete-dialog',
    templateUrl: './ho-so-liet-si-delete-dialog.component.html'
})
export class HoSoLietSiDeleteDialogComponent {
    hoSoLietSi: IHoSoLietSi;

    constructor(private hoSoLietSiService: HoSoLietSiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoSoLietSiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hoSoLietSiListModification',
                content: 'Deleted an hoSoLietSi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ho-so-liet-si-delete-popup',
    template: ''
})
export class HoSoLietSiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoSoLietSi }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HoSoLietSiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.hoSoLietSi = hoSoLietSi;
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
