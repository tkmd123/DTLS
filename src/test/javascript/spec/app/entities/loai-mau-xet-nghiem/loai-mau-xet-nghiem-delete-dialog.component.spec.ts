/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { LoaiMauXetNghiemDeleteDialogComponent } from 'app/entities/loai-mau-xet-nghiem/loai-mau-xet-nghiem-delete-dialog.component';
import { LoaiMauXetNghiemService } from 'app/entities/loai-mau-xet-nghiem/loai-mau-xet-nghiem.service';

describe('Component Tests', () => {
    describe('LoaiMauXetNghiem Management Delete Component', () => {
        let comp: LoaiMauXetNghiemDeleteDialogComponent;
        let fixture: ComponentFixture<LoaiMauXetNghiemDeleteDialogComponent>;
        let service: LoaiMauXetNghiemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiMauXetNghiemDeleteDialogComponent]
            })
                .overrideTemplate(LoaiMauXetNghiemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiMauXetNghiemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiMauXetNghiemService);
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
