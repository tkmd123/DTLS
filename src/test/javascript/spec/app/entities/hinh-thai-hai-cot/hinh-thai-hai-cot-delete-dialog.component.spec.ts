/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HinhThaiHaiCotDeleteDialogComponent } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot-delete-dialog.component';
import { HinhThaiHaiCotService } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot.service';

describe('Component Tests', () => {
    describe('HinhThaiHaiCot Management Delete Component', () => {
        let comp: HinhThaiHaiCotDeleteDialogComponent;
        let fixture: ComponentFixture<HinhThaiHaiCotDeleteDialogComponent>;
        let service: HinhThaiHaiCotService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HinhThaiHaiCotDeleteDialogComponent]
            })
                .overrideTemplate(HinhThaiHaiCotDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HinhThaiHaiCotDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HinhThaiHaiCotService);
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
