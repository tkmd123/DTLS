import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';
import { HoSoThanNhanService } from './ho-so-than-nhan.service';
import { HoSoThanNhanComponent } from './ho-so-than-nhan.component';
import { HoSoThanNhanDetailComponent } from './ho-so-than-nhan-detail.component';
import { HoSoThanNhanUpdateComponent } from './ho-so-than-nhan-update.component';
import { HoSoThanNhanDeletePopupComponent } from './ho-so-than-nhan-delete-dialog.component';
import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';

@Injectable({ providedIn: 'root' })
export class HoSoThanNhanResolve implements Resolve<IHoSoThanNhan> {
    constructor(private service: HoSoThanNhanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HoSoThanNhan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HoSoThanNhan>) => response.ok),
                map((hoSoThanNhan: HttpResponse<HoSoThanNhan>) => hoSoThanNhan.body)
            );
        }
        return of(new HoSoThanNhan());
    }
}

export const hoSoThanNhanRoute: Routes = [
    {
        path: 'ho-so-than-nhan',
        component: HoSoThanNhanComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.hoSoThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-than-nhan/:id/view',
        component: HoSoThanNhanDetailComponent,
        resolve: {
            hoSoThanNhan: HoSoThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-than-nhan/new',
        component: HoSoThanNhanUpdateComponent,
        resolve: {
            hoSoThanNhan: HoSoThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-than-nhan/:id/edit',
        component: HoSoThanNhanUpdateComponent,
        resolve: {
            hoSoThanNhan: HoSoThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoSoThanNhanPopupRoute: Routes = [
    {
        path: 'ho-so-than-nhan/:id/delete',
        component: HoSoThanNhanDeletePopupComponent,
        resolve: {
            hoSoThanNhan: HoSoThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
