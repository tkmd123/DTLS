import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MauTachChiet } from 'app/shared/model/mau-tach-chiet.model';
import { MauTachChietService } from './mau-tach-chiet.service';
import { MauTachChietComponent } from './mau-tach-chiet.component';
import { MauTachChietDetailComponent } from './mau-tach-chiet-detail.component';
import { MauTachChietUpdateComponent } from './mau-tach-chiet-update.component';
import { MauTachChietDeletePopupComponent } from './mau-tach-chiet-delete-dialog.component';
import { IMauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

@Injectable({ providedIn: 'root' })
export class MauTachChietResolve implements Resolve<IMauTachChiet> {
    constructor(private service: MauTachChietService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MauTachChiet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MauTachChiet>) => response.ok),
                map((mauTachChiet: HttpResponse<MauTachChiet>) => mauTachChiet.body)
            );
        }
        return of(new MauTachChiet());
    }
}

export const mauTachChietRoute: Routes = [
    {
        path: 'mau-tach-chiet',
        component: MauTachChietComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mau-tach-chiet/:id/view',
        component: MauTachChietDetailComponent,
        resolve: {
            mauTachChiet: MauTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mau-tach-chiet/new',
        component: MauTachChietUpdateComponent,
        resolve: {
            mauTachChiet: MauTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mau-tach-chiet/:id/edit',
        component: MauTachChietUpdateComponent,
        resolve: {
            mauTachChiet: MauTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mauTachChietPopupRoute: Routes = [
    {
        path: 'mau-tach-chiet/:id/delete',
        component: MauTachChietDeletePopupComponent,
        resolve: {
            mauTachChiet: MauTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mauTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
