import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DiemDotBien } from 'app/shared/model/diem-dot-bien.model';
import { DiemDotBienService } from './diem-dot-bien.service';
import { DiemDotBienComponent } from './diem-dot-bien.component';
import { DiemDotBienDetailComponent } from './diem-dot-bien-detail.component';
import { DiemDotBienUpdateComponent } from './diem-dot-bien-update.component';
import { DiemDotBienDeletePopupComponent } from './diem-dot-bien-delete-dialog.component';
import { IDiemDotBien } from 'app/shared/model/diem-dot-bien.model';

@Injectable({ providedIn: 'root' })
export class DiemDotBienResolve implements Resolve<IDiemDotBien> {
    constructor(private service: DiemDotBienService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DiemDotBien> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DiemDotBien>) => response.ok),
                map((diemDotBien: HttpResponse<DiemDotBien>) => diemDotBien.body)
            );
        }
        return of(new DiemDotBien());
    }
}

export const diemDotBienRoute: Routes = [
    {
        path: 'diem-dot-bien',
        component: DiemDotBienComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'dtlsApp.diemDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diem-dot-bien/:id/view',
        component: DiemDotBienDetailComponent,
        resolve: {
            diemDotBien: DiemDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diemDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diem-dot-bien/new',
        component: DiemDotBienUpdateComponent,
        resolve: {
            diemDotBien: DiemDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diemDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diem-dot-bien/:id/edit',
        component: DiemDotBienUpdateComponent,
        resolve: {
            diemDotBien: DiemDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diemDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diemDotBienPopupRoute: Routes = [
    {
        path: 'diem-dot-bien/:id/delete',
        component: DiemDotBienDeletePopupComponent,
        resolve: {
            diemDotBien: DiemDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.diemDotBien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
