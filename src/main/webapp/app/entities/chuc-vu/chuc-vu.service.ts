import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChucVu } from 'app/shared/model/chuc-vu.model';

type EntityResponseType = HttpResponse<IChucVu>;
type EntityArrayResponseType = HttpResponse<IChucVu[]>;

@Injectable({ providedIn: 'root' })
export class ChucVuService {
    public resourceUrl = SERVER_API_URL + 'api/chuc-vus';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/chuc-vus';

    constructor(private http: HttpClient) {}

    create(chucVu: IChucVu): Observable<EntityResponseType> {
        return this.http.post<IChucVu>(this.resourceUrl, chucVu, { observe: 'response' });
    }

    update(chucVu: IChucVu): Observable<EntityResponseType> {
        return this.http.put<IChucVu>(this.resourceUrl, chucVu, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IChucVu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IChucVu[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IChucVu[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
