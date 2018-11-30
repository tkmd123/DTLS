import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PCRKetQua } from 'app/shared/model/pcr-ket-qua.model';
import { PCRKetQuaService } from './pcr-ket-qua.service';
import { PCRKetQuaComponent } from './pcr-ket-qua.component';
import { PCRKetQuaDetailComponent } from './pcr-ket-qua-detail.component';
import { PCRKetQuaUpdateComponent } from './pcr-ket-qua-update.component';
import { PCRKetQuaDeletePopupComponent } from './pcr-ket-qua-delete-dialog.component';
import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';

@Injectable({ providedIn: 'root' })
export class PCRKetQuaResolve implements Resolve<IPCRKetQua> {
    constructor(private service: PCRKetQuaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PCRKetQua> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PCRKetQua>) => response.ok),
                map((pCRKetQua: HttpResponse<PCRKetQua>) => pCRKetQua.body)
            );
        }
        return of(new PCRKetQua());
    }
}

export const pCRKetQuaRoute: Routes = [
    {
        path: 'pcr-ket-qua',
        component: PCRKetQuaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRKetQua.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-ket-qua/:id/view',
        component: PCRKetQuaDetailComponent,
        resolve: {
            pCRKetQua: PCRKetQuaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRKetQua.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-ket-qua/new',
        component: PCRKetQuaUpdateComponent,
        resolve: {
            pCRKetQua: PCRKetQuaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRKetQua.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pcr-ket-qua/:id/edit',
        component: PCRKetQuaUpdateComponent,
        resolve: {
            pCRKetQua: PCRKetQuaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRKetQua.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pCRKetQuaPopupRoute: Routes = [
    {
        path: 'pcr-ket-qua/:id/delete',
        component: PCRKetQuaDeletePopupComponent,
        resolve: {
            pCRKetQua: PCRKetQuaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.pCRKetQua.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
