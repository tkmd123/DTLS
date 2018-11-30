/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { LoaiThaoTacDeleteDialogComponent } from 'app/entities/loai-thao-tac/loai-thao-tac-delete-dialog.component';
import { LoaiThaoTacService } from 'app/entities/loai-thao-tac/loai-thao-tac.service';

describe('Component Tests', () => {
    describe('LoaiThaoTac Management Delete Component', () => {
        let comp: LoaiThaoTacDeleteDialogComponent;
        let fixture: ComponentFixture<LoaiThaoTacDeleteDialogComponent>;
        let service: LoaiThaoTacService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiThaoTacDeleteDialogComponent]
            })
                .overrideTemplate(LoaiThaoTacDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiThaoTacDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiThaoTacService);
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
