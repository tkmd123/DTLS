/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiMauXetNghiemDetailComponent } from 'app/entities/loai-mau-xet-nghiem/loai-mau-xet-nghiem-detail.component';
import { LoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';

describe('Component Tests', () => {
    describe('LoaiMauXetNghiem Management Detail Component', () => {
        let comp: LoaiMauXetNghiemDetailComponent;
        let fixture: ComponentFixture<LoaiMauXetNghiemDetailComponent>;
        const route = ({ data: of({ loaiMauXetNghiem: new LoaiMauXetNghiem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiMauXetNghiemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LoaiMauXetNghiemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiMauXetNghiemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.loaiMauXetNghiem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
