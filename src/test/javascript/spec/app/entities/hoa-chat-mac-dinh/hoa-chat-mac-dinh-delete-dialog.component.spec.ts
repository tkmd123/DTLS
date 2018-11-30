/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatMacDinhDeleteDialogComponent } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh-delete-dialog.component';
import { HoaChatMacDinhService } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh.service';

describe('Component Tests', () => {
    describe('HoaChatMacDinh Management Delete Component', () => {
        let comp: HoaChatMacDinhDeleteDialogComponent;
        let fixture: ComponentFixture<HoaChatMacDinhDeleteDialogComponent>;
        let service: HoaChatMacDinhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatMacDinhDeleteDialogComponent]
            })
                .overrideTemplate(HoaChatMacDinhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoaChatMacDinhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatMacDinhService);
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
