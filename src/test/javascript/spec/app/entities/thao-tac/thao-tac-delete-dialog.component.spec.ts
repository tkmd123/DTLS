/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { ThaoTacDeleteDialogComponent } from 'app/entities/thao-tac/thao-tac-delete-dialog.component';
import { ThaoTacService } from 'app/entities/thao-tac/thao-tac.service';

describe('Component Tests', () => {
    describe('ThaoTac Management Delete Component', () => {
        let comp: ThaoTacDeleteDialogComponent;
        let fixture: ComponentFixture<ThaoTacDeleteDialogComponent>;
        let service: ThaoTacService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThaoTacDeleteDialogComponent]
            })
                .overrideTemplate(ThaoTacDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThaoTacDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThaoTacService);
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
