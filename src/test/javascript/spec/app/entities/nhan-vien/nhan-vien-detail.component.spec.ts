/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NhanVienDetailComponent } from 'app/entities/nhan-vien/nhan-vien-detail.component';
import { NhanVien } from 'app/shared/model/nhan-vien.model';

describe('Component Tests', () => {
    describe('NhanVien Management Detail Component', () => {
        let comp: NhanVienDetailComponent;
        let fixture: ComponentFixture<NhanVienDetailComponent>;
        const route = ({ data: of({ nhanVien: new NhanVien(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanVienDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NhanVienDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NhanVienDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nhanVien).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
