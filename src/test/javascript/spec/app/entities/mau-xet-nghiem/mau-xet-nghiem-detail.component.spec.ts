/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MauXetNghiemDetailComponent } from 'app/entities/mau-xet-nghiem/mau-xet-nghiem-detail.component';
import { MauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';

describe('Component Tests', () => {
    describe('MauXetNghiem Management Detail Component', () => {
        let comp: MauXetNghiemDetailComponent;
        let fixture: ComponentFixture<MauXetNghiemDetailComponent>;
        const route = ({ data: of({ mauXetNghiem: new MauXetNghiem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauXetNghiemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MauXetNghiemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MauXetNghiemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mauXetNghiem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
