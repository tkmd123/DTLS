import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DonVi } from 'app/shared/model/don-vi.model';
import { DonViService } from './don-vi.service';
import { DonViComponent } from './don-vi.component';
import { DonViDetailComponent } from './don-vi-detail.component';
import { DonViUpdateComponent } from './don-vi-update.component';
import { DonViDeletePopupComponent } from './don-vi-delete-dialog.component';
import { IDonVi } from 'app/shared/model/don-vi.model';

@Injectable({ providedIn: 'root' })
export class DonViResolve implements Resolve<IDonVi> {
    constructor(private service: DonViService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DonVi> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DonVi>) => response.ok),
                map((donVi: HttpResponse<DonVi>) => donVi.body)
            );
        }
        return of(new DonVi());
    }
}

export const donViRoute: Routes = [
    {
        path: 'don-vi',
        component: DonViComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donVi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'don-vi/:id/view',
        component: DonViDetailComponent,
        resolve: {
            donVi: DonViResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donVi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'don-vi/new',
        component: DonViUpdateComponent,
        resolve: {
            donVi: DonViResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donVi.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'don-vi/:id/edit',
        component: DonViUpdateComponent,
        resolve: {
            donVi: DonViResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donVi.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const donViPopupRoute: Routes = [
    {
        path: 'don-vi/:id/delete',
        component: DonViDeletePopupComponent,
        resolve: {
            donVi: DonViResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.donVi.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
