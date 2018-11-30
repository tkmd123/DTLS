/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { PCRMoiDeleteDialogComponent } from 'app/entities/pcr-moi/pcr-moi-delete-dialog.component';
import { PCRMoiService } from 'app/entities/pcr-moi/pcr-moi.service';

describe('Component Tests', () => {
    describe('PCRMoi Management Delete Component', () => {
        let comp: PCRMoiDeleteDialogComponent;
        let fixture: ComponentFixture<PCRMoiDeleteDialogComponent>;
        let service: PCRMoiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMoiDeleteDialogComponent]
            })
                .overrideTemplate(PCRMoiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRMoiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRMoiService);
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
