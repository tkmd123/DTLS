/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MappingDotBienDetailComponent } from 'app/entities/mapping-dot-bien/mapping-dot-bien-detail.component';
import { MappingDotBien } from 'app/shared/model/mapping-dot-bien.model';

describe('Component Tests', () => {
    describe('MappingDotBien Management Detail Component', () => {
        let comp: MappingDotBienDetailComponent;
        let fixture: ComponentFixture<MappingDotBienDetailComponent>;
        const route = ({ data: of({ mappingDotBien: new MappingDotBien(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MappingDotBienDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MappingDotBienDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MappingDotBienDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mappingDotBien).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
