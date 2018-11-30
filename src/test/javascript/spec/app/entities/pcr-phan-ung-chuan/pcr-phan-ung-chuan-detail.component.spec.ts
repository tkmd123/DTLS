/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngChuanDetailComponent } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan-detail.component';
import { PCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';

describe('Component Tests', () => {
    describe('PCRPhanUngChuan Management Detail Component', () => {
        let comp: PCRPhanUngChuanDetailComponent;
        let fixture: ComponentFixture<PCRPhanUngChuanDetailComponent>;
        const route = ({ data: of({ pCRPhanUngChuan: new PCRPhanUngChuan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngChuanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PCRPhanUngChuanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRPhanUngChuanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pCRPhanUngChuan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
