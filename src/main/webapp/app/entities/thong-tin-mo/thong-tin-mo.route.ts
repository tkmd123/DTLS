import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThongTinMo } from 'app/shared/model/thong-tin-mo.model';
import { ThongTinMoService } from './thong-tin-mo.service';
import { ThongTinMoComponent } from './thong-tin-mo.component';
import { ThongTinMoDetailComponent } from './thong-tin-mo-detail.component';
import { ThongTinMoUpdateComponent } from './thong-tin-mo-update.component';
import { ThongTinMoDeletePopupComponent } from './thong-tin-mo-delete-dialog.component';
import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';

@Injectable({ providedIn: 'root' })
export class ThongTinMoResolve implements Resolve<IThongTinMo> {
    constructor(private service: ThongTinMoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThongTinMo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThongTinMo>) => response.ok),
                map((thongTinMo: HttpResponse<ThongTinMo>) => thongTinMo.body)
            );
        }
        return of(new ThongTinMo());
    }
}

export const thongTinMoRoute: Routes = [
    {
        path: 'thong-tin-mo',
        component: ThongTinMoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.thongTinMo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-mo/:id/view',
        component: ThongTinMoDetailComponent,
        resolve: {
            thongTinMo: ThongTinMoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinMo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-mo/new',
        component: ThongTinMoUpdateComponent,
        resolve: {
            thongTinMo: ThongTinMoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinMo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-mo/:id/edit',
        component: ThongTinMoUpdateComponent,
        resolve: {
            thongTinMo: ThongTinMoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinMo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thongTinMoPopupRoute: Routes = [
    {
        path: 'thong-tin-mo/:id/delete',
        component: ThongTinMoDeletePopupComponent,
        resolve: {
            thongTinMo: ThongTinMoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinMo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
