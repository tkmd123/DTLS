/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HaiCotLietSiDeleteDialogComponent } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si-delete-dialog.component';
import { HaiCotLietSiService } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si.service';

describe('Component Tests', () => {
    describe('HaiCotLietSi Management Delete Component', () => {
        let comp: HaiCotLietSiDeleteDialogComponent;
        let fixture: ComponentFixture<HaiCotLietSiDeleteDialogComponent>;
        let service: HaiCotLietSiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HaiCotLietSiDeleteDialogComponent]
            })
                .overrideTemplate(HaiCotLietSiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HaiCotLietSiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HaiCotLietSiService);
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
