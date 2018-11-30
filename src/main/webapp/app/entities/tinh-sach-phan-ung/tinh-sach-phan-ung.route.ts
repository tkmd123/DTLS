import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';
import { TinhSachPhanUngService } from './tinh-sach-phan-ung.service';
import { TinhSachPhanUngComponent } from './tinh-sach-phan-ung.component';
import { TinhSachPhanUngDetailComponent } from './tinh-sach-phan-ung-detail.component';
import { TinhSachPhanUngUpdateComponent } from './tinh-sach-phan-ung-update.component';
import { TinhSachPhanUngDeletePopupComponent } from './tinh-sach-phan-ung-delete-dialog.component';
import { ITinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';

@Injectable({ providedIn: 'root' })
export class TinhSachPhanUngResolve implements Resolve<ITinhSachPhanUng> {
    constructor(private service: TinhSachPhanUngService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TinhSachPhanUng> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TinhSachPhanUng>) => response.ok),
                map((tinhSachPhanUng: HttpResponse<TinhSachPhanUng>) => tinhSachPhanUng.body)
            );
        }
        return of(new TinhSachPhanUng());
    }
}

export const tinhSachPhanUngRoute: Routes = [
    {
        path: 'tinh-sach-phan-ung',
        component: TinhSachPhanUngComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSachPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-sach-phan-ung/:id/view',
        component: TinhSachPhanUngDetailComponent,
        resolve: {
            tinhSachPhanUng: TinhSachPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSachPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-sach-phan-ung/new',
        component: TinhSachPhanUngUpdateComponent,
        resolve: {
            tinhSachPhanUng: TinhSachPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSachPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-sach-phan-ung/:id/edit',
        component: TinhSachPhanUngUpdateComponent,
        resolve: {
            tinhSachPhanUng: TinhSachPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSachPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tinhSachPhanUngPopupRoute: Routes = [
    {
        path: 'tinh-sach-phan-ung/:id/delete',
        component: TinhSachPhanUngDeletePopupComponent,
        resolve: {
            tinhSachPhanUng: TinhSachPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSachPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
