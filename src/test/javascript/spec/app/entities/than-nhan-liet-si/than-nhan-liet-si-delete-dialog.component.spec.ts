/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { ThanNhanLietSiDeleteDialogComponent } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si-delete-dialog.component';
import { ThanNhanLietSiService } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si.service';

describe('Component Tests', () => {
    describe('ThanNhanLietSi Management Delete Component', () => {
        let comp: ThanNhanLietSiDeleteDialogComponent;
        let fixture: ComponentFixture<ThanNhanLietSiDeleteDialogComponent>;
        let service: ThanNhanLietSiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThanNhanLietSiDeleteDialogComponent]
            })
                .overrideTemplate(ThanNhanLietSiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThanNhanLietSiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThanNhanLietSiService);
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
