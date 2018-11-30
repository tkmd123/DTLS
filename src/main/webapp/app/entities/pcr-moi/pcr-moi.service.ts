import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPCRMoi } from 'app/shared/model/pcr-moi.model';

type EntityResponseType = HttpResponse<IPCRMoi>;
type EntityArrayResponseType = HttpResponse<IPCRMoi[]>;

@Injectable({ providedIn: 'root' })
export class PCRMoiService {
    public resourceUrl = SERVER_API_URL + 'api/pcr-mois';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pcr-mois';

    constructor(private http: HttpClient) {}

    create(pCRMoi: IPCRMoi): Observable<EntityResponseType> {
        return this.http.post<IPCRMoi>(this.resourceUrl, pCRMoi, { observe: 'response' });
    }

    update(pCRMoi: IPCRMoi): Observable<EntityResponseType> {
        return this.http.put<IPCRMoi>(this.resourceUrl, pCRMoi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPCRMoi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRMoi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPCRMoi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
