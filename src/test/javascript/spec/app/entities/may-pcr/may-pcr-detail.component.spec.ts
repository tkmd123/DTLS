/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MayPCRDetailComponent } from 'app/entities/may-pcr/may-pcr-detail.component';
import { MayPCR } from 'app/shared/model/may-pcr.model';

describe('Component Tests', () => {
    describe('MayPCR Management Detail Component', () => {
        let comp: MayPCRDetailComponent;
        let fixture: ComponentFixture<MayPCRDetailComponent>;
        const route = ({ data: of({ mayPCR: new MayPCR(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MayPCRDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MayPCRDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MayPCRDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mayPCR).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
