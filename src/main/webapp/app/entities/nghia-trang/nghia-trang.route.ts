import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NghiaTrang } from 'app/shared/model/nghia-trang.model';
import { NghiaTrangService } from './nghia-trang.service';
import { NghiaTrangComponent } from './nghia-trang.component';
import { NghiaTrangDetailComponent } from './nghia-trang-detail.component';
import { NghiaTrangUpdateComponent } from './nghia-trang-update.component';
import { NghiaTrangDeletePopupComponent } from './nghia-trang-delete-dialog.component';
import { INghiaTrang } from 'app/shared/model/nghia-trang.model';

@Injectable({ providedIn: 'root' })
export class NghiaTrangResolve implements Resolve<INghiaTrang> {
    constructor(private service: NghiaTrangService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NghiaTrang> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NghiaTrang>) => response.ok),
                map((nghiaTrang: HttpResponse<NghiaTrang>) => nghiaTrang.body)
            );
        }
        return of(new NghiaTrang());
    }
}

export const nghiaTrangRoute: Routes = [
    {
        path: 'nghia-trang',
        component: NghiaTrangComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.nghiaTrang.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nghia-trang/:id/view',
        component: NghiaTrangDetailComponent,
        resolve: {
            nghiaTrang: NghiaTrangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nghiaTrang.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nghia-trang/new',
        component: NghiaTrangUpdateComponent,
        resolve: {
            nghiaTrang: NghiaTrangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nghiaTrang.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'nghia-trang/:id/edit',
        component: NghiaTrangUpdateComponent,
        resolve: {
            nghiaTrang: NghiaTrangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nghiaTrang.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nghiaTrangPopupRoute: Routes = [
    {
        path: 'nghia-trang/:id/delete',
        component: NghiaTrangDeletePopupComponent,
        resolve: {
            nghiaTrang: NghiaTrangResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.nghiaTrang.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
