import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVungADN } from 'app/shared/model/vung-adn.model';
import { VungADNService } from './vung-adn.service';

@Component({
    selector: 'jhi-vung-adn-delete-dialog',
    templateUrl: './vung-adn-delete-dialog.component.html'
})
export class VungADNDeleteDialogComponent {
    vungADN: IVungADN;

    constructor(private vungADNService: VungADNService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vungADNService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vungADNListModification',
                content: 'Deleted an vungADN'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vung-adn-delete-popup',
    template: ''
})
export class VungADNDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vungADN }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VungADNDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.vungADN = vungADN;
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
