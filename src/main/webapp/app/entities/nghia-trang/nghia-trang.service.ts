import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INghiaTrang } from 'app/shared/model/nghia-trang.model';

type EntityResponseType = HttpResponse<INghiaTrang>;
type EntityArrayResponseType = HttpResponse<INghiaTrang[]>;

@Injectable({ providedIn: 'root' })
export class NghiaTrangService {
    public resourceUrl = SERVER_API_URL + 'api/nghia-trangs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/nghia-trangs';

    constructor(private http: HttpClient) {}

    create(nghiaTrang: INghiaTrang): Observable<EntityResponseType> {
        return this.http.post<INghiaTrang>(this.resourceUrl, nghiaTrang, { observe: 'response' });
    }

    update(nghiaTrang: INghiaTrang): Observable<EntityResponseType> {
        return this.http.put<INghiaTrang>(this.resourceUrl, nghiaTrang, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INghiaTrang>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INghiaTrang[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INghiaTrang[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
