import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MappingDotBien } from 'app/shared/model/mapping-dot-bien.model';
import { MappingDotBienService } from './mapping-dot-bien.service';
import { MappingDotBienComponent } from './mapping-dot-bien.component';
import { MappingDotBienDetailComponent } from './mapping-dot-bien-detail.component';
import { MappingDotBienUpdateComponent } from './mapping-dot-bien-update.component';
import { MappingDotBienDeletePopupComponent } from './mapping-dot-bien-delete-dialog.component';
import { IMappingDotBien } from 'app/shared/model/mapping-dot-bien.model';

@Injectable({ providedIn: 'root' })
export class MappingDotBienResolve implements Resolve<IMappingDotBien> {
    constructor(private service: MappingDotBienService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MappingDotBien> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MappingDotBien>) => response.ok),
                map((mappingDotBien: HttpResponse<MappingDotBien>) => mappingDotBien.body)
            );
        }
        return of(new MappingDotBien());
    }
}

export const mappingDotBienRoute: Routes = [
    {
        path: 'mapping-dot-bien',
        component: MappingDotBienComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mappingDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mapping-dot-bien/:id/view',
        component: MappingDotBienDetailComponent,
        resolve: {
            mappingDotBien: MappingDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mappingDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mapping-dot-bien/new',
        component: MappingDotBienUpdateComponent,
        resolve: {
            mappingDotBien: MappingDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mappingDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mapping-dot-bien/:id/edit',
        component: MappingDotBienUpdateComponent,
        resolve: {
            mappingDotBien: MappingDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mappingDotBien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mappingDotBienPopupRoute: Routes = [
    {
        path: 'mapping-dot-bien/:id/delete',
        component: MappingDotBienDeletePopupComponent,
        resolve: {
            mappingDotBien: MappingDotBienResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dtlsApp.mappingDotBien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
