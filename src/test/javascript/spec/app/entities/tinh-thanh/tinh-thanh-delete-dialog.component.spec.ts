/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { TinhThanhDeleteDialogComponent } from 'app/entities/tinh-thanh/tinh-thanh-delete-dialog.component';
import { TinhThanhService } from 'app/entities/tinh-thanh/tinh-thanh.service';

describe('Component Tests', () => {
    describe('TinhThanh Management Delete Component', () => {
        let comp: TinhThanhDeleteDialogComponent;
        let fixture: ComponentFixture<TinhThanhDeleteDialogComponent>;
        let service: TinhThanhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhThanhDeleteDialogComponent]
            })
                .overrideTemplate(TinhThanhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TinhThanhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhThanhService);
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
