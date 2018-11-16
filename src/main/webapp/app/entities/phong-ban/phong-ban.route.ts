import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from './phong-ban.service';
import { PhongBanComponent } from './phong-ban.component';
import { PhongBanDetailComponent } from './phong-ban-detail.component';
import { PhongBanUpdateComponent } from './phong-ban-update.component';
import { PhongBanDeletePopupComponent } from './phong-ban-delete-dialog.component';
import { IPhongBan } from 'app/shared/model/phong-ban.model';

@Injectable({ providedIn: 'root' })
export class PhongBanResolve implements Resolve<IPhongBan> {
    constructor(private service: PhongBanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PhongBan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PhongBan>) => response.ok),
                map((phongBan: HttpResponse<PhongBan>) => phongBan.body)
            );
        }
        return of(new PhongBan());
    }
}

export const phongBanRoute: Routes = [
    {
        path: 'phong-ban',
        component: PhongBanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phongBan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phong-ban/:id/view',
        component: PhongBanDetailComponent,
        resolve: {
            phongBan: PhongBanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phongBan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phong-ban/new',
        component: PhongBanUpdateComponent,
        resolve: {
            phongBan: PhongBanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phongBan.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'phong-ban/:id/edit',
        component: PhongBanUpdateComponent,
        resolve: {
            phongBan: PhongBanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phongBan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phongBanPopupRoute: Routes = [
    {
        path: 'phong-ban/:id/delete',
        component: PhongBanDeletePopupComponent,
        resolve: {
            phongBan: PhongBanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.phongBan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
