import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';
import { HoaChatMacDinhService } from './hoa-chat-mac-dinh.service';
import { HoaChatMacDinhComponent } from './hoa-chat-mac-dinh.component';
import { HoaChatMacDinhDetailComponent } from './hoa-chat-mac-dinh-detail.component';
import { HoaChatMacDinhUpdateComponent } from './hoa-chat-mac-dinh-update.component';
import { HoaChatMacDinhDeletePopupComponent } from './hoa-chat-mac-dinh-delete-dialog.component';
import { IHoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';

@Injectable({ providedIn: 'root' })
export class HoaChatMacDinhResolve implements Resolve<IHoaChatMacDinh> {
    constructor(private service: HoaChatMacDinhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HoaChatMacDinh> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HoaChatMacDinh>) => response.ok),
                map((hoaChatMacDinh: HttpResponse<HoaChatMacDinh>) => hoaChatMacDinh.body)
            );
        }
        return of(new HoaChatMacDinh());
    }
}

export const hoaChatMacDinhRoute: Routes = [
    {
        path: 'hoa-chat-mac-dinh',
        component: HoaChatMacDinhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatMacDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat-mac-dinh/:id/view',
        component: HoaChatMacDinhDetailComponent,
        resolve: {
            hoaChatMacDinh: HoaChatMacDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatMacDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat-mac-dinh/new',
        component: HoaChatMacDinhUpdateComponent,
        resolve: {
            hoaChatMacDinh: HoaChatMacDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatMacDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat-mac-dinh/:id/edit',
        component: HoaChatMacDinhUpdateComponent,
        resolve: {
            hoaChatMacDinh: HoaChatMacDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatMacDinh.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoaChatMacDinhPopupRoute: Routes = [
    {
        path: 'hoa-chat-mac-dinh/:id/delete',
        component: HoaChatMacDinhDeletePopupComponent,
        resolve: {
            hoaChatMacDinh: HoaChatMacDinhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatMacDinh.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
