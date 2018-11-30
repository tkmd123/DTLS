import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';
import { PCRPhanUngService } from './pcr-phan-ung.service';
import { PCRPhanUngComponent } from './pcr-phan-ung.component';
import { PCRPhanUngDetailComponent } from './pcr-phan-ung-detail.component';
import { PCRPhanUngUpdateComponent } from './pcr-phan-ung-update.component';
import { PCRPhanUngDeletePopupComponent } from './pcr-phan-ung-delete-dialog.component';
import { IPCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';

@Injectable({ providedIn: 'root' })
export class PCRPhanUngResolve implements Resolve<IPCRPhanUng> {
    constructor(private service: PCRPhanUngService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PCRPhanUng> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PCRPhanUng>) => response.ok),
                map((pCRPhanUng: HttpResponse<PCRPhanUng>) => pCRPhanUng.body)
            );
        }
        return of(new PCRPhanUng());
    }
}

export const pCRPhanUngRoute: Routes = [
    {
        path: 'pcr-phan-ung',
        component: PCRPhanUngComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-phan-ung/:id/view',
        component: PCRPhanUngDetailComponent,
        resolve: {
            pCRPhanUng: PCRPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-phan-ung/new',
        component: PCRPhanUngUpdateComponent,
        resolve: {
            pCRPhanUng: PCRPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-phan-ung/:id/edit',
        component: PCRPhanUngUpdateComponent,
        resolve: {
            pCRPhanUng: PCRPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pCRPhanUngPopupRoute: Routes = [
    {
        path: 'pcr-phan-ung/:id/delete',
        component: PCRPhanUngDeletePopupComponent,
        resolve: {
            pCRPhanUng: PCRPhanUngResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRPhanUng.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
