/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinKhaiQuatDetailComponent } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat-detail.component';
import { ThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';

describe('Component Tests', () => {
    describe('ThongTinKhaiQuat Management Detail Component', () => {
        let comp: ThongTinKhaiQuatDetailComponent;
        let fixture: ComponentFixture<ThongTinKhaiQuatDetailComponent>;
        const route = ({ data: of({ thongTinKhaiQuat: new ThongTinKhaiQuat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinKhaiQuatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThongTinKhaiQuatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThongTinKhaiQuatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thongTinKhaiQuat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
