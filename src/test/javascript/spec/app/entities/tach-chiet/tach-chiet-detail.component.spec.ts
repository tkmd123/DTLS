/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TachChietDetailComponent } from 'app/entities/tach-chiet/tach-chiet-detail.component';
import { TachChiet } from 'app/shared/model/tach-chiet.model';

describe('Component Tests', () => {
    describe('TachChiet Management Detail Component', () => {
        let comp: TachChietDetailComponent;
        let fixture: ComponentFixture<TachChietDetailComponent>;
        const route = ({ data: of({ tachChiet: new TachChiet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TachChietDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TachChietDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TachChietDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tachChiet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
