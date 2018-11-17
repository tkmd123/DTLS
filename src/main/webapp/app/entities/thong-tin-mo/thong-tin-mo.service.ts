import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';

type EntityResponseType = HttpResponse<IThongTinMo>;
type EntityArrayResponseType = HttpResponse<IThongTinMo[]>;

@Injectable({ providedIn: 'root' })
export class ThongTinMoService {
    public resourceUrl = SERVER_API_URL + 'api/thong-tin-mos';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/thong-tin-mos';

    constructor(private http: HttpClient) {}

    create(thongTinMo: IThongTinMo): Observable<EntityResponseType> {
        return this.http.post<IThongTinMo>(this.resourceUrl, thongTinMo, { observe: 'response' });
    }

    update(thongTinMo: IThongTinMo): Observable<EntityResponseType> {
        return this.http.put<IThongTinMo>(this.resourceUrl, thongTinMo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThongTinMo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThongTinMo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThongTinMo[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
