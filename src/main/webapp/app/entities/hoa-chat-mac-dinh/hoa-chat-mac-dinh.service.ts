import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';

type EntityResponseType = HttpResponse<IHoaChatMacDinh>;
type EntityArrayResponseType = HttpResponse<IHoaChatMacDinh[]>;

@Injectable({ providedIn: 'root' })
export class HoaChatMacDinhService {
    public resourceUrl = SERVER_API_URL + 'api/hoa-chat-mac-dinhs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/hoa-chat-mac-dinhs';

    constructor(private http: HttpClient) {}

    create(hoaChatMacDinh: IHoaChatMacDinh): Observable<EntityResponseType> {
        return this.http.post<IHoaChatMacDinh>(this.resourceUrl, hoaChatMacDinh, { observe: 'response' });
    }

    update(hoaChatMacDinh: IHoaChatMacDinh): Observable<EntityResponseType> {
        return this.http.put<IHoaChatMacDinh>(this.resourceUrl, hoaChatMacDinh, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHoaChatMacDinh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoaChatMacDinh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoaChatMacDinh[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
