import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from './ho-so-liet-si.service';
import { HoSoLietSiComponent } from './ho-so-liet-si.component';
import { HoSoLietSiDetailComponent } from './ho-so-liet-si-detail.component';
import { HoSoLietSiUpdateComponent } from './ho-so-liet-si-update.component';
import { HoSoLietSiDeletePopupComponent } from './ho-so-liet-si-delete-dialog.component';
import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';

@Injectable({ providedIn: 'root' })
export class HoSoLietSiResolve implements Resolve<IHoSoLietSi> {
    constructor(private service: HoSoLietSiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HoSoLietSi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HoSoLietSi>) => response.ok),
                map((hoSoLietSi: HttpResponse<HoSoLietSi>) => hoSoLietSi.body)
            );
        }
        return of(new HoSoLietSi());
    }
}

export const hoSoLietSiRoute: Routes = [
    {
        path: 'ho-so-liet-si',
        component: HoSoLietSiComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.hoSoLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-liet-si/:id/view',
        component: HoSoLietSiDetailComponent,
        resolve: {
            hoSoLietSi: HoSoLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-liet-si/new',
        component: HoSoLietSiUpdateComponent,
        resolve: {
            hoSoLietSi: HoSoLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-liet-si/:id/edit',
        component: HoSoLietSiUpdateComponent,
        resolve: {
            hoSoLietSi: HoSoLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoSoLietSiPopupRoute: Routes = [
    {
        path: 'ho-so-liet-si/:id/delete',
        component: HoSoLietSiDeletePopupComponent,
        resolve: {
            hoSoLietSi: HoSoLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoLietSi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
