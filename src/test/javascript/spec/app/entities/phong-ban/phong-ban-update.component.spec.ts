/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PhongBanUpdateComponent } from 'app/entities/phong-ban/phong-ban-update.component';
import { PhongBanService } from 'app/entities/phong-ban/phong-ban.service';
import { PhongBan } from 'app/shared/model/phong-ban.model';

describe('Component Tests', () => {
    describe('PhongBan Management Update Component', () => {
        let comp: PhongBanUpdateComponent;
        let fixture: ComponentFixture<PhongBanUpdateComponent>;
        let service: PhongBanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PhongBanUpdateComponent]
            })
                .overrideTemplate(PhongBanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhongBanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhongBanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PhongBan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.phongBan = entity;
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
                    const entity = new PhongBan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.phongBan = entity;
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
