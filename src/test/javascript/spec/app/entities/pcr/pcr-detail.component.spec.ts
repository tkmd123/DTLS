/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRDetailComponent } from 'app/entities/pcr/pcr-detail.component';
import { PCR } from 'app/shared/model/pcr.model';

describe('Component Tests', () => {
    describe('PCR Management Detail Component', () => {
        let comp: PCRDetailComponent;
        let fixture: ComponentFixture<PCRDetailComponent>;
        const route = ({ data: of({ pCR: new PCR(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PCRDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pCR).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
