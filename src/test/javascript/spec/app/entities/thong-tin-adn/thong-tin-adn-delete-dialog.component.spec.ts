/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinADNDeleteDialogComponent } from 'app/entities/thong-tin-adn/thong-tin-adn-delete-dialog.component';
import { ThongTinADNService } from 'app/entities/thong-tin-adn/thong-tin-adn.service';

describe('Component Tests', () => {
    describe('ThongTinADN Management Delete Component', () => {
        let comp: ThongTinADNDeleteDialogComponent;
        let fixture: ComponentFixture<ThongTinADNDeleteDialogComponent>;
        let service: ThongTinADNService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinADNDeleteDialogComponent]
            })
                .overrideTemplate(ThongTinADNDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThongTinADNDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinADNService);
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
