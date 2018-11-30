import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';
import { ThanNhanLietSiService } from './than-nhan-liet-si.service';
import { ThanNhanLietSiComponent } from './than-nhan-liet-si.component';
import { ThanNhanLietSiDetailComponent } from './than-nhan-liet-si-detail.component';
import { ThanNhanLietSiUpdateComponent } from './than-nhan-liet-si-update.component';
import { ThanNhanLietSiDeletePopupComponent } from './than-nhan-liet-si-delete-dialog.component';
import { IThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';

@Injectable({ providedIn: 'root' })
export class ThanNhanLietSiResolve implements Resolve<IThanNhanLietSi> {
    constructor(private service: ThanNhanLietSiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThanNhanLietSi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThanNhanLietSi>) => response.ok),
                map((thanNhanLietSi: HttpResponse<ThanNhanLietSi>) => thanNhanLietSi.body)
            );
        }
        return of(new ThanNhanLietSi());
    }
}

export const thanNhanLietSiRoute: Routes = [
    {
        path: 'than-nhan-liet-si',
        component: ThanNhanLietSiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thanNhanLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'than-nhan-liet-si/:id/view',
        component: ThanNhanLietSiDetailComponent,
        resolve: {
            thanNhanLietSi: ThanNhanLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thanNhanLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'than-nhan-liet-si/new',
        component: ThanNhanLietSiUpdateComponent,
        resolve: {
            thanNhanLietSi: ThanNhanLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thanNhanLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'than-nhan-liet-si/:id/edit',
        component: ThanNhanLietSiUpdateComponent,
        resolve: {
            thanNhanLietSi: ThanNhanLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thanNhanLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thanNhanLietSiPopupRoute: Routes = [
    {
        path: 'than-nhan-liet-si/:id/delete',
        component: ThanNhanLietSiDeletePopupComponent,
        resolve: {
            thanNhanLietSi: ThanNhanLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thanNhanLietSi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
