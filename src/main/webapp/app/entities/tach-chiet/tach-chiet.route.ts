import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TachChiet } from 'app/shared/model/tach-chiet.model';
import { TachChietService } from './tach-chiet.service';
import { TachChietComponent } from './tach-chiet.component';
import { TachChietDetailComponent } from './tach-chiet-detail.component';
import { TachChietUpdateComponent } from './tach-chiet-update.component';
import { TachChietDeletePopupComponent } from './tach-chiet-delete-dialog.component';
import { ITachChiet } from 'app/shared/model/tach-chiet.model';

@Injectable({ providedIn: 'root' })
export class TachChietResolve implements Resolve<ITachChiet> {
    constructor(private service: TachChietService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TachChiet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TachChiet>) => response.ok),
                map((tachChiet: HttpResponse<TachChiet>) => tachChiet.body)
            );
        }
        return of(new TachChiet());
    }
}

export const tachChietRoute: Routes = [
    {
        path: 'tach-chiet',
        component: TachChietComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tach-chiet/:id/view',
        component: TachChietDetailComponent,
        resolve: {
            tachChiet: TachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tach-chiet/new',
        component: TachChietUpdateComponent,
        resolve: {
            tachChiet: TachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tach-chiet/:id/edit',
        component: TachChietUpdateComponent,
        resolve: {
            tachChiet: TachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tachChietPopupRoute: Routes = [
    {
        path: 'tach-chiet/:id/delete',
        component: TachChietDeletePopupComponent,
        resolve: {
            tachChiet: TachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tachChiet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
