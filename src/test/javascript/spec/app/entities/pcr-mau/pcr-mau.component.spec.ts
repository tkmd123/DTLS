/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PCRMauComponent } from 'app/entities/pcr-mau/pcr-mau.component';
import { PCRMauService } from 'app/entities/pcr-mau/pcr-mau.service';
import { PCRMau } from 'app/shared/model/pcr-mau.model';

describe('Component Tests', () => {
    describe('PCRMau Management Component', () => {
        let comp: PCRMauComponent;
        let fixture: ComponentFixture<PCRMauComponent>;
        let service: PCRMauService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMauComponent],
                providers: []
            })
                .overrideTemplate(PCRMauComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRMauComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRMauService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PCRMau(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pCRMaus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
