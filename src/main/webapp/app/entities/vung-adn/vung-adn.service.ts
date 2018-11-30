import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVungADN } from 'app/shared/model/vung-adn.model';

type EntityResponseType = HttpResponse<IVungADN>;
type EntityArrayResponseType = HttpResponse<IVungADN[]>;

@Injectable({ providedIn: 'root' })
export class VungADNService {
    public resourceUrl = SERVER_API_URL + 'api/vung-adns';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/vung-adns';

    constructor(private http: HttpClient) {}

    create(vungADN: IVungADN): Observable<EntityResponseType> {
        return this.http.post<IVungADN>(this.resourceUrl, vungADN, { observe: 'response' });
    }

    update(vungADN: IVungADN): Observable<EntityResponseType> {
        return this.http.put<IVungADN>(this.resourceUrl, vungADN, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVungADN>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVungADN[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVungADN[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
