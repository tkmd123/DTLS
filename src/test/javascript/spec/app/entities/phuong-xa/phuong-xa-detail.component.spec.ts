/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PhuongXaDetailComponent } from 'app/entities/phuong-xa/phuong-xa-detail.component';
import { PhuongXa } from 'app/shared/model/phuong-xa.model';

describe('Component Tests', () => {
    describe('PhuongXa Management Detail Component', () => {
        let comp: PhuongXaDetailComponent;
        let fixture: ComponentFixture<PhuongXaDetailComponent>;
        const route = ({ data: of({ phuongXa: new PhuongXa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PhuongXaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PhuongXaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PhuongXaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.phuongXa).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
