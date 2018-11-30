import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';

type EntityResponseType = HttpResponse<IPCRPhanUngChuan>;
type EntityArrayResponseType = HttpResponse<IPCRPhanUngChuan[]>;

@Injectable({ providedIn: 'root' })
export class PCRPhanUngChuanService {
    public resourceUrl = SERVER_API_URL + 'api/pcr-phan-ung-chuans';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pcr-phan-ung-chuans';

    constructor(private http: HttpClient) {}

    create(pCRPhanUngChuan: IPCRPhanUngChuan): Observable<EntityResponseType> {
        return this.http.post<IPCRPhanUngChuan>(this.resourceUrl, pCRPhanUngChuan, { observe: 'response' });
    }

    update(pCRPhanUngChuan: IPCRPhanUngChuan): Observable<EntityResponseType> {
        return this.http.put<IPCRPhanUngChuan>(this.resourceUrl, pCRPhanUngChuan, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPCRPhanUngChuan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRPhanUngChuan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRPhanUngChuan[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
