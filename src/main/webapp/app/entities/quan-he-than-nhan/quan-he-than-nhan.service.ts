import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';

type EntityResponseType = HttpResponse<IQuanHeThanNhan>;
type EntityArrayResponseType = HttpResponse<IQuanHeThanNhan[]>;

@Injectable({ providedIn: 'root' })
export class QuanHeThanNhanService {
    public resourceUrl = SERVER_API_URL + 'api/quan-he-than-nhans';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/quan-he-than-nhans';

    constructor(private http: HttpClient) {}

    create(quanHeThanNhan: IQuanHeThanNhan): Observable<EntityResponseType> {
        return this.http.post<IQuanHeThanNhan>(this.resourceUrl, quanHeThanNhan, { observe: 'response' });
    }

    update(quanHeThanNhan: IQuanHeThanNhan): Observable<EntityResponseType> {
        return this.http.put<IQuanHeThanNhan>(this.resourceUrl, quanHeThanNhan, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuanHeThanNhan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuanHeThanNhan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuanHeThanNhan[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
