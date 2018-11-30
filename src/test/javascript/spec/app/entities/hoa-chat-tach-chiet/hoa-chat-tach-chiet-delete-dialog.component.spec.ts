/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatTachChietDeleteDialogComponent } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet-delete-dialog.component';
import { HoaChatTachChietService } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet.service';

describe('Component Tests', () => {
    describe('HoaChatTachChiet Management Delete Component', () => {
        let comp: HoaChatTachChietDeleteDialogComponent;
        let fixture: ComponentFixture<HoaChatTachChietDeleteDialogComponent>;
        let service: HoaChatTachChietService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatTachChietDeleteDialogComponent]
            })
                .overrideTemplate(HoaChatTachChietDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoaChatTachChietDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatTachChietService);
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
