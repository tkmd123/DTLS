import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

type EntityResponseType = HttpResponse<ILoaiHinhThaiHaiCot>;
type EntityArrayResponseType = HttpResponse<ILoaiHinhThaiHaiCot[]>;

@Injectable({ providedIn: 'root' })
export class LoaiHinhThaiHaiCotService {
    public resourceUrl = SERVER_API_URL + 'api/loai-hinh-thai-hai-cots';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/loai-hinh-thai-hai-cots';

    constructor(private http: HttpClient) {}

    create(loaiHinhThaiHaiCot: ILoaiHinhThaiHaiCot): Observable<EntityResponseType> {
        return this.http.post<ILoaiHinhThaiHaiCot>(this.resourceUrl, loaiHinhThaiHaiCot, { observe: 'response' });
    }

    update(loaiHinhThaiHaiCot: ILoaiHinhThaiHaiCot): Observable<EntityResponseType> {
        return this.http.put<ILoaiHinhThaiHaiCot>(this.resourceUrl, loaiHinhThaiHaiCot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILoaiHinhThaiHaiCot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiHinhThaiHaiCot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiHinhThaiHaiCot[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
