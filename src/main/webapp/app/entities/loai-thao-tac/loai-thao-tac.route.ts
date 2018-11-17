import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';
import { LoaiThaoTacService } from './loai-thao-tac.service';
import { LoaiThaoTacComponent } from './loai-thao-tac.component';
import { LoaiThaoTacDetailComponent } from './loai-thao-tac-detail.component';
import { LoaiThaoTacUpdateComponent } from './loai-thao-tac-update.component';
import { LoaiThaoTacDeletePopupComponent } from './loai-thao-tac-delete-dialog.component';
import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';

@Injectable({ providedIn: 'root' })
export class LoaiThaoTacResolve implements Resolve<ILoaiThaoTac> {
    constructor(private service: LoaiThaoTacService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LoaiThaoTac> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LoaiThaoTac>) => response.ok),
                map((loaiThaoTac: HttpResponse<LoaiThaoTac>) => loaiThaoTac.body)
            );
        }
        return of(new LoaiThaoTac());
    }
}

export const loaiThaoTacRoute: Routes = [
    {
        path: 'loai-thao-tac',
        component: LoaiThaoTacComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiThaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-thao-tac/:id/view',
        component: LoaiThaoTacDetailComponent,
        resolve: {
            loaiThaoTac: LoaiThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiThaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-thao-tac/new',
        component: LoaiThaoTacUpdateComponent,
        resolve: {
            loaiThaoTac: LoaiThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiThaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'loai-thao-tac/:id/edit',
        component: LoaiThaoTacUpdateComponent,
        resolve: {
            loaiThaoTac: LoaiThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiThaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loaiThaoTacPopupRoute: Routes = [
    {
        path: 'loai-thao-tac/:id/delete',
        component: LoaiThaoTacDeletePopupComponent,
        resolve: {
            loaiThaoTac: LoaiThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.loaiThaoTac.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
