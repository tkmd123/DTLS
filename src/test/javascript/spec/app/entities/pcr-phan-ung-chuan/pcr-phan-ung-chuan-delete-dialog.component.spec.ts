/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngChuanDeleteDialogComponent } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan-delete-dialog.component';
import { PCRPhanUngChuanService } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan.service';

describe('Component Tests', () => {
    describe('PCRPhanUngChuan Management Delete Component', () => {
        let comp: PCRPhanUngChuanDeleteDialogComponent;
        let fixture: ComponentFixture<PCRPhanUngChuanDeleteDialogComponent>;
        let service: PCRPhanUngChuanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngChuanDeleteDialogComponent]
            })
                .overrideTemplate(PCRPhanUngChuanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRPhanUngChuanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRPhanUngChuanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
