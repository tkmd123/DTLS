import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';

type EntityResponseType = HttpResponse<IHoaChatTachChiet>;
type EntityArrayResponseType = HttpResponse<IHoaChatTachChiet[]>;

@Injectable({ providedIn: 'root' })
export class HoaChatTachChietService {
    public resourceUrl = SERVER_API_URL + 'api/hoa-chat-tach-chiets';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/hoa-chat-tach-chiets';

    constructor(private http: HttpClient) {}

    create(hoaChatTachChiet: IHoaChatTachChiet): Observable<EntityResponseType> {
        return this.http.post<IHoaChatTachChiet>(this.resourceUrl, hoaChatTachChiet, { observe: 'response' });
    }

    update(hoaChatTachChiet: IHoaChatTachChiet): Observable<EntityResponseType> {
        return this.http.put<IHoaChatTachChiet>(this.resourceUrl, hoaChatTachChiet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHoaChatTachChiet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoaChatTachChiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoaChatTachChiet[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
