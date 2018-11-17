import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThaoTac } from 'app/shared/model/thao-tac.model';
import { ThaoTacService } from './thao-tac.service';
import { ThaoTacComponent } from './thao-tac.component';
import { ThaoTacDetailComponent } from './thao-tac-detail.component';
import { ThaoTacUpdateComponent } from './thao-tac-update.component';
import { ThaoTacDeletePopupComponent } from './thao-tac-delete-dialog.component';
import { IThaoTac } from 'app/shared/model/thao-tac.model';

@Injectable({ providedIn: 'root' })
export class ThaoTacResolve implements Resolve<IThaoTac> {
    constructor(private service: ThaoTacService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThaoTac> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThaoTac>) => response.ok),
                map((thaoTac: HttpResponse<ThaoTac>) => thaoTac.body)
            );
        }
        return of(new ThaoTac());
    }
}

export const thaoTacRoute: Routes = [
    {
        path: 'thao-tac',
        component: ThaoTacComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thao-tac/:id/view',
        component: ThaoTacDetailComponent,
        resolve: {
            thaoTac: ThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thao-tac/new',
        component: ThaoTacUpdateComponent,
        resolve: {
            thaoTac: ThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thao-tac/:id/edit',
        component: ThaoTacUpdateComponent,
        resolve: {
            thaoTac: ThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thaoTac.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thaoTacPopupRoute: Routes = [
    {
        path: 'thao-tac/:id/delete',
        component: ThaoTacDeletePopupComponent,
        resolve: {
            thaoTac: ThaoTacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thaoTac.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
