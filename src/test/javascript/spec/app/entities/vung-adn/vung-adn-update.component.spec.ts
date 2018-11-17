/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { VungADNUpdateComponent } from 'app/entities/vung-adn/vung-adn-update.component';
import { VungADNService } from 'app/entities/vung-adn/vung-adn.service';
import { VungADN } from 'app/shared/model/vung-adn.model';

describe('Component Tests', () => {
    describe('VungADN Management Update Component', () => {
        let comp: VungADNUpdateComponent;
        let fixture: ComponentFixture<VungADNUpdateComponent>;
        let service: VungADNService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [VungADNUpdateComponent]
            })
                .overrideTemplate(VungADNUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VungADNUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VungADNService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VungADN(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vungADN = entity;
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
                    const entity = new VungADN();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vungADN = entity;
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
