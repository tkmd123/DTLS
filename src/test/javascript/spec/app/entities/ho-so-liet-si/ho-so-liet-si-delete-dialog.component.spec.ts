/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HoSoLietSiDeleteDialogComponent } from 'app/entities/ho-so-liet-si/ho-so-liet-si-delete-dialog.component';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si/ho-so-liet-si.service';

describe('Component Tests', () => {
    describe('HoSoLietSi Management Delete Component', () => {
        let comp: HoSoLietSiDeleteDialogComponent;
        let fixture: ComponentFixture<HoSoLietSiDeleteDialogComponent>;
        let service: HoSoLietSiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoLietSiDeleteDialogComponent]
            })
                .overrideTemplate(HoSoLietSiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoSoLietSiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoLietSiService);
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
