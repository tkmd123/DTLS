import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TinhThanh } from 'app/shared/model/tinh-thanh.model';
import { TinhThanhService } from './tinh-thanh.service';
import { TinhThanhComponent } from './tinh-thanh.component';
import { TinhThanhDetailComponent } from './tinh-thanh-detail.component';
import { TinhThanhUpdateComponent } from './tinh-thanh-update.component';
import { TinhThanhDeletePopupComponent } from './tinh-thanh-delete-dialog.component';
import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';

@Injectable({ providedIn: 'root' })
export class TinhThanhResolve implements Resolve<ITinhThanh> {
    constructor(private service: TinhThanhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TinhThanh> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TinhThanh>) => response.ok),
                map((tinhThanh: HttpResponse<TinhThanh>) => tinhThanh.body)
            );
        }
        return of(new TinhThanh());
    }
}

export const tinhThanhRoute: Routes = [
    {
        path: 'tinh-thanh',
        component: TinhThanhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhThanh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-thanh/:id/view',
        component: TinhThanhDetailComponent,
        resolve: {
            tinhThanh: TinhThanhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhThanh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-thanh/new',
        component: TinhThanhUpdateComponent,
        resolve: {
            tinhThanh: TinhThanhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhThanh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-thanh/:id/edit',
        component: TinhThanhUpdateComponent,
        resolve: {
            tinhThanh: TinhThanhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhThanh.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tinhThanhPopupRoute: Routes = [
    {
        path: 'tinh-thanh/:id/delete',
        component: TinhThanhDeletePopupComponent,
        resolve: {
            tinhThanh: TinhThanhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhThanh.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
