/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { PCRMauDeleteDialogComponent } from 'app/entities/pcr-mau/pcr-mau-delete-dialog.component';
import { PCRMauService } from 'app/entities/pcr-mau/pcr-mau.service';

describe('Component Tests', () => {
    describe('PCRMau Management Delete Component', () => {
        let comp: PCRMauDeleteDialogComponent;
        let fixture: ComponentFixture<PCRMauDeleteDialogComponent>;
        let service: PCRMauService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMauDeleteDialogComponent]
            })
                .overrideTemplate(PCRMauDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRMauDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRMauService);
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
