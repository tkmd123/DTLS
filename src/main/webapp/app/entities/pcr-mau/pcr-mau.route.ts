import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PCRMau } from 'app/shared/model/pcr-mau.model';
import { PCRMauService } from './pcr-mau.service';
import { PCRMauComponent } from './pcr-mau.component';
import { PCRMauDetailComponent } from './pcr-mau-detail.component';
import { PCRMauUpdateComponent } from './pcr-mau-update.component';
import { PCRMauDeletePopupComponent } from './pcr-mau-delete-dialog.component';
import { IPCRMau } from 'app/shared/model/pcr-mau.model';

@Injectable({ providedIn: 'root' })
export class PCRMauResolve implements Resolve<IPCRMau> {
    constructor(private service: PCRMauService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PCRMau> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PCRMau>) => response.ok),
                map((pCRMau: HttpResponse<PCRMau>) => pCRMau.body)
            );
        }
        return of(new PCRMau());
    }
}

export const pCRMauRoute: Routes = [
    {
        path: 'pcr-mau',
        component: PCRMauComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMau.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-mau/:id/view',
        component: PCRMauDetailComponent,
        resolve: {
            pCRMau: PCRMauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMau.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-mau/new',
        component: PCRMauUpdateComponent,
        resolve: {
            pCRMau: PCRMauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMau.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-mau/:id/edit',
        component: PCRMauUpdateComponent,
        resolve: {
            pCRMau: PCRMauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMau.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pCRMauPopupRoute: Routes = [
    {
        path: 'pcr-mau/:id/delete',
        component: PCRMauDeletePopupComponent,
        resolve: {
            pCRMau: PCRMauResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRMau.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
