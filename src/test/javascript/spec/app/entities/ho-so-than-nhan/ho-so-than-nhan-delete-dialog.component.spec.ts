/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HoSoThanNhanDeleteDialogComponent } from 'app/entities/ho-so-than-nhan/ho-so-than-nhan-delete-dialog.component';
import { HoSoThanNhanService } from 'app/entities/ho-so-than-nhan/ho-so-than-nhan.service';

describe('Component Tests', () => {
    describe('HoSoThanNhan Management Delete Component', () => {
        let comp: HoSoThanNhanDeleteDialogComponent;
        let fixture: ComponentFixture<HoSoThanNhanDeleteDialogComponent>;
        let service: HoSoThanNhanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoThanNhanDeleteDialogComponent]
            })
                .overrideTemplate(HoSoThanNhanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoSoThanNhanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoThanNhanService);
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
