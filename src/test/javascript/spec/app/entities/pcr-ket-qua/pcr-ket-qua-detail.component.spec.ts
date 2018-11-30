/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRKetQuaDetailComponent } from 'app/entities/pcr-ket-qua/pcr-ket-qua-detail.component';
import { PCRKetQua } from 'app/shared/model/pcr-ket-qua.model';

describe('Component Tests', () => {
    describe('PCRKetQua Management Detail Component', () => {
        let comp: PCRKetQuaDetailComponent;
        let fixture: ComponentFixture<PCRKetQuaDetailComponent>;
        const route = ({ data: of({ pCRKetQua: new PCRKetQua(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRKetQuaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PCRKetQuaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PCRKetQuaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pCRKetQua).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
