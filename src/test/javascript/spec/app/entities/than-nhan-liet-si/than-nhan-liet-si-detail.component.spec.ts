/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThanNhanLietSiDetailComponent } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si-detail.component';
import { ThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';

describe('Component Tests', () => {
    describe('ThanNhanLietSi Management Detail Component', () => {
        let comp: ThanNhanLietSiDetailComponent;
        let fixture: ComponentFixture<ThanNhanLietSiDetailComponent>;
        const route = ({ data: of({ thanNhanLietSi: new ThanNhanLietSi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThanNhanLietSiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThanNhanLietSiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThanNhanLietSiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thanNhanLietSi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
