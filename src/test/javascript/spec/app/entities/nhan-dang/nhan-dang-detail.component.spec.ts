/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangDetailComponent } from 'app/entities/nhan-dang/nhan-dang-detail.component';
import { NhanDang } from 'app/shared/model/nhan-dang.model';

describe('Component Tests', () => {
    describe('NhanDang Management Detail Component', () => {
        let comp: NhanDangDetailComponent;
        let fixture: ComponentFixture<NhanDangDetailComponent>;
        const route = ({ data: of({ nhanDang: new NhanDang(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NhanDangDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NhanDangDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nhanDang).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
