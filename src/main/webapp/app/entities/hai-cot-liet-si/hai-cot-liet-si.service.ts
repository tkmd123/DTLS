import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';

type EntityResponseType = HttpResponse<IHaiCotLietSi>;
type EntityArrayResponseType = HttpResponse<IHaiCotLietSi[]>;

@Injectable({ providedIn: 'root' })
export class HaiCotLietSiService {
    public resourceUrl = SERVER_API_URL + 'api/hai-cot-liet-sis';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/hai-cot-liet-sis';

    constructor(private http: HttpClient) {}

    create(haiCotLietSi: IHaiCotLietSi): Observable<EntityResponseType> {
        return this.http.post<IHaiCotLietSi>(this.resourceUrl, haiCotLietSi, { observe: 'response' });
    }

    update(haiCotLietSi: IHaiCotLietSi): Observable<EntityResponseType> {
        return this.http.put<IHaiCotLietSi>(this.resourceUrl, haiCotLietSi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHaiCotLietSi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHaiCotLietSi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHaiCotLietSi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
