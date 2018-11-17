import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';
import { HaiCotLietSiService } from './hai-cot-liet-si.service';
import { HaiCotLietSiComponent } from './hai-cot-liet-si.component';
import { HaiCotLietSiDetailComponent } from './hai-cot-liet-si-detail.component';
import { HaiCotLietSiUpdateComponent } from './hai-cot-liet-si-update.component';
import { HaiCotLietSiDeletePopupComponent } from './hai-cot-liet-si-delete-dialog.component';
import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';

@Injectable({ providedIn: 'root' })
export class HaiCotLietSiResolve implements Resolve<IHaiCotLietSi> {
    constructor(private service: HaiCotLietSiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HaiCotLietSi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HaiCotLietSi>) => response.ok),
                map((haiCotLietSi: HttpResponse<HaiCotLietSi>) => haiCotLietSi.body)
            );
        }
        return of(new HaiCotLietSi());
    }
}

export const haiCotLietSiRoute: Routes = [
    {
        path: 'hai-cot-liet-si',
        component: HaiCotLietSiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.haiCotLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hai-cot-liet-si/:id/view',
        component: HaiCotLietSiDetailComponent,
        resolve: {
            haiCotLietSi: HaiCotLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.haiCotLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hai-cot-liet-si/new',
        component: HaiCotLietSiUpdateComponent,
        resolve: {
            haiCotLietSi: HaiCotLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.haiCotLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hai-cot-liet-si/:id/edit',
        component: HaiCotLietSiUpdateComponent,
        resolve: {
            haiCotLietSi: HaiCotLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.haiCotLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const haiCotLietSiPopupRoute: Routes = [
    {
        path: 'hai-cot-liet-si/:id/delete',
        component: HaiCotLietSiDeletePopupComponent,
        resolve: {
            haiCotLietSi: HaiCotLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.haiCotLietSi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
