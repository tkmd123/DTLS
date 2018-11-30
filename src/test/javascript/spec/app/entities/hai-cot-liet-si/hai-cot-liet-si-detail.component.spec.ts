/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HaiCotLietSiDetailComponent } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si-detail.component';
import { HaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';

describe('Component Tests', () => {
    describe('HaiCotLietSi Management Detail Component', () => {
        let comp: HaiCotLietSiDetailComponent;
        let fixture: ComponentFixture<HaiCotLietSiDetailComponent>;
        const route = ({ data: of({ haiCotLietSi: new HaiCotLietSi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HaiCotLietSiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HaiCotLietSiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HaiCotLietSiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.haiCotLietSi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
