import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NhanDang } from 'app/shared/model/nhan-dang.model';
import { NhanDangService } from './nhan-dang.service';
import { NhanDangComponent } from './nhan-dang.component';
import { NhanDangDetailComponent } from './nhan-dang-detail.component';
import { NhanDangUpdateComponent } from './nhan-dang-update.component';
import { NhanDangDeletePopupComponent } from './nhan-dang-delete-dialog.component';
import { INhanDang } from 'app/shared/model/nhan-dang.model';

@Injectable({ providedIn: 'root' })
export class NhanDangResolve implements Resolve<INhanDang> {
    constructor(private service: NhanDangService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NhanDang> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NhanDang>) => response.ok),
                map((nhanDang: HttpResponse<NhanDang>) => nhanDang.body)
            );
        }
        return of(new NhanDang());
    }
}

export const nhanDangRoute: Routes = [
    {
        path: 'nhan-dang',
        component: NhanDangComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDang.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-dang/:id/view',
        component: NhanDangDetailComponent,
        resolve: {
            nhanDang: NhanDangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDang.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-dang/new',
        component: NhanDangUpdateComponent,
        resolve: {
            nhanDang: NhanDangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDang.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-dang/:id/edit',
        component: NhanDangUpdateComponent,
        resolve: {
            nhanDang: NhanDangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDang.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nhanDangPopupRoute: Routes = [
    {
        path: 'nhan-dang/:id/delete',
        component: NhanDangDeletePopupComponent,
        resolve: {
            nhanDang: NhanDangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanDang.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
