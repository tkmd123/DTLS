import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INhanVien } from 'app/shared/model/nhan-vien.model';

type EntityResponseType = HttpResponse<INhanVien>;
type EntityArrayResponseType = HttpResponse<INhanVien[]>;

@Injectable({ providedIn: 'root' })
export class NhanVienService {
    public resourceUrl = SERVER_API_URL + 'api/nhan-viens';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/nhan-viens';

    constructor(private http: HttpClient) {}

    create(nhanVien: INhanVien): Observable<EntityResponseType> {
        return this.http.post<INhanVien>(this.resourceUrl, nhanVien, { observe: 'response' });
    }

    update(nhanVien: INhanVien): Observable<EntityResponseType> {
        return this.http.put<INhanVien>(this.resourceUrl, nhanVien, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INhanVien>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INhanVien[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INhanVien[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
