/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatTachChietDetailComponent } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet-detail.component';
import { HoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';

describe('Component Tests', () => {
    describe('HoaChatTachChiet Management Detail Component', () => {
        let comp: HoaChatTachChietDetailComponent;
        let fixture: ComponentFixture<HoaChatTachChietDetailComponent>;
        const route = ({ data: of({ hoaChatTachChiet: new HoaChatTachChiet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatTachChietDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HoaChatTachChietDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoaChatTachChietDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hoaChatTachChiet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
