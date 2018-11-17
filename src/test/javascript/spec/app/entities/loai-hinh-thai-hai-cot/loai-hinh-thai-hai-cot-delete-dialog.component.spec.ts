/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { LoaiHinhThaiHaiCotDeleteDialogComponent } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot-delete-dialog.component';
import { LoaiHinhThaiHaiCotService } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot.service';

describe('Component Tests', () => {
    describe('LoaiHinhThaiHaiCot Management Delete Component', () => {
        let comp: LoaiHinhThaiHaiCotDeleteDialogComponent;
        let fixture: ComponentFixture<LoaiHinhThaiHaiCotDeleteDialogComponent>;
        let service: LoaiHinhThaiHaiCotService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiHinhThaiHaiCotDeleteDialogComponent]
            })
                .overrideTemplate(LoaiHinhThaiHaiCotDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiHinhThaiHaiCotDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiHinhThaiHaiCotService);
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
