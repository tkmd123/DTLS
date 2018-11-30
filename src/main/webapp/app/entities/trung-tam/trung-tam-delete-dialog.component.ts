import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrungTam } from 'app/shared/model/trung-tam.model';
import { TrungTamService } from './trung-tam.service';

@Component({
    selector: 'jhi-trung-tam-delete-dialog',
    templateUrl: './trung-tam-delete-dialog.component.html'
})
export class TrungTamDeleteDialogComponent {
    trungTam: ITrungTam;

    constructor(private trungTamService: TrungTamService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trungTamService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trungTamListModification',
                content: 'Deleted an trungTam'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-trung-tam-delete-popup',
    template: ''
})
export class TrungTamDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trungTam }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrungTamDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.trungTam = trungTam;
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
