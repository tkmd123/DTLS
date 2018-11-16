import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';

type EntityResponseType = HttpResponse<IThanNhanLietSi>;
type EntityArrayResponseType = HttpResponse<IThanNhanLietSi[]>;

@Injectable({ providedIn: 'root' })
export class ThanNhanLietSiService {
    public resourceUrl = SERVER_API_URL + 'api/than-nhan-liet-sis';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/than-nhan-liet-sis';

    constructor(private http: HttpClient) {}

    create(thanNhanLietSi: IThanNhanLietSi): Observable<EntityResponseType> {
        return this.http.post<IThanNhanLietSi>(this.resourceUrl, thanNhanLietSi, { observe: 'response' });
    }

    update(thanNhanLietSi: IThanNhanLietSi): Observable<EntityResponseType> {
        return this.http.put<IThanNhanLietSi>(this.resourceUrl, thanNhanLietSi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThanNhanLietSi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThanNhanLietSi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThanNhanLietSi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
