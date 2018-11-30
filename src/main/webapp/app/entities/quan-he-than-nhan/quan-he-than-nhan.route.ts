import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';
import { QuanHeThanNhanService } from './quan-he-than-nhan.service';
import { QuanHeThanNhanComponent } from './quan-he-than-nhan.component';
import { QuanHeThanNhanDetailComponent } from './quan-he-than-nhan-detail.component';
import { QuanHeThanNhanUpdateComponent } from './quan-he-than-nhan-update.component';
import { QuanHeThanNhanDeletePopupComponent } from './quan-he-than-nhan-delete-dialog.component';
import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';

@Injectable({ providedIn: 'root' })
export class QuanHeThanNhanResolve implements Resolve<IQuanHeThanNhan> {
    constructor(private service: QuanHeThanNhanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuanHeThanNhan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<QuanHeThanNhan>) => response.ok),
                map((quanHeThanNhan: HttpResponse<QuanHeThanNhan>) => quanHeThanNhan.body)
            );
        }
        return of(new QuanHeThanNhan());
    }
}

export const quanHeThanNhanRoute: Routes = [
    {
        path: 'quan-he-than-nhan',
        component: QuanHeThanNhanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHeThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quan-he-than-nhan/:id/view',
        component: QuanHeThanNhanDetailComponent,
        resolve: {
            quanHeThanNhan: QuanHeThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHeThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quan-he-than-nhan/new',
        component: QuanHeThanNhanUpdateComponent,
        resolve: {
            quanHeThanNhan: QuanHeThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHeThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quan-he-than-nhan/:id/edit',
        component: QuanHeThanNhanUpdateComponent,
        resolve: {
            quanHeThanNhan: QuanHeThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHeThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quanHeThanNhanPopupRoute: Routes = [
    {
        path: 'quan-he-than-nhan/:id/delete',
        component: QuanHeThanNhanDeletePopupComponent,
        resolve: {
            quanHeThanNhan: QuanHeThanNhanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.quanHeThanNhan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
