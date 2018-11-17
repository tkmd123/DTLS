/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PhongBanDetailComponent } from 'app/entities/phong-ban/phong-ban-detail.component';
import { PhongBan } from 'app/shared/model/phong-ban.model';

describe('Component Tests', () => {
    describe('PhongBan Management Detail Component', () => {
        let comp: PhongBanDetailComponent;
        let fixture: ComponentFixture<PhongBanDetailComponent>;
        const route = ({ data: of({ phongBan: new PhongBan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PhongBanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PhongBanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PhongBanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.phongBan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
