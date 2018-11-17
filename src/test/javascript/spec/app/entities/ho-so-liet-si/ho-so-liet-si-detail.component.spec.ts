/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoSoLietSiDetailComponent } from 'app/entities/ho-so-liet-si/ho-so-liet-si-detail.component';
import { HoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';

describe('Component Tests', () => {
    describe('HoSoLietSi Management Detail Component', () => {
        let comp: HoSoLietSiDetailComponent;
        let fixture: ComponentFixture<HoSoLietSiDetailComponent>;
        const route = ({ data: of({ hoSoLietSi: new HoSoLietSi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoLietSiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HoSoLietSiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoSoLietSiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hoSoLietSi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
