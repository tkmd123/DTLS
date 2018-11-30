import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrungTam } from 'app/shared/model/trung-tam.model';
import { TrungTamService } from './trung-tam.service';
import { TrungTamComponent } from './trung-tam.component';
import { TrungTamDetailComponent } from './trung-tam-detail.component';
import { TrungTamUpdateComponent } from './trung-tam-update.component';
import { TrungTamDeletePopupComponent } from './trung-tam-delete-dialog.component';
import { ITrungTam } from 'app/shared/model/trung-tam.model';

@Injectable({ providedIn: 'root' })
export class TrungTamResolve implements Resolve<ITrungTam> {
    constructor(private service: TrungTamService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrungTam> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TrungTam>) => response.ok),
                map((trungTam: HttpResponse<TrungTam>) => trungTam.body)
            );
        }
        return of(new TrungTam());
    }
}

export const trungTamRoute: Routes = [
    {
        path: 'trung-tam',
        component: TrungTamComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.trungTam.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trung-tam/:id/view',
        component: TrungTamDetailComponent,
        resolve: {
            trungTam: TrungTamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.trungTam.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trung-tam/new',
        component: TrungTamUpdateComponent,
        resolve: {
            trungTam: TrungTamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.trungTam.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trung-tam/:id/edit',
        component: TrungTamUpdateComponent,
        resolve: {
            trungTam: TrungTamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.trungTam.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trungTamPopupRoute: Routes = [
    {
        path: 'trung-tam/:id/delete',
        component: TrungTamDeletePopupComponent,
        resolve: {
            trungTam: TrungTamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.trungTam.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
