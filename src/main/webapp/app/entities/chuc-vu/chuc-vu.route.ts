import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ChucVu } from 'app/shared/model/chuc-vu.model';
import { ChucVuService } from './chuc-vu.service';
import { ChucVuComponent } from './chuc-vu.component';
import { ChucVuDetailComponent } from './chuc-vu-detail.component';
import { ChucVuUpdateComponent } from './chuc-vu-update.component';
import { ChucVuDeletePopupComponent } from './chuc-vu-delete-dialog.component';
import { IChucVu } from 'app/shared/model/chuc-vu.model';

@Injectable({ providedIn: 'root' })
export class ChucVuResolve implements Resolve<IChucVu> {
    constructor(private service: ChucVuService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ChucVu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ChucVu>) => response.ok),
                map((chucVu: HttpResponse<ChucVu>) => chucVu.body)
            );
        }
        return of(new ChucVu());
    }
}

export const chucVuRoute: Routes = [
    {
        path: 'chuc-vu',
        component: ChucVuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.chucVu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chuc-vu/:id/view',
        component: ChucVuDetailComponent,
        resolve: {
            chucVu: ChucVuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.chucVu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chuc-vu/new',
        component: ChucVuUpdateComponent,
        resolve: {
            chucVu: ChucVuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.chucVu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chuc-vu/:id/edit',
        component: ChucVuUpdateComponent,
        resolve: {
            chucVu: ChucVuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.chucVu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chucVuPopupRoute: Routes = [
    {
        path: 'chuc-vu/:id/delete',
        component: ChucVuDeletePopupComponent,
        resolve: {
            chucVu: ChucVuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.chucVu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
