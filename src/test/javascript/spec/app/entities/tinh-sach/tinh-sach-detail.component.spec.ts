/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachDetailComponent } from 'app/entities/tinh-sach/tinh-sach-detail.component';
import { TinhSach } from 'app/shared/model/tinh-sach.model';

describe('Component Tests', () => {
    describe('TinhSach Management Detail Component', () => {
        let comp: TinhSachDetailComponent;
        let fixture: ComponentFixture<TinhSachDetailComponent>;
        const route = ({ data: of({ tinhSach: new TinhSach(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TinhSachDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TinhSachDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tinhSach).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
