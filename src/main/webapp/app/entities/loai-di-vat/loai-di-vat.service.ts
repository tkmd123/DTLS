import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoaiDiVat } from 'app/shared/model/loai-di-vat.model';

type EntityResponseType = HttpResponse<ILoaiDiVat>;
type EntityArrayResponseType = HttpResponse<ILoaiDiVat[]>;

@Injectable({ providedIn: 'root' })
export class LoaiDiVatService {
    public resourceUrl = SERVER_API_URL + 'api/loai-di-vats';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/loai-di-vats';

    constructor(private http: HttpClient) {}

    create(loaiDiVat: ILoaiDiVat): Observable<EntityResponseType> {
        return this.http.post<ILoaiDiVat>(this.resourceUrl, loaiDiVat, { observe: 'response' });
    }

    update(loaiDiVat: ILoaiDiVat): Observable<EntityResponseType> {
        return this.http.put<ILoaiDiVat>(this.resourceUrl, loaiDiVat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILoaiDiVat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiDiVat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiDiVat[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
