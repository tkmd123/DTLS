import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPCRMau } from 'app/shared/model/pcr-mau.model';

type EntityResponseType = HttpResponse<IPCRMau>;
type EntityArrayResponseType = HttpResponse<IPCRMau[]>;

@Injectable({ providedIn: 'root' })
export class PCRMauService {
    public resourceUrl = SERVER_API_URL + 'api/pcr-maus';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pcr-maus';

    constructor(private http: HttpClient) {}

    create(pCRMau: IPCRMau): Observable<EntityResponseType> {
        return this.http.post<IPCRMau>(this.resourceUrl, pCRMau, { observe: 'response' });
    }

    update(pCRMau: IPCRMau): Observable<EntityResponseType> {
        return this.http.put<IPCRMau>(this.resourceUrl, pCRMau, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPCRMau>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRMau[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRMau[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
