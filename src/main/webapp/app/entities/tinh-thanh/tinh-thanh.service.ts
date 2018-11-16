import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';

type EntityResponseType = HttpResponse<ITinhThanh>;
type EntityArrayResponseType = HttpResponse<ITinhThanh[]>;

@Injectable({ providedIn: 'root' })
export class TinhThanhService {
    public resourceUrl = SERVER_API_URL + 'api/tinh-thanhs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tinh-thanhs';

    constructor(private http: HttpClient) {}

    create(tinhThanh: ITinhThanh): Observable<EntityResponseType> {
        return this.http.post<ITinhThanh>(this.resourceUrl, tinhThanh, { observe: 'response' });
    }

    update(tinhThanh: ITinhThanh): Observable<EntityResponseType> {
        return this.http.put<ITinhThanh>(this.resourceUrl, tinhThanh, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITinhThanh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITinhThanh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITinhThanh[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
