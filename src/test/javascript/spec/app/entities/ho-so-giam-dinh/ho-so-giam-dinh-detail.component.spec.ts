/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoSoGiamDinhDetailComponent } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh-detail.component';
import { HoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';

describe('Component Tests', () => {
    describe('HoSoGiamDinh Management Detail Component', () => {
        let comp: HoSoGiamDinhDetailComponent;
        let fixture: ComponentFixture<HoSoGiamDinhDetailComponent>;
        const route = ({ data: of({ hoSoGiamDinh: new HoSoGiamDinh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoGiamDinhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HoSoGiamDinhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoSoGiamDinhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hoSoGiamDinh).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
