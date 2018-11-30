import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';
import { ThongTinKhaiQuatService } from './thong-tin-khai-quat.service';
import { ThongTinKhaiQuatComponent } from './thong-tin-khai-quat.component';
import { ThongTinKhaiQuatDetailComponent } from './thong-tin-khai-quat-detail.component';
import { ThongTinKhaiQuatUpdateComponent } from './thong-tin-khai-quat-update.component';
import { ThongTinKhaiQuatDeletePopupComponent } from './thong-tin-khai-quat-delete-dialog.component';
import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';

@Injectable({ providedIn: 'root' })
export class ThongTinKhaiQuatResolve implements Resolve<IThongTinKhaiQuat> {
    constructor(private service: ThongTinKhaiQuatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThongTinKhaiQuat> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThongTinKhaiQuat>) => response.ok),
                map((thongTinKhaiQuat: HttpResponse<ThongTinKhaiQuat>) => thongTinKhaiQuat.body)
            );
        }
        return of(new ThongTinKhaiQuat());
    }
}

export const thongTinKhaiQuatRoute: Routes = [
    {
        path: 'thong-tin-khai-quat',
        component: ThongTinKhaiQuatComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.thongTinKhaiQuat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-khai-quat/:id/view',
        component: ThongTinKhaiQuatDetailComponent,
        resolve: {
            thongTinKhaiQuat: ThongTinKhaiQuatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinKhaiQuat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-khai-quat/new',
        component: ThongTinKhaiQuatUpdateComponent,
        resolve: {
            thongTinKhaiQuat: ThongTinKhaiQuatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinKhaiQuat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-khai-quat/:id/edit',
        component: ThongTinKhaiQuatUpdateComponent,
        resolve: {
            thongTinKhaiQuat: ThongTinKhaiQuatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinKhaiQuat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thongTinKhaiQuatPopupRoute: Routes = [
    {
        path: 'thong-tin-khai-quat/:id/delete',
        component: ThongTinKhaiQuatDeletePopupComponent,
        resolve: {
            thongTinKhaiQuat: ThongTinKhaiQuatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinKhaiQuat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
