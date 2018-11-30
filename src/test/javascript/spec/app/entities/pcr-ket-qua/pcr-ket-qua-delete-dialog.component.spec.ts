/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { PCRKetQuaDeleteDialogComponent } from 'app/entities/pcr-ket-qua/pcr-ket-qua-delete-dialog.component';
import { PCRKetQuaService } from 'app/entities/pcr-ket-qua/pcr-ket-qua.service';

describe('Component Tests', () => {
    describe('PCRKetQua Management Delete Component', () => {
        let comp: PCRKetQuaDeleteDialogComponent;
        let fixture: ComponentFixture<PCRKetQuaDeleteDialogComponent>;
        let service: PCRKetQuaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRKetQuaDeleteDialogComponent]
            })
                .overrideTemplate(PCRKetQuaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRKetQuaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRKetQuaService);
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
