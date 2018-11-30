import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPhongBan } from 'app/shared/model/phong-ban.model';

type EntityResponseType = HttpResponse<IPhongBan>;
type EntityArrayResponseType = HttpResponse<IPhongBan[]>;

@Injectable({ providedIn: 'root' })
export class PhongBanService {
    public resourceUrl = SERVER_API_URL + 'api/phong-bans';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/phong-bans';

    constructor(private http: HttpClient) {}

    create(phongBan: IPhongBan): Observable<EntityResponseType> {
        return this.http.post<IPhongBan>(this.resourceUrl, phongBan, { observe: 'response' });
    }

    update(phongBan: IPhongBan): Observable<EntityResponseType> {
        return this.http.put<IPhongBan>(this.resourceUrl, phongBan, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPhongBan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhongBan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPhongBan[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
