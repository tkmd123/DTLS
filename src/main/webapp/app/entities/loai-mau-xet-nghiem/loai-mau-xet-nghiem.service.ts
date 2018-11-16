import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';

type EntityResponseType = HttpResponse<ILoaiMauXetNghiem>;
type EntityArrayResponseType = HttpResponse<ILoaiMauXetNghiem[]>;

@Injectable({ providedIn: 'root' })
export class LoaiMauXetNghiemService {
    public resourceUrl = SERVER_API_URL + 'api/loai-mau-xet-nghiems';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/loai-mau-xet-nghiems';

    constructor(private http: HttpClient) {}

    create(loaiMauXetNghiem: ILoaiMauXetNghiem): Observable<EntityResponseType> {
        return this.http.post<ILoaiMauXetNghiem>(this.resourceUrl, loaiMauXetNghiem, { observe: 'response' });
    }

    update(loaiMauXetNghiem: ILoaiMauXetNghiem): Observable<EntityResponseType> {
        return this.http.put<ILoaiMauXetNghiem>(this.resourceUrl, loaiMauXetNghiem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILoaiMauXetNghiem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiMauXetNghiem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILoaiMauXetNghiem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
