import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PCRMoi } from 'app/shared/model/pcr-moi.model';
import { PCRMoiService } from './pcr-moi.service';
import { PCRMoiComponent } from './pcr-moi.component';
import { PCRMoiDetailComponent } from './pcr-moi-detail.component';
import { PCRMoiUpdateComponent } from './pcr-moi-update.component';
import { PCRMoiDeletePopupComponent } from './pcr-moi-delete-dialog.component';
import { IPCRMoi } from 'app/shared/model/pcr-moi.model';

@Injectable({ providedIn: 'root' })
export class PCRMoiResolve implements Resolve<IPCRMoi> {
    constructor(private service: PCRMoiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PCRMoi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PCRMoi>) => response.ok),
                map((pCRMoi: HttpResponse<PCRMoi>) => pCRMoi.body)
            );
        }
        return of(new PCRMoi());
    }
}

export const pCRMoiRoute: Routes = [
    {
        path: 'pcr-moi',
        component: PCRMoiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMoi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-moi/:id/view',
        component: PCRMoiDetailComponent,
        resolve: {
            pCRMoi: PCRMoiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMoi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-moi/new',
        component: PCRMoiUpdateComponent,
        resolve: {
            pCRMoi: PCRMoiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMoi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-moi/:id/edit',
        component: PCRMoiUpdateComponent,
        resolve: {
            pCRMoi: PCRMoiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMoi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pCRMoiPopupRoute: Routes = [
    {
        path: 'pcr-moi/:id/delete',
        component: PCRMoiDeletePopupComponent,
        resolve: {
            pCRMoi: PCRMoiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMoi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
