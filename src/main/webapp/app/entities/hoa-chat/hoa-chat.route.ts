import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HoaChat } from 'app/shared/model/hoa-chat.model';
import { HoaChatService } from './hoa-chat.service';
import { HoaChatComponent } from './hoa-chat.component';
import { HoaChatDetailComponent } from './hoa-chat-detail.component';
import { HoaChatUpdateComponent } from './hoa-chat-update.component';
import { HoaChatDeletePopupComponent } from './hoa-chat-delete-dialog.component';
import { IHoaChat } from 'app/shared/model/hoa-chat.model';

@Injectable({ providedIn: 'root' })
export class HoaChatResolve implements Resolve<IHoaChat> {
    constructor(private service: HoaChatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HoaChat> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HoaChat>) => response.ok),
                map((hoaChat: HttpResponse<HoaChat>) => hoaChat.body)
            );
        }
        return of(new HoaChat());
    }
}

export const hoaChatRoute: Routes = [
    {
        path: 'hoa-chat',
        component: HoaChatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat/:id/view',
        component: HoaChatDetailComponent,
        resolve: {
            hoaChat: HoaChatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat/new',
        component: HoaChatUpdateComponent,
        resolve: {
            hoaChat: HoaChatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hoa-chat/:id/edit',
        component: HoaChatUpdateComponent,
        resolve: {
            hoaChat: HoaChatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoaChatPopupRoute: Routes = [
    {
        path: 'hoa-chat/:id/delete',
        component: HoaChatDeletePopupComponent,
        resolve: {
            hoaChat: HoaChatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.hoaChat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
