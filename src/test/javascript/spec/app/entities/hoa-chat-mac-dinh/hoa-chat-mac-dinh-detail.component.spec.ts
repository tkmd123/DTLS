/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatMacDinhDetailComponent } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh-detail.component';
import { HoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';

describe('Component Tests', () => {
    describe('HoaChatMacDinh Management Detail Component', () => {
        let comp: HoaChatMacDinhDetailComponent;
        let fixture: ComponentFixture<HoaChatMacDinhDetailComponent>;
        const route = ({ data: of({ hoaChatMacDinh: new HoaChatMacDinh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatMacDinhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HoaChatMacDinhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoaChatMacDinhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hoaChatMacDinh).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
