/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ChucVuDetailComponent } from 'app/entities/chuc-vu/chuc-vu-detail.component';
import { ChucVu } from 'app/shared/model/chuc-vu.model';

describe('Component Tests', () => {
    describe('ChucVu Management Detail Component', () => {
        let comp: ChucVuDetailComponent;
        let fixture: ComponentFixture<ChucVuDetailComponent>;
        const route = ({ data: of({ chucVu: new ChucVu(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ChucVuDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChucVuDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChucVuDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.chucVu).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
