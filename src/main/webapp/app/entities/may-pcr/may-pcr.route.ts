import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MayPCR } from 'app/shared/model/may-pcr.model';
import { MayPCRService } from './may-pcr.service';
import { MayPCRComponent } from './may-pcr.component';
import { MayPCRDetailComponent } from './may-pcr-detail.component';
import { MayPCRUpdateComponent } from './may-pcr-update.component';
import { MayPCRDeletePopupComponent } from './may-pcr-delete-dialog.component';
import { IMayPCR } from 'app/shared/model/may-pcr.model';

@Injectable({ providedIn: 'root' })
export class MayPCRResolve implements Resolve<IMayPCR> {
    constructor(private service: MayPCRService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MayPCR> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MayPCR>) => response.ok),
                map((mayPCR: HttpResponse<MayPCR>) => mayPCR.body)
            );
        }
        return of(new MayPCR());
    }
}

export const mayPCRRoute: Routes = [
    {
        path: 'may-pcr',
        component: MayPCRComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mayPCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'may-pcr/:id/view',
        component: MayPCRDetailComponent,
        resolve: {
            mayPCR: MayPCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mayPCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'may-pcr/new',
        component: MayPCRUpdateComponent,
        resolve: {
            mayPCR: MayPCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mayPCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'may-pcr/:id/edit',
        component: MayPCRUpdateComponent,
        resolve: {
            mayPCR: MayPCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mayPCR.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mayPCRPopupRoute: Routes = [
    {
        path: 'may-pcr/:id/delete',
        component: MayPCRDeletePopupComponent,
        resolve: {
            mayPCR: MayPCRResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mayPCR.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
