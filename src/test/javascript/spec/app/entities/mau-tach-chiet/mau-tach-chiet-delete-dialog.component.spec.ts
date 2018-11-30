/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { MauTachChietDeleteDialogComponent } from 'app/entities/mau-tach-chiet/mau-tach-chiet-delete-dialog.component';
import { MauTachChietService } from 'app/entities/mau-tach-chiet/mau-tach-chiet.service';

describe('Component Tests', () => {
    describe('MauTachChiet Management Delete Component', () => {
        let comp: MauTachChietDeleteDialogComponent;
        let fixture: ComponentFixture<MauTachChietDeleteDialogComponent>;
        let service: MauTachChietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauTachChietDeleteDialogComponent]
            })
                .overrideTemplate(MauTachChietDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MauTachChietDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MauTachChietService);
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
