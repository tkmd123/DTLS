import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPhuongXa } from 'app/shared/model/phuong-xa.model';

type EntityResponseType = HttpResponse<IPhuongXa>;
type EntityArrayResponseType = HttpResponse<IPhuongXa[]>;

@Injectable({ providedIn: 'root' })
export class PhuongXaService {
    public resourceUrl = SERVER_API_URL + 'api/phuong-xas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/phuong-xas';

    constructor(private http: HttpClient) {}

    create(phuongXa: IPhuongXa): Observable<EntityResponseType> {
        return this.http.post<IPhuongXa>(this.resourceUrl, phuongXa, { observe: 'response' });
    }

    update(phuongXa: IPhuongXa): Observable<EntityResponseType> {
        return this.http.put<IPhuongXa>(this.resourceUrl, phuongXa, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPhuongXa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhuongXa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhuongXa[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
