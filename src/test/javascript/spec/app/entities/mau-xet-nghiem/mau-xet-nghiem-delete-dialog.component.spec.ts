/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { MauXetNghiemDeleteDialogComponent } from 'app/entities/mau-xet-nghiem/mau-xet-nghiem-delete-dialog.component';
import { MauXetNghiemService } from 'app/entities/mau-xet-nghiem/mau-xet-nghiem.service';

describe('Component Tests', () => {
    describe('MauXetNghiem Management Delete Component', () => {
        let comp: MauXetNghiemDeleteDialogComponent;
        let fixture: ComponentFixture<MauXetNghiemDeleteDialogComponent>;
        let service: MauXetNghiemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauXetNghiemDeleteDialogComponent]
            })
                .overrideTemplate(MauXetNghiemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MauXetNghiemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MauXetNghiemService);
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
