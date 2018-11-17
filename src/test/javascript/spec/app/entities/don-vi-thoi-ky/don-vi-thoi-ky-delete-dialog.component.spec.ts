/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { DonViThoiKyDeleteDialogComponent } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky-delete-dialog.component';
import { DonViThoiKyService } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky.service';

describe('Component Tests', () => {
    describe('DonViThoiKy Management Delete Component', () => {
        let comp: DonViThoiKyDeleteDialogComponent;
        let fixture: ComponentFixture<DonViThoiKyDeleteDialogComponent>;
        let service: DonViThoiKyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViThoiKyDeleteDialogComponent]
            })
                .overrideTemplate(DonViThoiKyDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonViThoiKyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonViThoiKyService);
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
