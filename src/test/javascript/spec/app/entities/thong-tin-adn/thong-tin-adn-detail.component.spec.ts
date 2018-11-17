/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinADNDetailComponent } from 'app/entities/thong-tin-adn/thong-tin-adn-detail.component';
import { ThongTinADN } from 'app/shared/model/thong-tin-adn.model';

describe('Component Tests', () => {
    describe('ThongTinADN Management Detail Component', () => {
        let comp: ThongTinADNDetailComponent;
        let fixture: ComponentFixture<ThongTinADNDetailComponent>;
        const route = ({ data: of({ thongTinADN: new ThongTinADN(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinADNDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThongTinADNDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThongTinADNDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thongTinADN).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
