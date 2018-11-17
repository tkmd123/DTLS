/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { LoaiDiVatDeleteDialogComponent } from 'app/entities/loai-di-vat/loai-di-vat-delete-dialog.component';
import { LoaiDiVatService } from 'app/entities/loai-di-vat/loai-di-vat.service';

describe('Component Tests', () => {
    describe('LoaiDiVat Management Delete Component', () => {
        let comp: LoaiDiVatDeleteDialogComponent;
        let fixture: ComponentFixture<LoaiDiVatDeleteDialogComponent>;
        let service: LoaiDiVatService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiDiVatDeleteDialogComponent]
            })
                .overrideTemplate(LoaiDiVatDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiDiVatDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiDiVatService);
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
