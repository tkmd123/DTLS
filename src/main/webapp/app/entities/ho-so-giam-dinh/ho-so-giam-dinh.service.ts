import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';

type EntityResponseType = HttpResponse<IHoSoGiamDinh>;
type EntityArrayResponseType = HttpResponse<IHoSoGiamDinh[]>;

@Injectable({ providedIn: 'root' })
export class HoSoGiamDinhService {
    public resourceUrl = SERVER_API_URL + 'api/ho-so-giam-dinhs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/ho-so-giam-dinhs';

    constructor(private http: HttpClient) {}

    create(hoSoGiamDinh: IHoSoGiamDinh): Observable<EntityResponseType> {
        return this.http.post<IHoSoGiamDinh>(this.resourceUrl, hoSoGiamDinh, { observe: 'response' });
    }

    update(hoSoGiamDinh: IHoSoGiamDinh): Observable<EntityResponseType> {
        return this.http.put<IHoSoGiamDinh>(this.resourceUrl, hoSoGiamDinh, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHoSoGiamDinh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoSoGiamDinh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHoSoGiamDinh[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
