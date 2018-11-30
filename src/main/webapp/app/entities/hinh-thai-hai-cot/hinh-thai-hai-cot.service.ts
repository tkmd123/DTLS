import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';

type EntityResponseType = HttpResponse<IHinhThaiHaiCot>;
type EntityArrayResponseType = HttpResponse<IHinhThaiHaiCot[]>;

@Injectable({ providedIn: 'root' })
export class HinhThaiHaiCotService {
    public resourceUrl = SERVER_API_URL + 'api/hinh-thai-hai-cots';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/hinh-thai-hai-cots';

    constructor(private http: HttpClient) {}

    create(hinhThaiHaiCot: IHinhThaiHaiCot): Observable<EntityResponseType> {
        return this.http.post<IHinhThaiHaiCot>(this.resourceUrl, hinhThaiHaiCot, { observe: 'response' });
    }

    update(hinhThaiHaiCot: IHinhThaiHaiCot): Observable<EntityResponseType> {
        return this.http.put<IHinhThaiHaiCot>(this.resourceUrl, hinhThaiHaiCot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHinhThaiHaiCot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHinhThaiHaiCot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHinhThaiHaiCot[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
