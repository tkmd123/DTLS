import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuanHuyen } from 'app/shared/model/quan-huyen.model';
import { QuanHuyenService } from './quan-huyen.service';
import { QuanHuyenComponent } from './quan-huyen.component';
import { QuanHuyenDetailComponent } from './quan-huyen-detail.component';
import { QuanHuyenUpdateComponent } from './quan-huyen-update.component';
import { QuanHuyenDeletePopupComponent } from './quan-huyen-delete-dialog.component';
import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';

@Injectable({ providedIn: 'root' })
export class QuanHuyenResolve implements Resolve<IQuanHuyen> {
    constructor(private service: QuanHuyenService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuanHuyen> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QuanHuyen>) => response.ok),
                map((quanHuyen: HttpResponse<QuanHuyen>) => quanHuyen.body)
            );
        }
        return of(new QuanHuyen());
    }
}

export const quanHuyenRoute: Routes = [
    {
        path: 'quan-huyen',
        component: QuanHuyenComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.quanHuyen.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quan-huyen/:id/view',
        component: QuanHuyenDetailComponent,
        resolve: {
            quanHuyen: QuanHuyenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHuyen.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quan-huyen/new',
        component: QuanHuyenUpdateComponent,
        resolve: {
            quanHuyen: QuanHuyenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHuyen.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quan-huyen/:id/edit',
        component: QuanHuyenUpdateComponent,
        resolve: {
            quanHuyen: QuanHuyenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHuyen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quanHuyenPopupRoute: Routes = [
    {
        path: 'quan-huyen/:id/delete',
        component: QuanHuyenDeletePopupComponent,
        resolve: {
            quanHuyen: QuanHuyenResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHuyen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
