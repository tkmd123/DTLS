/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { QuanHeThanNhanDetailComponent } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan-detail.component';
import { QuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';

describe('Component Tests', () => {
    describe('QuanHeThanNhan Management Detail Component', () => {
        let comp: QuanHeThanNhanDetailComponent;
        let fixture: ComponentFixture<QuanHeThanNhanDetailComponent>;
        const route = ({ data: of({ quanHeThanNhan: new QuanHeThanNhan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHeThanNhanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QuanHeThanNhanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuanHeThanNhanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.quanHeThanNhan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
