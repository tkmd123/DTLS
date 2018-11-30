/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { MayPCRDeleteDialogComponent } from 'app/entities/may-pcr/may-pcr-delete-dialog.component';
import { MayPCRService } from 'app/entities/may-pcr/may-pcr.service';

describe('Component Tests', () => {
    describe('MayPCR Management Delete Component', () => {
        let comp: MayPCRDeleteDialogComponent;
        let fixture: ComponentFixture<MayPCRDeleteDialogComponent>;
        let service: MayPCRService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MayPCRDeleteDialogComponent]
            })
                .overrideTemplate(MayPCRDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MayPCRDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MayPCRService);
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
