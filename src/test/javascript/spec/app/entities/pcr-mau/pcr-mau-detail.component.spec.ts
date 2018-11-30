/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRMauDetailComponent } from 'app/entities/pcr-mau/pcr-mau-detail.component';
import { PCRMau } from 'app/shared/model/pcr-mau.model';

describe('Component Tests', () => {
    describe('PCRMau Management Detail Component', () => {
        let comp: PCRMauDetailComponent;
        let fixture: ComponentFixture<PCRMauDetailComponent>;
        const route = ({ data: of({ pCRMau: new PCRMau(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMauDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PCRMauDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRMauDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pCRMau).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
