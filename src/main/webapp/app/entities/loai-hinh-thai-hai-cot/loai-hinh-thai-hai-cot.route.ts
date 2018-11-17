import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';
import { LoaiHinhThaiHaiCotService } from './loai-hinh-thai-hai-cot.service';
import { LoaiHinhThaiHaiCotComponent } from './loai-hinh-thai-hai-cot.component';
import { LoaiHinhThaiHaiCotDetailComponent } from './loai-hinh-thai-hai-cot-detail.component';
import { LoaiHinhThaiHaiCotUpdateComponent } from './loai-hinh-thai-hai-cot-update.component';
import { LoaiHinhThaiHaiCotDeletePopupComponent } from './loai-hinh-thai-hai-cot-delete-dialog.component';
import { ILoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

@Injectable({ providedIn: 'root' })
export class LoaiHinhThaiHaiCotResolve implements Resolve<ILoaiHinhThaiHaiCot> {
    constructor(private service: LoaiHinhThaiHaiCotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoaiHinhThaiHaiCot> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LoaiHinhThaiHaiCot>) => response.ok),
                map((loaiHinhThaiHaiCot: HttpResponse<LoaiHinhThaiHaiCot>) => loaiHinhThaiHaiCot.body)
            );
        }
        return of(new LoaiHinhThaiHaiCot());
    }
}

export const loaiHinhThaiHaiCotRoute: Routes = [
    {
        path: 'loai-hinh-thai-hai-cot',
        component: LoaiHinhThaiHaiCotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiHinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-hinh-thai-hai-cot/:id/view',
        component: LoaiHinhThaiHaiCotDetailComponent,
        resolve: {
            loaiHinhThaiHaiCot: LoaiHinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiHinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-hinh-thai-hai-cot/new',
        component: LoaiHinhThaiHaiCotUpdateComponent,
        resolve: {
            loaiHinhThaiHaiCot: LoaiHinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiHinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-hinh-thai-hai-cot/:id/edit',
        component: LoaiHinhThaiHaiCotUpdateComponent,
        resolve: {
            loaiHinhThaiHaiCot: LoaiHinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiHinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loaiHinhThaiHaiCotPopupRoute: Routes = [
    {
        path: 'loai-hinh-thai-hai-cot/:id/delete',
        component: LoaiHinhThaiHaiCotDeletePopupComponent,
        resolve: {
            loaiHinhThaiHaiCot: LoaiHinhThaiHaiCotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiHinhThaiHaiCot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
