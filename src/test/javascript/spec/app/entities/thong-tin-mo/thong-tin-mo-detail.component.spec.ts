/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinMoDetailComponent } from 'app/entities/thong-tin-mo/thong-tin-mo-detail.component';
import { ThongTinMo } from 'app/shared/model/thong-tin-mo.model';

describe('Component Tests', () => {
    describe('ThongTinMo Management Detail Component', () => {
        let comp: ThongTinMoDetailComponent;
        let fixture: ComponentFixture<ThongTinMoDetailComponent>;
        const route = ({ data: of({ thongTinMo: new ThongTinMo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinMoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThongTinMoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThongTinMoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thongTinMo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
