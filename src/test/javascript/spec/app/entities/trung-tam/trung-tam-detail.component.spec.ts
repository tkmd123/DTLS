/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TrungTamDetailComponent } from 'app/entities/trung-tam/trung-tam-detail.component';
import { TrungTam } from 'app/shared/model/trung-tam.model';

describe('Component Tests', () => {
    describe('TrungTam Management Detail Component', () => {
        let comp: TrungTamDetailComponent;
        let fixture: ComponentFixture<TrungTamDetailComponent>;
        const route = ({ data: of({ trungTam: new TrungTam(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TrungTamDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrungTamDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrungTamDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trungTam).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
