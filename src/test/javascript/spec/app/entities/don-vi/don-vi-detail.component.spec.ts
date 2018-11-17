/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DonViDetailComponent } from 'app/entities/don-vi/don-vi-detail.component';
import { DonVi } from 'app/shared/model/don-vi.model';

describe('Component Tests', () => {
    describe('DonVi Management Detail Component', () => {
        let comp: DonViDetailComponent;
        let fixture: ComponentFixture<DonViDetailComponent>;
        const route = ({ data: of({ donVi: new DonVi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DonViDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonViDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.donVi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
