import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INhanDang } from 'app/shared/model/nhan-dang.model';

type EntityResponseType = HttpResponse<INhanDang>;
type EntityArrayResponseType = HttpResponse<INhanDang[]>;

@Injectable({ providedIn: 'root' })
export class NhanDangService {
    public resourceUrl = SERVER_API_URL + 'api/nhan-dangs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/nhan-dangs';

    constructor(private http: HttpClient) {}

    create(nhanDang: INhanDang): Observable<EntityResponseType> {
        return this.http.post<INhanDang>(this.resourceUrl, nhanDang, { observe: 'response' });
    }

    update(nhanDang: INhanDang): Observable<EntityResponseType> {
        return this.http.put<INhanDang>(this.resourceUrl, nhanDang, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INhanDang>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INhanDang[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INhanDang[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
