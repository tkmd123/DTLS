import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMappingDotBien } from 'app/shared/model/mapping-dot-bien.model';
import { MappingDotBienService } from './mapping-dot-bien.service';

@Component({
    selector: 'jhi-mapping-dot-bien-delete-dialog',
    templateUrl: './mapping-dot-bien-delete-dialog.component.html'
})
export class MappingDotBienDeleteDialogComponent {
    mappingDotBien: IMappingDotBien;

    constructor(
        private mappingDotBienService: MappingDotBienService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mappingDotBienService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mappingDotBienListModification',
                content: 'Deleted an mappingDotBien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mapping-dot-bien-delete-popup',
    template: ''
})
export class MappingDotBienDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mappingDotBien }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MappingDotBienDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mappingDotBien = mappingDotBien;
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
