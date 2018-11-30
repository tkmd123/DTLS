import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

type EntityResponseType = HttpResponse<IDonViThoiKy>;
type EntityArrayResponseType = HttpResponse<IDonViThoiKy[]>;

@Injectable({ providedIn: 'root' })
export class DonViThoiKyService {
    public resourceUrl = SERVER_API_URL + 'api/don-vi-thoi-kies';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/don-vi-thoi-kies';

    constructor(private http: HttpClient) {}

    create(donViThoiKy: IDonViThoiKy): Observable<EntityResponseType> {
        return this.http.post<IDonViThoiKy>(this.resourceUrl, donViThoiKy, { observe: 'response' });
    }

    update(donViThoiKy: IDonViThoiKy): Observable<EntityResponseType> {
        return this.http.put<IDonViThoiKy>(this.resourceUrl, donViThoiKy, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDonViThoiKy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonViThoiKy[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonViThoiKy[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
