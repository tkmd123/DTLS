import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';
import { HoaChatTachChietService } from './hoa-chat-tach-chiet.service';
import { HoaChatTachChietComponent } from './hoa-chat-tach-chiet.component';
import { HoaChatTachChietDetailComponent } from './hoa-chat-tach-chiet-detail.component';
import { HoaChatTachChietUpdateComponent } from './hoa-chat-tach-chiet-update.component';
import { HoaChatTachChietDeletePopupComponent } from './hoa-chat-tach-chiet-delete-dialog.component';
import { IHoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';

@Injectable({ providedIn: 'root' })
export class HoaChatTachChietResolve implements Resolve<IHoaChatTachChiet> {
    constructor(private service: HoaChatTachChietService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HoaChatTachChiet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HoaChatTachChiet>) => response.ok),
                map((hoaChatTachChiet: HttpResponse<HoaChatTachChiet>) => hoaChatTachChiet.body)
            );
        }
        return of(new HoaChatTachChiet());
    }
}

export const hoaChatTachChietRoute: Routes = [
    {
        path: 'hoa-chat-tach-chiet',
        component: HoaChatTachChietComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat-tach-chiet/:id/view',
        component: HoaChatTachChietDetailComponent,
        resolve: {
            hoaChatTachChiet: HoaChatTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat-tach-chiet/new',
        component: HoaChatTachChietUpdateComponent,
        resolve: {
            hoaChatTachChiet: HoaChatTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat-tach-chiet/:id/edit',
        component: HoaChatTachChietUpdateComponent,
        resolve: {
            hoaChatTachChiet: HoaChatTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoaChatTachChietPopupRoute: Routes = [
    {
        path: 'hoa-chat-tach-chiet/:id/delete',
        component: HoaChatTachChietDeletePopupComponent,
        resolve: {
            hoaChatTachChiet: HoaChatTachChietResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChatTachChiet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
