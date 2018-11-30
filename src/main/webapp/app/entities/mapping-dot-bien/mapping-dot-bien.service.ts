import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMappingDotBien } from 'app/shared/model/mapping-dot-bien.model';

type EntityResponseType = HttpResponse<IMappingDotBien>;
type EntityArrayResponseType = HttpResponse<IMappingDotBien[]>;

@Injectable({ providedIn: 'root' })
export class MappingDotBienService {
    public resourceUrl = SERVER_API_URL + 'api/mapping-dot-biens';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/mapping-dot-biens';

    constructor(private http: HttpClient) {}

    create(mappingDotBien: IMappingDotBien): Observable<EntityResponseType> {
        return this.http.post<IMappingDotBien>(this.resourceUrl, mappingDotBien, { observe: 'response' });
    }

    update(mappingDotBien: IMappingDotBien): Observable<EntityResponseType> {
        return this.http.put<IMappingDotBien>(this.resourceUrl, mappingDotBien, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMappingDotBien>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMappingDotBien[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMappingDotBien[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
