import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

type EntityResponseType = HttpResponse<IMauTachChiet>;
type EntityArrayResponseType = HttpResponse<IMauTachChiet[]>;

@Injectable({ providedIn: 'root' })
export class MauTachChietService {
    public resourceUrl = SERVER_API_URL + 'api/mau-tach-chiets';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/mau-tach-chiets';

    constructor(private http: HttpClient) {}

    create(mauTachChiet: IMauTachChiet): Observable<EntityResponseType> {
        return this.http.post<IMauTachChiet>(this.resourceUrl, mauTachChiet, { observe: 'response' });
    }

    update(mauTachChiet: IMauTachChiet): Observable<EntityResponseType> {
        return this.http.put<IMauTachChiet>(this.resourceUrl, mauTachChiet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMauTachChiet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMauTachChiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMauTachChiet[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
