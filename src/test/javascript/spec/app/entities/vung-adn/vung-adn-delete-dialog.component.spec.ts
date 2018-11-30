/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DtlsTestModule } from '../../../test.module';
import { VungADNDeleteDialogComponent } from 'app/entities/vung-adn/vung-adn-delete-dialog.component';
import { VungADNService } from 'app/entities/vung-adn/vung-adn.service';

describe('Component Tests', () => {
    describe('VungADN Management Delete Component', () => {
        let comp: VungADNDeleteDialogComponent;
        let fixture: ComponentFixture<VungADNDeleteDialogComponent>;
        let service: VungADNService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [VungADNDeleteDialogComponent]
            })
                .overrideTemplate(VungADNDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VungADNDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VungADNService);
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
