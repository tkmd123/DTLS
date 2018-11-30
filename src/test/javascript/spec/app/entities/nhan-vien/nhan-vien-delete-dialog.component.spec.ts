/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { NhanVienDeleteDialogComponent } from 'app/entities/nhan-vien/nhan-vien-delete-dialog.component';
import { NhanVienService } from 'app/entities/nhan-vien/nhan-vien.service';

describe('Component Tests', () => {
    describe('NhanVien Management Delete Component', () => {
        let comp: NhanVienDeleteDialogComponent;
        let fixture: ComponentFixture<NhanVienDeleteDialogComponent>;
        let service: NhanVienService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanVienDeleteDialogComponent]
            })
                .overrideTemplate(NhanVienDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NhanVienDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanVienService);
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
