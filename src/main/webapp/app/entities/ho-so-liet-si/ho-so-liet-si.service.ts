import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';

type EntityResponseType = HttpResponse<IHoSoLietSi>;
type EntityArrayResponseType = HttpResponse<IHoSoLietSi[]>;

@Injectable({ providedIn: 'root' })
export class HoSoLietSiService {
    public resourceUrl = SERVER_API_URL + 'api/ho-so-liet-sis';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/ho-so-liet-sis';

    constructor(private http: HttpClient) {}

    create(hoSoLietSi: IHoSoLietSi): Observable<EntityResponseType> {
        return this.http.post<IHoSoLietSi>(this.resourceUrl, hoSoLietSi, { observe: 'response' });
    }

    update(hoSoLietSi: IHoSoLietSi): Observable<EntityResponseType> {
        return this.http.put<IHoSoLietSi>(this.resourceUrl, hoSoLietSi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHoSoLietSi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoSoLietSi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoSoLietSi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
