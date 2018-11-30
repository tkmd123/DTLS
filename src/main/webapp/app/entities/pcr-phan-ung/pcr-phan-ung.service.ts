import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';

type EntityResponseType = HttpResponse<IPCRPhanUng>;
type EntityArrayResponseType = HttpResponse<IPCRPhanUng[]>;

@Injectable({ providedIn: 'root' })
export class PCRPhanUngService {
    public resourceUrl = SERVER_API_URL + 'api/pcr-phan-ungs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pcr-phan-ungs';

    constructor(private http: HttpClient) {}

    create(pCRPhanUng: IPCRPhanUng): Observable<EntityResponseType> {
        return this.http.post<IPCRPhanUng>(this.resourceUrl, pCRPhanUng, { observe: 'response' });
    }

    update(pCRPhanUng: IPCRPhanUng): Observable<EntityResponseType> {
        return this.http.put<IPCRPhanUng>(this.resourceUrl, pCRPhanUng, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPCRPhanUng>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRPhanUng[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRPhanUng[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
