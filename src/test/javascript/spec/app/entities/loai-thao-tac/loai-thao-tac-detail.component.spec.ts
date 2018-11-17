/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiThaoTacDetailComponent } from 'app/entities/loai-thao-tac/loai-thao-tac-detail.component';
import { LoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';

describe('Component Tests', () => {
    describe('LoaiThaoTac Management Detail Component', () => {
        let comp: LoaiThaoTacDetailComponent;
        let fixture: ComponentFixture<LoaiThaoTacDetailComponent>;
        const route = ({ data: of({ loaiThaoTac: new LoaiThaoTac(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiThaoTacDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LoaiThaoTacDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoaiThaoTacDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.loaiThaoTac).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
