/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DonViThoiKyDetailComponent } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky-detail.component';
import { DonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

describe('Component Tests', () => {
    describe('DonViThoiKy Management Detail Component', () => {
        let comp: DonViThoiKyDetailComponent;
        let fixture: ComponentFixture<DonViThoiKyDetailComponent>;
        const route = ({ data: of({ donViThoiKy: new DonViThoiKy(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViThoiKyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DonViThoiKyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DonViThoiKyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.donViThoiKy).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
