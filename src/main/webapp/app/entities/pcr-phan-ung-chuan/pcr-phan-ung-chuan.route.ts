import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';
import { PCRPhanUngChuanService } from './pcr-phan-ung-chuan.service';
import { PCRPhanUngChuanComponent } from './pcr-phan-ung-chuan.component';
import { PCRPhanUngChuanDetailComponent } from './pcr-phan-ung-chuan-detail.component';
import { PCRPhanUngChuanUpdateComponent } from './pcr-phan-ung-chuan-update.component';
import { PCRPhanUngChuanDeletePopupComponent } from './pcr-phan-ung-chuan-delete-dialog.component';
import { IPCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';

@Injectable({ providedIn: 'root' })
export class PCRPhanUngChuanResolve implements Resolve<IPCRPhanUngChuan> {
    constructor(private service: PCRPhanUngChuanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PCRPhanUngChuan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PCRPhanUngChuan>) => response.ok),
                map((pCRPhanUngChuan: HttpResponse<PCRPhanUngChuan>) => pCRPhanUngChuan.body)
            );
        }
        return of(new PCRPhanUngChuan());
    }
}

export const pCRPhanUngChuanRoute: Routes = [
    {
        path: 'pcr-phan-ung-chuan',
        component: PCRPhanUngChuanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUngChuan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-phan-ung-chuan/:id/view',
        component: PCRPhanUngChuanDetailComponent,
        resolve: {
            pCRPhanUngChuan: PCRPhanUngChuanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUngChuan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-phan-ung-chuan/new',
        component: PCRPhanUngChuanUpdateComponent,
        resolve: {
            pCRPhanUngChuan: PCRPhanUngChuanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUngChuan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-phan-ung-chuan/:id/edit',
        component: PCRPhanUngChuanUpdateComponent,
        resolve: {
            pCRPhanUngChuan: PCRPhanUngChuanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUngChuan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pCRPhanUngChuanPopupRoute: Routes = [
    {
        path: 'pcr-phan-ung-chuan/:id/delete',
        component: PCRPhanUngChuanDeletePopupComponent,
        resolve: {
            pCRPhanUngChuan: PCRPhanUngChuanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUngChuan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
