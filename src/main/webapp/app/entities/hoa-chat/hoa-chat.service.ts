import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoaChat } from 'app/shared/model/hoa-chat.model';

type EntityResponseType = HttpResponse<IHoaChat>;
type EntityArrayResponseType = HttpResponse<IHoaChat[]>;

@Injectable({ providedIn: 'root' })
export class HoaChatService {
    public resourceUrl = SERVER_API_URL + 'api/hoa-chats';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/hoa-chats';

    constructor(private http: HttpClient) {}

    create(hoaChat: IHoaChat): Observable<EntityResponseType> {
        return this.http.post<IHoaChat>(this.resourceUrl, hoaChat, { observe: 'response' });
    }

    update(hoaChat: IHoaChat): Observable<EntityResponseType> {
        return this.http.put<IHoaChat>(this.resourceUrl, hoaChat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHoaChat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoaChat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoaChat[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
