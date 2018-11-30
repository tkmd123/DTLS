/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PCRComponent } from 'app/entities/pcr/pcr.component';
import { PCRService } from 'app/entities/pcr/pcr.service';
import { PCR } from 'app/shared/model/pcr.model';

describe('Component Tests', () => {
    describe('PCR Management Component', () => {
        let comp: PCRComponent;
        let fixture: ComponentFixture<PCRComponent>;
        let service: PCRService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRComponent],
                providers: []
            })
                .overrideTemplate(PCRComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PCR(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pCRS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
