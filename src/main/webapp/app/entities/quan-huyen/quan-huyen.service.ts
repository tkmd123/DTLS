import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';

type EntityResponseType = HttpResponse<IQuanHuyen>;
type EntityArrayResponseType = HttpResponse<IQuanHuyen[]>;

@Injectable({ providedIn: 'root' })
export class QuanHuyenService {
    public resourceUrl = SERVER_API_URL + 'api/quan-huyens';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/quan-huyens';

    constructor(private http: HttpClient) {}

    create(quanHuyen: IQuanHuyen): Observable<EntityResponseType> {
        return this.http.post<IQuanHuyen>(this.resourceUrl, quanHuyen, { observe: 'response' });
    }

    update(quanHuyen: IQuanHuyen): Observable<EntityResponseType> {
        return this.http.put<IQuanHuyen>(this.resourceUrl, quanHuyen, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQuanHuyen>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuanHuyen[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQuanHuyen[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
