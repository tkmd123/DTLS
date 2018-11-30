/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngComponent } from 'app/entities/pcr-phan-ung/pcr-phan-ung.component';
import { PCRPhanUngService } from 'app/entities/pcr-phan-ung/pcr-phan-ung.service';
import { PCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';

describe('Component Tests', () => {
    describe('PCRPhanUng Management Component', () => {
        let comp: PCRPhanUngComponent;
        let fixture: ComponentFixture<PCRPhanUngComponent>;
        let service: PCRPhanUngService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngComponent],
                providers: []
            })
                .overrideTemplate(PCRPhanUngComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRPhanUngComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRPhanUngService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PCRPhanUng(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pCRPhanUngs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
