import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';

type EntityResponseType = HttpResponse<IThongTinADN>;
type EntityArrayResponseType = HttpResponse<IThongTinADN[]>;

@Injectable({ providedIn: 'root' })
export class ThongTinADNService {
    public resourceUrl = SERVER_API_URL + 'api/thong-tin-adns';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/thong-tin-adns';

    constructor(private http: HttpClient) {}

    create(thongTinADN: IThongTinADN): Observable<EntityResponseType> {
        return this.http.post<IThongTinADN>(this.resourceUrl, thongTinADN, { observe: 'response' });
    }

    update(thongTinADN: IThongTinADN): Observable<EntityResponseType> {
        return this.http.put<IThongTinADN>(this.resourceUrl, thongTinADN, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThongTinADN>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThongTinADN[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThongTinADN[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
