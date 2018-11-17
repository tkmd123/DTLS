import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';
import { MauXetNghiemService } from './mau-xet-nghiem.service';
import { MauXetNghiemComponent } from './mau-xet-nghiem.component';
import { MauXetNghiemDetailComponent } from './mau-xet-nghiem-detail.component';
import { MauXetNghiemUpdateComponent } from './mau-xet-nghiem-update.component';
import { MauXetNghiemDeletePopupComponent } from './mau-xet-nghiem-delete-dialog.component';
import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';

@Injectable({ providedIn: 'root' })
export class MauXetNghiemResolve implements Resolve<IMauXetNghiem> {
    constructor(private service: MauXetNghiemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MauXetNghiem> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MauXetNghiem>) => response.ok),
                map((mauXetNghiem: HttpResponse<MauXetNghiem>) => mauXetNghiem.body)
            );
        }
        return of(new MauXetNghiem());
    }
}

export const mauXetNghiemRoute: Routes = [
    {
        path: 'mau-xet-nghiem',
        component: MauXetNghiemComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.mauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mau-xet-nghiem/:id/view',
        component: MauXetNghiemDetailComponent,
        resolve: {
            mauXetNghiem: MauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mau-xet-nghiem/new',
        component: MauXetNghiemUpdateComponent,
        resolve: {
            mauXetNghiem: MauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mau-xet-nghiem/:id/edit',
        component: MauXetNghiemUpdateComponent,
        resolve: {
            mauXetNghiem: MauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mauXetNghiemPopupRoute: Routes = [
    {
        path: 'mau-xet-nghiem/:id/delete',
        component: MauXetNghiemDeletePopupComponent,
        resolve: {
            mauXetNghiem: MauXetNghiemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauXetNghiem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
