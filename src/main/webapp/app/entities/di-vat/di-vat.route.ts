import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DiVat } from 'app/shared/model/di-vat.model';
import { DiVatService } from './di-vat.service';
import { DiVatComponent } from './di-vat.component';
import { DiVatDetailComponent } from './di-vat-detail.component';
import { DiVatUpdateComponent } from './di-vat-update.component';
import { DiVatDeletePopupComponent } from './di-vat-delete-dialog.component';
import { IDiVat } from 'app/shared/model/di-vat.model';

@Injectable({ providedIn: 'root' })
export class DiVatResolve implements Resolve<IDiVat> {
    constructor(private service: DiVatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiVat> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DiVat>) => response.ok),
                map((diVat: HttpResponse<DiVat>) => diVat.body)
            );
        }
        return of(new DiVat());
    }
}

export const diVatRoute: Routes = [
    {
        path: 'di-vat',
        component: DiVatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'di-vat/:id/view',
        component: DiVatDetailComponent,
        resolve: {
            diVat: DiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'di-vat/new',
        component: DiVatUpdateComponent,
        resolve: {
            diVat: DiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'di-vat/:id/edit',
        component: DiVatUpdateComponent,
        resolve: {
            diVat: DiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diVat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diVatPopupRoute: Routes = [
    {
        path: 'di-vat/:id/delete',
        component: DiVatDeletePopupComponent,
        resolve: {
            diVat: DiVatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diVat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
