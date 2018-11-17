/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiHinhThaiHaiCotDetailComponent } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot-detail.component';
import { LoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

describe('Component Tests', () => {
    describe('LoaiHinhThaiHaiCot Management Detail Component', () => {
        let comp: LoaiHinhThaiHaiCotDetailComponent;
        let fixture: ComponentFixture<LoaiHinhThaiHaiCotDetailComponent>;
        const route = ({ data: of({ loaiHinhThaiHaiCot: new LoaiHinhThaiHaiCot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiHinhThaiHaiCotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LoaiHinhThaiHaiCotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiHinhThaiHaiCotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.loaiHinhThaiHaiCot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
