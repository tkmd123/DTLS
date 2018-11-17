import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiVat } from 'app/shared/model/di-vat.model';

type EntityResponseType = HttpResponse<IDiVat>;
type EntityArrayResponseType = HttpResponse<IDiVat[]>;

@Injectable({ providedIn: 'root' })
export class DiVatService {
    public resourceUrl = SERVER_API_URL + 'api/di-vats';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/di-vats';

    constructor(private http: HttpClient) {}

    create(diVat: IDiVat): Observable<EntityResponseType> {
        return this.http.post<IDiVat>(this.resourceUrl, diVat, { observe: 'response' });
    }

    update(diVat: IDiVat): Observable<EntityResponseType> {
        return this.http.put<IDiVat>(this.resourceUrl, diVat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiVat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiVat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiVat[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
