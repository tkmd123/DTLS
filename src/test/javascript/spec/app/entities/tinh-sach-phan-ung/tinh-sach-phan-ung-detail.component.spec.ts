/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachPhanUngDetailComponent } from 'app/entities/tinh-sach-phan-ung/tinh-sach-phan-ung-detail.component';
import { TinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';

describe('Component Tests', () => {
    describe('TinhSachPhanUng Management Detail Component', () => {
        let comp: TinhSachPhanUngDetailComponent;
        let fixture: ComponentFixture<TinhSachPhanUngDetailComponent>;
        const route = ({ data: of({ tinhSachPhanUng: new TinhSachPhanUng(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachPhanUngDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TinhSachPhanUngDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TinhSachPhanUngDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tinhSachPhanUng).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
