/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HinhThaiHaiCotDetailComponent } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot-detail.component';
import { HinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';

describe('Component Tests', () => {
    describe('HinhThaiHaiCot Management Detail Component', () => {
        let comp: HinhThaiHaiCotDetailComponent;
        let fixture: ComponentFixture<HinhThaiHaiCotDetailComponent>;
        const route = ({ data: of({ hinhThaiHaiCot: new HinhThaiHaiCot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HinhThaiHaiCotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HinhThaiHaiCotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HinhThaiHaiCotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hinhThaiHaiCot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
