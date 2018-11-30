import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrungTam } from 'app/shared/model/trung-tam.model';

type EntityResponseType = HttpResponse<ITrungTam>;
type EntityArrayResponseType = HttpResponse<ITrungTam[]>;

@Injectable({ providedIn: 'root' })
export class TrungTamService {
    public resourceUrl = SERVER_API_URL + 'api/trung-tams';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/trung-tams';

    constructor(private http: HttpClient) {}

    create(trungTam: ITrungTam): Observable<EntityResponseType> {
        return this.http.post<ITrungTam>(this.resourceUrl, trungTam, { observe: 'response' });
    }

    update(trungTam: ITrungTam): Observable<EntityResponseType> {
        return this.http.put<ITrungTam>(this.resourceUrl, trungTam, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITrungTam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrungTam[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrungTam[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
