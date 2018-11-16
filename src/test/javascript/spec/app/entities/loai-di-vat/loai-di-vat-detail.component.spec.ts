/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiDiVatDetailComponent } from 'app/entities/loai-di-vat/loai-di-vat-detail.component';
import { LoaiDiVat } from 'app/shared/model/loai-di-vat.model';

describe('Component Tests', () => {
    describe('LoaiDiVat Management Detail Component', () => {
        let comp: LoaiDiVatDetailComponent;
        let fixture: ComponentFixture<LoaiDiVatDetailComponent>;
        const route = ({ data: of({ loaiDiVat: new LoaiDiVat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiDiVatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LoaiDiVatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiDiVatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.loaiDiVat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
