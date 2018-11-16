import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';

type EntityResponseType = HttpResponse<INhanDangLietSi>;
type EntityArrayResponseType = HttpResponse<INhanDangLietSi[]>;

@Injectable({ providedIn: 'root' })
export class NhanDangLietSiService {
    public resourceUrl = SERVER_API_URL + 'api/nhan-dang-liet-sis';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/nhan-dang-liet-sis';

    constructor(private http: HttpClient) {}

    create(nhanDangLietSi: INhanDangLietSi): Observable<EntityResponseType> {
        return this.http.post<INhanDangLietSi>(this.resourceUrl, nhanDangLietSi, { observe: 'response' });
    }

    update(nhanDangLietSi: INhanDangLietSi): Observable<EntityResponseType> {
        return this.http.put<INhanDangLietSi>(this.resourceUrl, nhanDangLietSi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INhanDangLietSi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INhanDangLietSi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INhanDangLietSi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
