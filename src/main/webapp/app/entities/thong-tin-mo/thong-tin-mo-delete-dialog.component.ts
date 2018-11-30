import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';
import { ThongTinMoService } from './thong-tin-mo.service';

@Component({
    selector: 'jhi-thong-tin-mo-delete-dialog',
    templateUrl: './thong-tin-mo-delete-dialog.component.html'
})
export class ThongTinMoDeleteDialogComponent {
    thongTinMo: IThongTinMo;

    constructor(private thongTinMoService: ThongTinMoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thongTinMoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thongTinMoListModification',
                content: 'Deleted an thongTinMo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thong-tin-mo-delete-popup',
    template: ''
})
export class ThongTinMoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thongTinMo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThongTinMoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.thongTinMo = thongTinMo;
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
