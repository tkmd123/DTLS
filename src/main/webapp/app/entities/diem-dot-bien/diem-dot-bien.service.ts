import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiemDotBien } from 'app/shared/model/diem-dot-bien.model';

type EntityResponseType = HttpResponse<IDiemDotBien>;
type EntityArrayResponseType = HttpResponse<IDiemDotBien[]>;

@Injectable({ providedIn: 'root' })
export class DiemDotBienService {
    public resourceUrl = SERVER_API_URL + 'api/diem-dot-biens';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/diem-dot-biens';

    constructor(private http: HttpClient) {}

    create(diemDotBien: IDiemDotBien): Observable<EntityResponseType> {
        return this.http.post<IDiemDotBien>(this.resourceUrl, diemDotBien, { observe: 'response' });
    }

    update(diemDotBien: IDiemDotBien): Observable<EntityResponseType> {
        return this.http.put<IDiemDotBien>(this.resourceUrl, diemDotBien, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiemDotBien>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiemDotBien[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiemDotBien[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
