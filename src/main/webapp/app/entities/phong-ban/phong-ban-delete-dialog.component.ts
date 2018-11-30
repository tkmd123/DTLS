import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from './phong-ban.service';

@Component({
    selector: 'jhi-phong-ban-delete-dialog',
    templateUrl: './phong-ban-delete-dialog.component.html'
})
export class PhongBanDeleteDialogComponent {
    phongBan: IPhongBan;

    constructor(private phongBanService: PhongBanService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.phongBanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'phongBanListModification',
                content: 'Deleted an phongBan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-phong-ban-delete-popup',
    template: ''
})
export class PhongBanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ phongBan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PhongBanDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.phongBan = phongBan;
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
