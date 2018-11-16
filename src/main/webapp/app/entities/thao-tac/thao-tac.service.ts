import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThaoTac } from 'app/shared/model/thao-tac.model';

type EntityResponseType = HttpResponse<IThaoTac>;
type EntityArrayResponseType = HttpResponse<IThaoTac[]>;

@Injectable({ providedIn: 'root' })
export class ThaoTacService {
    public resourceUrl = SERVER_API_URL + 'api/thao-tacs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/thao-tacs';

    constructor(private http: HttpClient) {}

    create(thaoTac: IThaoTac): Observable<EntityResponseType> {
        return this.http.post<IThaoTac>(this.resourceUrl, thaoTac, { observe: 'response' });
    }

    update(thaoTac: IThaoTac): Observable<EntityResponseType> {
        return this.http.put<IThaoTac>(this.resourceUrl, thaoTac, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThaoTac>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThaoTac[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThaoTac[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
