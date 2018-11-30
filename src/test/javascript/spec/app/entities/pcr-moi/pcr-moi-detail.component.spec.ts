/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRMoiDetailComponent } from 'app/entities/pcr-moi/pcr-moi-detail.component';
import { PCRMoi } from 'app/shared/model/pcr-moi.model';

describe('Component Tests', () => {
    describe('PCRMoi Management Detail Component', () => {
        let comp: PCRMoiDetailComponent;
        let fixture: ComponentFixture<PCRMoiDetailComponent>;
        const route = ({ data: of({ pCRMoi: new PCRMoi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMoiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PCRMoiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRMoiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pCRMoi).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
