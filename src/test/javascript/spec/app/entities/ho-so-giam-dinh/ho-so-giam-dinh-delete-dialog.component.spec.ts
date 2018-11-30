/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HoSoGiamDinhDeleteDialogComponent } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh-delete-dialog.component';
import { HoSoGiamDinhService } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh.service';

describe('Component Tests', () => {
    describe('HoSoGiamDinh Management Delete Component', () => {
        let comp: HoSoGiamDinhDeleteDialogComponent;
        let fixture: ComponentFixture<HoSoGiamDinhDeleteDialogComponent>;
        let service: HoSoGiamDinhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoGiamDinhDeleteDialogComponent]
            })
                .overrideTemplate(HoSoGiamDinhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoSoGiamDinhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoGiamDinhService);
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
