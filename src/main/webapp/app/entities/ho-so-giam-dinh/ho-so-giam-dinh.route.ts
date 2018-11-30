import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';
import { HoSoGiamDinhService } from './ho-so-giam-dinh.service';
import { HoSoGiamDinhComponent } from './ho-so-giam-dinh.component';
import { HoSoGiamDinhDetailComponent } from './ho-so-giam-dinh-detail.component';
import { HoSoGiamDinhUpdateComponent } from './ho-so-giam-dinh-update.component';
import { HoSoGiamDinhDeletePopupComponent } from './ho-so-giam-dinh-delete-dialog.component';
import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';

@Injectable({ providedIn: 'root' })
export class HoSoGiamDinhResolve implements Resolve<IHoSoGiamDinh> {
    constructor(private service: HoSoGiamDinhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HoSoGiamDinh> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HoSoGiamDinh>) => response.ok),
                map((hoSoGiamDinh: HttpResponse<HoSoGiamDinh>) => hoSoGiamDinh.body)
            );
        }
        return of(new HoSoGiamDinh());
    }
}

export const hoSoGiamDinhRoute: Routes = [
    {
        path: 'ho-so-giam-dinh',
        component: HoSoGiamDinhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoGiamDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-giam-dinh/:id/view',
        component: HoSoGiamDinhDetailComponent,
        resolve: {
            hoSoGiamDinh: HoSoGiamDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoGiamDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-giam-dinh/new',
        component: HoSoGiamDinhUpdateComponent,
        resolve: {
            hoSoGiamDinh: HoSoGiamDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoGiamDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ho-so-giam-dinh/:id/edit',
        component: HoSoGiamDinhUpdateComponent,
        resolve: {
            hoSoGiamDinh: HoSoGiamDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoGiamDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoSoGiamDinhPopupRoute: Routes = [
    {
        path: 'ho-so-giam-dinh/:id/delete',
        component: HoSoGiamDinhDeletePopupComponent,
        resolve: {
            hoSoGiamDinh: HoSoGiamDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoSoGiamDinh.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
