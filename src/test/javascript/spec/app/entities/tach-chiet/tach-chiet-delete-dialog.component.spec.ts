/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { TachChietDeleteDialogComponent } from 'app/entities/tach-chiet/tach-chiet-delete-dialog.component';
import { TachChietService } from 'app/entities/tach-chiet/tach-chiet.service';

describe('Component Tests', () => {
    describe('TachChiet Management Delete Component', () => {
        let comp: TachChietDeleteDialogComponent;
        let fixture: ComponentFixture<TachChietDeleteDialogComponent>;
        let service: TachChietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TachChietDeleteDialogComponent]
            })
                .overrideTemplate(TachChietDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TachChietDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TachChietService);
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
