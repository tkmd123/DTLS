/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { VungADNDetailComponent } from 'app/entities/vung-adn/vung-adn-detail.component';
import { VungADN } from 'app/shared/model/vung-adn.model';

describe('Component Tests', () => {
    describe('VungADN Management Detail Component', () => {
        let comp: VungADNDetailComponent;
        let fixture: ComponentFixture<VungADNDetailComponent>;
        const route = ({ data: of({ vungADN: new VungADN(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [VungADNDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VungADNDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VungADNDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vungADN).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
