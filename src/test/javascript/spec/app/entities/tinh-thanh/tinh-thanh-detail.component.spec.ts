/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TinhThanhDetailComponent } from 'app/entities/tinh-thanh/tinh-thanh-detail.component';
import { TinhThanh } from 'app/shared/model/tinh-thanh.model';

describe('Component Tests', () => {
    describe('TinhThanh Management Detail Component', () => {
        let comp: TinhThanhDetailComponent;
        let fixture: ComponentFixture<TinhThanhDetailComponent>;
        const route = ({ data: of({ tinhThanh: new TinhThanh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhThanhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TinhThanhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TinhThanhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tinhThanh).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
