import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TinhSach } from 'app/shared/model/tinh-sach.model';
import { TinhSachService } from './tinh-sach.service';
import { TinhSachComponent } from './tinh-sach.component';
import { TinhSachDetailComponent } from './tinh-sach-detail.component';
import { TinhSachUpdateComponent } from './tinh-sach-update.component';
import { TinhSachDeletePopupComponent } from './tinh-sach-delete-dialog.component';
import { ITinhSach } from 'app/shared/model/tinh-sach.model';

@Injectable({ providedIn: 'root' })
export class TinhSachResolve implements Resolve<ITinhSach> {
    constructor(private service: TinhSachService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TinhSach> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TinhSach>) => response.ok),
                map((tinhSach: HttpResponse<TinhSach>) => tinhSach.body)
            );
        }
        return of(new TinhSach());
    }
}

export const tinhSachRoute: Routes = [
    {
        path: 'tinh-sach',
        component: TinhSachComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSach.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-sach/:id/view',
        component: TinhSachDetailComponent,
        resolve: {
            tinhSach: TinhSachResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSach.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-sach/new',
        component: TinhSachUpdateComponent,
        resolve: {
            tinhSach: TinhSachResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSach.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tinh-sach/:id/edit',
        component: TinhSachUpdateComponent,
        resolve: {
            tinhSach: TinhSachResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSach.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tinhSachPopupRoute: Routes = [
    {
        path: 'tinh-sach/:id/delete',
        component: TinhSachDeletePopupComponent,
        resolve: {
            tinhSach: TinhSachResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.tinhSach.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
