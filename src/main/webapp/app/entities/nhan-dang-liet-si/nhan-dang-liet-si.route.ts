import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';
import { NhanDangLietSiService } from './nhan-dang-liet-si.service';
import { NhanDangLietSiComponent } from './nhan-dang-liet-si.component';
import { NhanDangLietSiDetailComponent } from './nhan-dang-liet-si-detail.component';
import { NhanDangLietSiUpdateComponent } from './nhan-dang-liet-si-update.component';
import { NhanDangLietSiDeletePopupComponent } from './nhan-dang-liet-si-delete-dialog.component';
import { INhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';

@Injectable({ providedIn: 'root' })
export class NhanDangLietSiResolve implements Resolve<INhanDangLietSi> {
    constructor(private service: NhanDangLietSiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NhanDangLietSi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NhanDangLietSi>) => response.ok),
                map((nhanDangLietSi: HttpResponse<NhanDangLietSi>) => nhanDangLietSi.body)
            );
        }
        return of(new NhanDangLietSi());
    }
}

export const nhanDangLietSiRoute: Routes = [
    {
        path: 'nhan-dang-liet-si',
        component: NhanDangLietSiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDangLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-dang-liet-si/:id/view',
        component: NhanDangLietSiDetailComponent,
        resolve: {
            nhanDangLietSi: NhanDangLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDangLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-dang-liet-si/new',
        component: NhanDangLietSiUpdateComponent,
        resolve: {
            nhanDangLietSi: NhanDangLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDangLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-dang-liet-si/:id/edit',
        component: NhanDangLietSiUpdateComponent,
        resolve: {
            nhanDangLietSi: NhanDangLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDangLietSi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nhanDangLietSiPopupRoute: Routes = [
    {
        path: 'nhan-dang-liet-si/:id/delete',
        component: NhanDangLietSiDeletePopupComponent,
        resolve: {
            nhanDangLietSi: NhanDangLietSiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDangLietSi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
