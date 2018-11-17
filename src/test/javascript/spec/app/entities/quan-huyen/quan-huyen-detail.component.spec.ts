/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { QuanHuyenDetailComponent } from 'app/entities/quan-huyen/quan-huyen-detail.component';
import { QuanHuyen } from 'app/shared/model/quan-huyen.model';

describe('Component Tests', () => {
    describe('QuanHuyen Management Detail Component', () => {
        let comp: QuanHuyenDetailComponent;
        let fixture: ComponentFixture<QuanHuyenDetailComponent>;
        const route = ({ data: of({ quanHuyen: new QuanHuyen(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHuyenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QuanHuyenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuanHuyenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.quanHuyen).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
