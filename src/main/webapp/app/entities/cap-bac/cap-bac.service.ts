import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICapBac } from 'app/shared/model/cap-bac.model';

type EntityResponseType = HttpResponse<ICapBac>;
type EntityArrayResponseType = HttpResponse<ICapBac[]>;

@Injectable({ providedIn: 'root' })
export class CapBacService {
    public resourceUrl = SERVER_API_URL + 'api/cap-bacs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/cap-bacs';

    constructor(private http: HttpClient) {}

    create(capBac: ICapBac): Observable<EntityResponseType> {
        return this.http.post<ICapBac>(this.resourceUrl, capBac, { observe: 'response' });
    }

    update(capBac: ICapBac): Observable<EntityResponseType> {
        return this.http.put<ICapBac>(this.resourceUrl, capBac, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICapBac>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICapBac[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICapBac[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
