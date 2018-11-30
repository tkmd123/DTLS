import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';

type EntityResponseType = HttpResponse<ITinhSachPhanUng>;
type EntityArrayResponseType = HttpResponse<ITinhSachPhanUng[]>;

@Injectable({ providedIn: 'root' })
export class TinhSachPhanUngService {
    public resourceUrl = SERVER_API_URL + 'api/tinh-sach-phan-ungs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tinh-sach-phan-ungs';

    constructor(private http: HttpClient) {}

    create(tinhSachPhanUng: ITinhSachPhanUng): Observable<EntityResponseType> {
        return this.http.post<ITinhSachPhanUng>(this.resourceUrl, tinhSachPhanUng, { observe: 'response' });
    }

    update(tinhSachPhanUng: ITinhSachPhanUng): Observable<EntityResponseType> {
        return this.http.put<ITinhSachPhanUng>(this.resourceUrl, tinhSachPhanUng, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITinhSachPhanUng>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITinhSachPhanUng[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITinhSachPhanUng[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
