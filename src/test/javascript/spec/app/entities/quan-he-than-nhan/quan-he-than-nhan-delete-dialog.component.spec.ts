/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { QuanHeThanNhanDeleteDialogComponent } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan-delete-dialog.component';
import { QuanHeThanNhanService } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan.service';

describe('Component Tests', () => {
    describe('QuanHeThanNhan Management Delete Component', () => {
        let comp: QuanHeThanNhanDeleteDialogComponent;
        let fixture: ComponentFixture<QuanHeThanNhanDeleteDialogComponent>;
        let service: QuanHeThanNhanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHeThanNhanDeleteDialogComponent]
            })
                .overrideTemplate(QuanHeThanNhanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuanHeThanNhanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuanHeThanNhanService);
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
