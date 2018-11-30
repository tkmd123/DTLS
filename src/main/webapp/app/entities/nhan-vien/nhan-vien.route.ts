import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from './nhan-vien.service';
import { NhanVienComponent } from './nhan-vien.component';
import { NhanVienDetailComponent } from './nhan-vien-detail.component';
import { NhanVienUpdateComponent } from './nhan-vien-update.component';
import { NhanVienDeletePopupComponent } from './nhan-vien-delete-dialog.component';
import { INhanVien } from 'app/shared/model/nhan-vien.model';

@Injectable({ providedIn: 'root' })
export class NhanVienResolve implements Resolve<INhanVien> {
    constructor(private service: NhanVienService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NhanVien> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NhanVien>) => response.ok),
                map((nhanVien: HttpResponse<NhanVien>) => nhanVien.body)
            );
        }
        return of(new NhanVien());
    }
}

export const nhanVienRoute: Routes = [
    {
        path: 'nhan-vien',
        component: NhanVienComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanVien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-vien/:id/view',
        component: NhanVienDetailComponent,
        resolve: {
            nhanVien: NhanVienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanVien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-vien/new',
        component: NhanVienUpdateComponent,
        resolve: {
            nhanVien: NhanVienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanVien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nhan-vien/:id/edit',
        component: NhanVienUpdateComponent,
        resolve: {
            nhanVien: NhanVienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanVien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nhanVienPopupRoute: Routes = [
    {
        path: 'nhan-vien/:id/delete',
        component: NhanVienDeletePopupComponent,
        resolve: {
            nhanVien: NhanVienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nhanVien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
