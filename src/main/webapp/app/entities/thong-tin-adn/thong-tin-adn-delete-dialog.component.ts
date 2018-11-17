import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';
import { ThongTinADNService } from './thong-tin-adn.service';

@Component({
    selector: 'jhi-thong-tin-adn-delete-dialog',
    templateUrl: './thong-tin-adn-delete-dialog.component.html'
})
export class ThongTinADNDeleteDialogComponent {
    thongTinADN: IThongTinADN;

    constructor(
        private thongTinADNService: ThongTinADNService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thongTinADNService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thongTinADNListModification',
                content: 'Deleted an thongTinADN'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thong-tin-adn-delete-popup',
    template: ''
})
export class ThongTinADNDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thongTinADN }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThongTinADNDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.thongTinADN = thongTinADN;
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
