/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DiVatDetailComponent } from 'app/entities/di-vat/di-vat-detail.component';
import { DiVat } from 'app/shared/model/di-vat.model';

describe('Component Tests', () => {
    describe('DiVat Management Detail Component', () => {
        let comp: DiVatDetailComponent;
        let fixture: ComponentFixture<DiVatDetailComponent>;
        const route = ({ data: of({ diVat: new DiVat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DiVatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiVatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiVatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diVat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
