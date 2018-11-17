import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';
import { LoaiMauXetNghiemService } from './loai-mau-xet-nghiem.service';
import { LoaiMauXetNghiemComponent } from './loai-mau-xet-nghiem.component';
import { LoaiMauXetNghiemDetailComponent } from './loai-mau-xet-nghiem-detail.component';
import { LoaiMauXetNghiemUpdateComponent } from './loai-mau-xet-nghiem-update.component';
import { LoaiMauXetNghiemDeletePopupComponent } from './loai-mau-xet-nghiem-delete-dialog.component';
import { ILoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';

@Injectable({ providedIn: 'root' })
export class LoaiMauXetNghiemResolve implements Resolve<ILoaiMauXetNghiem> {
    constructor(private service: LoaiMauXetNghiemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoaiMauXetNghiem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LoaiMauXetNghiem>) => response.ok),
                map((loaiMauXetNghiem: HttpResponse<LoaiMauXetNghiem>) => loaiMauXetNghiem.body)
            );
        }
        return of(new LoaiMauXetNghiem());
    }
}

export const loaiMauXetNghiemRoute: Routes = [
    {
        path: 'loai-mau-xet-nghiem',
        component: LoaiMauXetNghiemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiMauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-mau-xet-nghiem/:id/view',
        component: LoaiMauXetNghiemDetailComponent,
        resolve: {
            loaiMauXetNghiem: LoaiMauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiMauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-mau-xet-nghiem/new',
        component: LoaiMauXetNghiemUpdateComponent,
        resolve: {
            loaiMauXetNghiem: LoaiMauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiMauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-mau-xet-nghiem/:id/edit',
        component: LoaiMauXetNghiemUpdateComponent,
        resolve: {
            loaiMauXetNghiem: LoaiMauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiMauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loaiMauXetNghiemPopupRoute: Routes = [
    {
        path: 'loai-mau-xet-nghiem/:id/delete',
        component: LoaiMauXetNghiemDeletePopupComponent,
        resolve: {
            loaiMauXetNghiem: LoaiMauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiMauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
