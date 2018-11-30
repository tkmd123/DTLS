import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';

type EntityResponseType = HttpResponse<IPCRKetQua>;
type EntityArrayResponseType = HttpResponse<IPCRKetQua[]>;

@Injectable({ providedIn: 'root' })
export class PCRKetQuaService {
    public resourceUrl = SERVER_API_URL + 'api/pcr-ket-quas';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pcr-ket-quas';

    constructor(private http: HttpClient) {}

    create(pCRKetQua: IPCRKetQua): Observable<EntityResponseType> {
        return this.http.post<IPCRKetQua>(this.resourceUrl, pCRKetQua, { observe: 'response' });
    }

    update(pCRKetQua: IPCRKetQua): Observable<EntityResponseType> {
        return this.http.put<IPCRKetQua>(this.resourceUrl, pCRKetQua, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPCRKetQua>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRKetQua[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRKetQua[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
