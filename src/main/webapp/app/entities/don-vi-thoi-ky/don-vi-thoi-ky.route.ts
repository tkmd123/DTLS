import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';
import { DonViThoiKyService } from './don-vi-thoi-ky.service';
import { DonViThoiKyComponent } from './don-vi-thoi-ky.component';
import { DonViThoiKyDetailComponent } from './don-vi-thoi-ky-detail.component';
import { DonViThoiKyUpdateComponent } from './don-vi-thoi-ky-update.component';
import { DonViThoiKyDeletePopupComponent } from './don-vi-thoi-ky-delete-dialog.component';
import { IDonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

@Injectable({ providedIn: 'root' })
export class DonViThoiKyResolve implements Resolve<IDonViThoiKy> {
    constructor(private service: DonViThoiKyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DonViThoiKy> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DonViThoiKy>) => response.ok),
                map((donViThoiKy: HttpResponse<DonViThoiKy>) => donViThoiKy.body)
            );
        }
        return of(new DonViThoiKy());
    }
}

export const donViThoiKyRoute: Routes = [
    {
        path: 'don-vi-thoi-ky',
        component: DonViThoiKyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donViThoiKy.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'don-vi-thoi-ky/:id/view',
        component: DonViThoiKyDetailComponent,
        resolve: {
            donViThoiKy: DonViThoiKyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donViThoiKy.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'don-vi-thoi-ky/new',
        component: DonViThoiKyUpdateComponent,
        resolve: {
            donViThoiKy: DonViThoiKyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donViThoiKy.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'don-vi-thoi-ky/:id/edit',
        component: DonViThoiKyUpdateComponent,
        resolve: {
            donViThoiKy: DonViThoiKyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donViThoiKy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const donViThoiKyPopupRoute: Routes = [
    {
        path: 'don-vi-thoi-ky/:id/delete',
        component: DonViThoiKyDeletePopupComponent,
        resolve: {
            donViThoiKy: DonViThoiKyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donViThoiKy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
