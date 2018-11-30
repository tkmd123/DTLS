import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaiDiVat } from 'app/shared/model/loai-di-vat.model';
import { LoaiDiVatService } from './loai-di-vat.service';
import { LoaiDiVatComponent } from './loai-di-vat.component';
import { LoaiDiVatDetailComponent } from './loai-di-vat-detail.component';
import { LoaiDiVatUpdateComponent } from './loai-di-vat-update.component';
import { LoaiDiVatDeletePopupComponent } from './loai-di-vat-delete-dialog.component';
import { ILoaiDiVat } from 'app/shared/model/loai-di-vat.model';

@Injectable({ providedIn: 'root' })
export class LoaiDiVatResolve implements Resolve<ILoaiDiVat> {
    constructor(private service: LoaiDiVatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoaiDiVat> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LoaiDiVat>) => response.ok),
                map((loaiDiVat: HttpResponse<LoaiDiVat>) => loaiDiVat.body)
            );
        }
        return of(new LoaiDiVat());
    }
}

export const loaiDiVatRoute: Routes = [
    {
        path: 'loai-di-vat',
        component: LoaiDiVatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiDiVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-di-vat/:id/view',
        component: LoaiDiVatDetailComponent,
        resolve: {
            loaiDiVat: LoaiDiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiDiVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-di-vat/new',
        component: LoaiDiVatUpdateComponent,
        resolve: {
            loaiDiVat: LoaiDiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiDiVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-di-vat/:id/edit',
        component: LoaiDiVatUpdateComponent,
        resolve: {
            loaiDiVat: LoaiDiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiDiVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loaiDiVatPopupRoute: Routes = [
    {
        path: 'loai-di-vat/:id/delete',
        component: LoaiDiVatDeletePopupComponent,
        resolve: {
            loaiDiVat: LoaiDiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiDiVat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
