/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { DiVatComponent } from 'app/entities/di-vat/di-vat.component';
import { DiVatService } from 'app/entities/di-vat/di-vat.service';
import { DiVat } from 'app/shared/model/di-vat.model';

describe('Component Tests', () => {
    describe('DiVat Management Component', () => {
        let comp: DiVatComponent;
        let fixture: ComponentFixture<DiVatComponent>;
        let service: DiVatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DiVatComponent],
                providers: []
            })
                .overrideTemplate(DiVatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiVatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiVatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DiVat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.diVats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
