import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMayPCR } from 'app/shared/model/may-pcr.model';

type EntityResponseType = HttpResponse<IMayPCR>;
type EntityArrayResponseType = HttpResponse<IMayPCR[]>;

@Injectable({ providedIn: 'root' })
export class MayPCRService {
    public resourceUrl = SERVER_API_URL + 'api/may-pcrs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/may-pcrs';

    constructor(private http: HttpClient) {}

    create(mayPCR: IMayPCR): Observable<EntityResponseType> {
        return this.http.post<IMayPCR>(this.resourceUrl, mayPCR, { observe: 'response' });
    }

    update(mayPCR: IMayPCR): Observable<EntityResponseType> {
        return this.http.put<IMayPCR>(this.resourceUrl, mayPCR, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMayPCR>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMayPCR[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMayPCR[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
