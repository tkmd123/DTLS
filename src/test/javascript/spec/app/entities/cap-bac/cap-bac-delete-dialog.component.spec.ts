/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { CapBacDeleteDialogComponent } from 'app/entities/cap-bac/cap-bac-delete-dialog.component';
import { CapBacService } from 'app/entities/cap-bac/cap-bac.service';

describe('Component Tests', () => {
    describe('CapBac Management Delete Component', () => {
        let comp: CapBacDeleteDialogComponent;
        let fixture: ComponentFixture<CapBacDeleteDialogComponent>;
        let service: CapBacService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [CapBacDeleteDialogComponent]
            })
                .overrideTemplate(CapBacDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CapBacDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapBacService);
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
