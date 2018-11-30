/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngDetailComponent } from 'app/entities/pcr-phan-ung/pcr-phan-ung-detail.component';
import { PCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';

describe('Component Tests', () => {
    describe('PCRPhanUng Management Detail Component', () => {
        let comp: PCRPhanUngDetailComponent;
        let fixture: ComponentFixture<PCRPhanUngDetailComponent>;
        const route = ({ data: of({ pCRPhanUng: new PCRPhanUng(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PCRPhanUngDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRPhanUngDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pCRPhanUng).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
