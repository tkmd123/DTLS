import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PhuongXa } from 'app/shared/model/phuong-xa.model';
import { PhuongXaService } from './phuong-xa.service';
import { PhuongXaComponent } from './phuong-xa.component';
import { PhuongXaDetailComponent } from './phuong-xa-detail.component';
import { PhuongXaUpdateComponent } from './phuong-xa-update.component';
import { PhuongXaDeletePopupComponent } from './phuong-xa-delete-dialog.component';
import { IPhuongXa } from 'app/shared/model/phuong-xa.model';

@Injectable({ providedIn: 'root' })
export class PhuongXaResolve implements Resolve<IPhuongXa> {
    constructor(private service: PhuongXaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PhuongXa> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PhuongXa>) => response.ok),
                map((phuongXa: HttpResponse<PhuongXa>) => phuongXa.body)
            );
        }
        return of(new PhuongXa());
    }
}

export const phuongXaRoute: Routes = [
    {
        path: 'phuong-xa',
        component: PhuongXaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phuongXa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phuong-xa/:id/view',
        component: PhuongXaDetailComponent,
        resolve: {
            phuongXa: PhuongXaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phuongXa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phuong-xa/new',
        component: PhuongXaUpdateComponent,
        resolve: {
            phuongXa: PhuongXaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phuongXa.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phuong-xa/:id/edit',
        component: PhuongXaUpdateComponent,
        resolve: {
            phuongXa: PhuongXaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phuongXa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phuongXaPopupRoute: Routes = [
    {
        path: 'phuong-xa/:id/delete',
        component: PhuongXaDeletePopupComponent,
        resolve: {
            phuongXa: PhuongXaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phuongXa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
