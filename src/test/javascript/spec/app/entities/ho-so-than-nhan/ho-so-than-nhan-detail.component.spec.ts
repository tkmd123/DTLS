/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoSoThanNhanDetailComponent } from 'app/entities/ho-so-than-nhan/ho-so-than-nhan-detail.component';
import { HoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';

describe('Component Tests', () => {
    describe('HoSoThanNhan Management Detail Component', () => {
        let comp: HoSoThanNhanDetailComponent;
        let fixture: ComponentFixture<HoSoThanNhanDetailComponent>;
        const route = ({ data: of({ hoSoThanNhan: new HoSoThanNhan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoThanNhanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HoSoThanNhanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoSoThanNhanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hoSoThanNhan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
