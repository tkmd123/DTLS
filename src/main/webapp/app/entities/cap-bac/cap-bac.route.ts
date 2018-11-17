import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CapBac } from 'app/shared/model/cap-bac.model';
import { CapBacService } from './cap-bac.service';
import { CapBacComponent } from './cap-bac.component';
import { CapBacDetailComponent } from './cap-bac-detail.component';
import { CapBacUpdateComponent } from './cap-bac-update.component';
import { CapBacDeletePopupComponent } from './cap-bac-delete-dialog.component';
import { ICapBac } from 'app/shared/model/cap-bac.model';

@Injectable({ providedIn: 'root' })
export class CapBacResolve implements Resolve<ICapBac> {
    constructor(private service: CapBacService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CapBac> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CapBac>) => response.ok),
                map((capBac: HttpResponse<CapBac>) => capBac.body)
            );
        }
        return of(new CapBac());
    }
}

export const capBacRoute: Routes = [
    {
        path: 'cap-bac',
        component: CapBacComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.capBac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cap-bac/:id/view',
        component: CapBacDetailComponent,
        resolve: {
            capBac: CapBacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.capBac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cap-bac/new',
        component: CapBacUpdateComponent,
        resolve: {
            capBac: CapBacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.capBac.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cap-bac/:id/edit',
        component: CapBacUpdateComponent,
        resolve: {
            capBac: CapBacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.capBac.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const capBacPopupRoute: Routes = [
    {
        path: 'cap-bac/:id/delete',
        component: CapBacDeletePopupComponent,
        resolve: {
            capBac: CapBacResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.capBac.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
