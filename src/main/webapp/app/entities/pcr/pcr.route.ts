import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PCR } from 'app/shared/model/pcr.model';
import { PCRService } from './pcr.service';
import { PCRComponent } from './pcr.component';
import { PCRDetailComponent } from './pcr-detail.component';
import { PCRUpdateComponent } from './pcr-update.component';
import { PCRDeletePopupComponent } from './pcr-delete-dialog.component';
import { IPCR } from 'app/shared/model/pcr.model';

@Injectable({ providedIn: 'root' })
export class PCRResolve implements Resolve<IPCR> {
    constructor(private service: PCRService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PCR> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PCR>) => response.ok),
                map((pCR: HttpResponse<PCR>) => pCR.body)
            );
        }
        return of(new PCR());
    }
}

export const pCRRoute: Routes = [
    {
        path: 'pcr',
        component: PCRComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr/:id/view',
        component: PCRDetailComponent,
        resolve: {
            pCR: PCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr/new',
        component: PCRUpdateComponent,
        resolve: {
            pCR: PCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr/:id/edit',
        component: PCRUpdateComponent,
        resolve: {
            pCR: PCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pCRPopupRoute: Routes = [
    {
        path: 'pcr/:id/delete',
        component: PCRDeletePopupComponent,
        resolve: {
            pCR: PCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCR.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
