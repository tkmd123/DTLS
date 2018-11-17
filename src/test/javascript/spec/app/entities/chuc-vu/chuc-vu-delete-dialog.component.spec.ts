/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { ChucVuDeleteDialogComponent } from 'app/entities/chuc-vu/chuc-vu-delete-dialog.component';
import { ChucVuService } from 'app/entities/chuc-vu/chuc-vu.service';

describe('Component Tests', () => {
    describe('ChucVu Management Delete Component', () => {
        let comp: ChucVuDeleteDialogComponent;
        let fixture: ComponentFixture<ChucVuDeleteDialogComponent>;
        let service: ChucVuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ChucVuDeleteDialogComponent]
            })
                .overrideTemplate(ChucVuDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChucVuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChucVuService);
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
