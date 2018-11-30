/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MauTachChietDetailComponent } from 'app/entities/mau-tach-chiet/mau-tach-chiet-detail.component';
import { MauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

describe('Component Tests', () => {
    describe('MauTachChiet Management Detail Component', () => {
        let comp: MauTachChietDetailComponent;
        let fixture: ComponentFixture<MauTachChietDetailComponent>;
        const route = ({ data: of({ mauTachChiet: new MauTachChiet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauTachChietDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MauTachChietDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MauTachChietDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mauTachChiet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
