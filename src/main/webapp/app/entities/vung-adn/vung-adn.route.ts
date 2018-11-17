import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VungADN } from 'app/shared/model/vung-adn.model';
import { VungADNService } from './vung-adn.service';
import { VungADNComponent } from './vung-adn.component';
import { VungADNDetailComponent } from './vung-adn-detail.component';
import { VungADNUpdateComponent } from './vung-adn-update.component';
import { VungADNDeletePopupComponent } from './vung-adn-delete-dialog.component';
import { IVungADN } from 'app/shared/model/vung-adn.model';

@Injectable({ providedIn: 'root' })
export class VungADNResolve implements Resolve<IVungADN> {
    constructor(private service: VungADNService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VungADN> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VungADN>) => response.ok),
                map((vungADN: HttpResponse<VungADN>) => vungADN.body)
            );
        }
        return of(new VungADN());
    }
}

export const vungADNRoute: Routes = [
    {
        path: 'vung-adn',
        component: VungADNComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.vungADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vung-adn/:id/view',
        component: VungADNDetailComponent,
        resolve: {
            vungADN: VungADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.vungADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vung-adn/new',
        component: VungADNUpdateComponent,
        resolve: {
            vungADN: VungADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.vungADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vung-adn/:id/edit',
        component: VungADNUpdateComponent,
        resolve: {
            vungADN: VungADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.vungADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vungADNPopupRoute: Routes = [
    {
        path: 'vung-adn/:id/delete',
        component: VungADNDeletePopupComponent,
        resolve: {
            vungADN: VungADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.vungADN.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
