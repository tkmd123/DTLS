import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';
import { HoaChatMacDinhService } from './hoa-chat-mac-dinh.service';

@Component({
    selector: 'jhi-hoa-chat-mac-dinh-delete-dialog',
    templateUrl: './hoa-chat-mac-dinh-delete-dialog.component.html'
})
export class HoaChatMacDinhDeleteDialogComponent {
    hoaChatMacDinh: IHoaChatMacDinh;

    constructor(
        private hoaChatMacDinhService: HoaChatMacDinhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoaChatMacDinhService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hoaChatMacDinhListModification',
                content: 'Deleted an hoaChatMacDinh'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hoa-chat-mac-dinh-delete-popup',
    template: ''
})
export class HoaChatMacDinhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoaChatMacDinh }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HoaChatMacDinhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hoaChatMacDinh = hoaChatMacDinh;
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
