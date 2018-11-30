import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDonVi } from 'app/shared/model/don-vi.model';

type EntityResponseType = HttpResponse<IDonVi>;
type EntityArrayResponseType = HttpResponse<IDonVi[]>;

@Injectable({ providedIn: 'root' })
export class DonViService {
    public resourceUrl = SERVER_API_URL + 'api/don-vis';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/don-vis';

    constructor(private http: HttpClient) {}

    create(donVi: IDonVi): Observable<EntityResponseType> {
        return this.http.post<IDonVi>(this.resourceUrl, donVi, { observe: 'response' });
    }

    update(donVi: IDonVi): Observable<EntityResponseType> {
        return this.http.put<IDonVi>(this.resourceUrl, donVi, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDonVi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonVi[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDonVi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
