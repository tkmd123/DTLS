/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatMacDinhUpdateComponent } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh-update.component';
import { HoaChatMacDinhService } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh.service';
import { HoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';

describe('Component Tests', () => {
    describe('HoaChatMacDinh Management Update Component', () => {
        let comp: HoaChatMacDinhUpdateComponent;
        let fixture: ComponentFixture<HoaChatMacDinhUpdateComponent>;
        let service: HoaChatMacDinhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatMacDinhUpdateComponent]
            })
                .overrideTemplate(HoaChatMacDinhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoaChatMacDinhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatMacDinhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HoaChatMacDinh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoaChatMacDinh = entity;
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
                    const entity = new HoaChatMacDinh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoaChatMacDinh = entity;
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
