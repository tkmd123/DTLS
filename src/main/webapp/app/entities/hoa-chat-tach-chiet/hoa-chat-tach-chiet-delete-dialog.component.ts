import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';
import { HoaChatTachChietService } from './hoa-chat-tach-chiet.service';

@Component({
    selector: 'jhi-hoa-chat-tach-chiet-delete-dialog',
    templateUrl: './hoa-chat-tach-chiet-delete-dialog.component.html'
})
export class HoaChatTachChietDeleteDialogComponent {
    hoaChatTachChiet: IHoaChatTachChiet;

    constructor(
        private hoaChatTachChietService: HoaChatTachChietService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoaChatTachChietService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hoaChatTachChietListModification',
                content: 'Deleted an hoaChatTachChiet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hoa-chat-tach-chiet-delete-popup',
    template: ''
})
export class HoaChatTachChietDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoaChatTachChiet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HoaChatTachChietDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hoaChatTachChiet = hoaChatTachChiet;
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
