/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { DonViDeleteDialogComponent } from 'app/entities/don-vi/don-vi-delete-dialog.component';
import { DonViService } from 'app/entities/don-vi/don-vi.service';

describe('Component Tests', () => {
    describe('DonVi Management Delete Component', () => {
        let comp: DonViDeleteDialogComponent;
        let fixture: ComponentFixture<DonViDeleteDialogComponent>;
        let service: DonViService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViDeleteDialogComponent]
            })
                .overrideTemplate(DonViDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonViDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonViService);
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
