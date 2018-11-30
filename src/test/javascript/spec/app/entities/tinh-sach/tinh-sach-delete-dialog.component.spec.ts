/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachDeleteDialogComponent } from 'app/entities/tinh-sach/tinh-sach-delete-dialog.component';
import { TinhSachService } from 'app/entities/tinh-sach/tinh-sach.service';

describe('Component Tests', () => {
    describe('TinhSach Management Delete Component', () => {
        let comp: TinhSachDeleteDialogComponent;
        let fixture: ComponentFixture<TinhSachDeleteDialogComponent>;
        let service: TinhSachService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachDeleteDialogComponent]
            })
                .overrideTemplate(TinhSachDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TinhSachDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhSachService);
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
