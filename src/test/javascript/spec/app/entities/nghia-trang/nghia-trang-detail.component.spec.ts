/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NghiaTrangDetailComponent } from 'app/entities/nghia-trang/nghia-trang-detail.component';
import { NghiaTrang } from 'app/shared/model/nghia-trang.model';

describe('Component Tests', () => {
    describe('NghiaTrang Management Detail Component', () => {
        let comp: NghiaTrangDetailComponent;
        let fixture: ComponentFixture<NghiaTrangDetailComponent>;
        const route = ({ data: of({ nghiaTrang: new NghiaTrang(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NghiaTrangDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NghiaTrangDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NghiaTrangDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nghiaTrang).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
