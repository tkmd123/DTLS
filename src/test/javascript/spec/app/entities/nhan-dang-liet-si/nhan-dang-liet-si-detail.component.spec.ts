/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangLietSiDetailComponent } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si-detail.component';
import { NhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';

describe('Component Tests', () => {
    describe('NhanDangLietSi Management Detail Component', () => {
        let comp: NhanDangLietSiDetailComponent;
        let fixture: ComponentFixture<NhanDangLietSiDetailComponent>;
        const route = ({ data: of({ nhanDangLietSi: new NhanDangLietSi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangLietSiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NhanDangLietSiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NhanDangLietSiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nhanDangLietSi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
