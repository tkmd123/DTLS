import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';

type EntityResponseType = HttpResponse<ILoaiThaoTac>;
type EntityArrayResponseType = HttpResponse<ILoaiThaoTac[]>;

@Injectable({ providedIn: 'root' })
export class LoaiThaoTacService {
    public resourceUrl = SERVER_API_URL + 'api/loai-thao-tacs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/loai-thao-tacs';

    constructor(private http: HttpClient) {}

    create(loaiThaoTac: ILoaiThaoTac): Observable<EntityResponseType> {
        return this.http.post<ILoaiThaoTac>(this.resourceUrl, loaiThaoTac, { observe: 'response' });
    }

    update(loaiThaoTac: ILoaiThaoTac): Observable<EntityResponseType> {
        return this.http.put<ILoaiThaoTac>(this.resourceUrl, loaiThaoTac, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILoaiThaoTac>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiThaoTac[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiThaoTac[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
