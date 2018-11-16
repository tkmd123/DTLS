/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinKhaiQuatDeleteDialogComponent } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat-delete-dialog.component';
import { ThongTinKhaiQuatService } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat.service';

describe('Component Tests', () => {
    describe('ThongTinKhaiQuat Management Delete Component', () => {
        let comp: ThongTinKhaiQuatDeleteDialogComponent;
        let fixture: ComponentFixture<ThongTinKhaiQuatDeleteDialogComponent>;
        let service: ThongTinKhaiQuatService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinKhaiQuatDeleteDialogComponent]
            })
                .overrideTemplate(ThongTinKhaiQuatDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThongTinKhaiQuatDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinKhaiQuatService);
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
