/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { CapBacDetailComponent } from 'app/entities/cap-bac/cap-bac-detail.component';
import { CapBac } from 'app/shared/model/cap-bac.model';

describe('Component Tests', () => {
    describe('CapBac Management Detail Component', () => {
        let comp: CapBacDetailComponent;
        let fixture: ComponentFixture<CapBacDetailComponent>;
        const route = ({ data: of({ capBac: new CapBac(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [CapBacDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CapBacDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CapBacDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.capBac).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
