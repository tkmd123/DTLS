import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';
import { HinhThaiHaiCotService } from './hinh-thai-hai-cot.service';
import { HinhThaiHaiCotComponent } from './hinh-thai-hai-cot.component';
import { HinhThaiHaiCotDetailComponent } from './hinh-thai-hai-cot-detail.component';
import { HinhThaiHaiCotUpdateComponent } from './hinh-thai-hai-cot-update.component';
import { HinhThaiHaiCotDeletePopupComponent } from './hinh-thai-hai-cot-delete-dialog.component';
import { IHinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';

@Injectable({ providedIn: 'root' })
export class HinhThaiHaiCotResolve implements Resolve<IHinhThaiHaiCot> {
    constructor(private service: HinhThaiHaiCotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HinhThaiHaiCot> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HinhThaiHaiCot>) => response.ok),
                map((hinhThaiHaiCot: HttpResponse<HinhThaiHaiCot>) => hinhThaiHaiCot.body)
            );
        }
        return of(new HinhThaiHaiCot());
    }
}

export const hinhThaiHaiCotRoute: Routes = [
    {
        path: 'hinh-thai-hai-cot',
        component: HinhThaiHaiCotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hinh-thai-hai-cot/:id/view',
        component: HinhThaiHaiCotDetailComponent,
        resolve: {
            hinhThaiHaiCot: HinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hinh-thai-hai-cot/new',
        component: HinhThaiHaiCotUpdateComponent,
        resolve: {
            hinhThaiHaiCot: HinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hinh-thai-hai-cot/:id/edit',
        component: HinhThaiHaiCotUpdateComponent,
        resolve: {
            hinhThaiHaiCot: HinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hinhThaiHaiCotPopupRoute: Routes = [
    {
        path: 'hinh-thai-hai-cot/:id/delete',
        component: HinhThaiHaiCotDeletePopupComponent,
        resolve: {
            hinhThaiHaiCot: HinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
