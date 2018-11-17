import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThongTinADN } from 'app/shared/model/thong-tin-adn.model';
import { ThongTinADNService } from './thong-tin-adn.service';
import { ThongTinADNComponent } from './thong-tin-adn.component';
import { ThongTinADNDetailComponent } from './thong-tin-adn-detail.component';
import { ThongTinADNUpdateComponent } from './thong-tin-adn-update.component';
import { ThongTinADNDeletePopupComponent } from './thong-tin-adn-delete-dialog.component';
import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';

@Injectable({ providedIn: 'root' })
export class ThongTinADNResolve implements Resolve<IThongTinADN> {
    constructor(private service: ThongTinADNService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ThongTinADN> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThongTinADN>) => response.ok),
                map((thongTinADN: HttpResponse<ThongTinADN>) => thongTinADN.body)
            );
        }
        return of(new ThongTinADN());
    }
}

export const thongTinADNRoute: Routes = [
    {
        path: 'thong-tin-adn',
        component: ThongTinADNComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-adn/:id/view',
        component: ThongTinADNDetailComponent,
        resolve: {
            thongTinADN: ThongTinADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-adn/new',
        component: ThongTinADNUpdateComponent,
        resolve: {
            thongTinADN: ThongTinADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thong-tin-adn/:id/edit',
        component: ThongTinADNUpdateComponent,
        resolve: {
            thongTinADN: ThongTinADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinADN.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thongTinADNPopupRoute: Routes = [
    {
        path: 'thong-tin-adn/:id/delete',
        component: ThongTinADNDeletePopupComponent,
        resolve: {
            thongTinADN: ThongTinADNResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.thongTinADN.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
