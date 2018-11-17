/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DiemDotBienDetailComponent } from 'app/entities/diem-dot-bien/diem-dot-bien-detail.component';
import { DiemDotBien } from 'app/shared/model/diem-dot-bien.model';

describe('Component Tests', () => {
    describe('DiemDotBien Management Detail Component', () => {
        let comp: DiemDotBienDetailComponent;
        let fixture: ComponentFixture<DiemDotBienDetailComponent>;
        const route = ({ data: of({ diemDotBien: new DiemDotBien(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DiemDotBienDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiemDotBienDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiemDotBienDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diemDotBien).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
