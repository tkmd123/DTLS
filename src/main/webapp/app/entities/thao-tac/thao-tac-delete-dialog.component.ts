import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThaoTac } from 'app/shared/model/thao-tac.model';
import { ThaoTacService } from './thao-tac.service';

@Component({
    selector: 'jhi-thao-tac-delete-dialog',
    templateUrl: './thao-tac-delete-dialog.component.html'
})
export class ThaoTacDeleteDialogComponent {
    thaoTac: IThaoTac;

    constructor(private thaoTacService: ThaoTacService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thaoTacService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thaoTacListModification',
                content: 'Deleted an thaoTac'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thao-tac-delete-popup',
    template: ''
})
export class ThaoTacDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thaoTac }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThaoTacDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.thaoTac = thaoTac;
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
