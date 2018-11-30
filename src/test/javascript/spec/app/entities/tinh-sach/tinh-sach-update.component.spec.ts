/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachUpdateComponent } from 'app/entities/tinh-sach/tinh-sach-update.component';
import { TinhSachService } from 'app/entities/tinh-sach/tinh-sach.service';
import { TinhSach } from 'app/shared/model/tinh-sach.model';

describe('Component Tests', () => {
    describe('TinhSach Management Update Component', () => {
        let comp: TinhSachUpdateComponent;
        let fixture: ComponentFixture<TinhSachUpdateComponent>;
        let service: TinhSachService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachUpdateComponent]
            })
                .overrideTemplate(TinhSachUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TinhSachUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhSachService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TinhSach(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tinhSach = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TinhSach();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tinhSach = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
