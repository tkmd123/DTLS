/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThaoTacDetailComponent } from 'app/entities/thao-tac/thao-tac-detail.component';
import { ThaoTac } from 'app/shared/model/thao-tac.model';

describe('Component Tests', () => {
    describe('ThaoTac Management Detail Component', () => {
        let comp: ThaoTacDetailComponent;
        let fixture: ComponentFixture<ThaoTacDetailComponent>;
        const route = ({ data: of({ thaoTac: new ThaoTac(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThaoTacDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThaoTacDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThaoTacDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.thaoTac).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
