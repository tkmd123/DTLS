/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangLietSiDeleteDialogComponent } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si-delete-dialog.component';
import { NhanDangLietSiService } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si.service';

describe('Component Tests', () => {
    describe('NhanDangLietSi Management Delete Component', () => {
        let comp: NhanDangLietSiDeleteDialogComponent;
        let fixture: ComponentFixture<NhanDangLietSiDeleteDialogComponent>;
        let service: NhanDangLietSiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangLietSiDeleteDialogComponent]
            })
                .overrideTemplate(NhanDangLietSiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NhanDangLietSiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanDangLietSiService);
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
