import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITachChiet } from 'app/shared/model/tach-chiet.model';

type EntityResponseType = HttpResponse<ITachChiet>;
type EntityArrayResponseType = HttpResponse<ITachChiet[]>;

@Injectable({ providedIn: 'root' })
export class TachChietService {
    public resourceUrl = SERVER_API_URL + 'api/tach-chiets';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tach-chiets';

    constructor(private http: HttpClient) {}

    create(tachChiet: ITachChiet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tachChiet);
        return this.http
            .post<ITachChiet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tachChiet: ITachChiet): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tachChiet);
        return this.http
            .put<ITachChiet>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITachChiet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITachChiet[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITachChiet[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(tachChiet: ITachChiet): ITachChiet {
        const copy: ITachChiet = Object.assign({}, tachChiet, {
            thoiGianThucHien:
                tachChiet.thoiGianThucHien != null && tachChiet.thoiGianThucHien.isValid() ? tachChiet.thoiGianThucHien.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.thoiGianThucHien = res.body.thoiGianThucHien != null ? moment(res.body.thoiGianThucHien) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((tachChiet: ITachChiet) => {
                tachChiet.thoiGianThucHien = tachChiet.thoiGianThucHien != null ? moment(tachChiet.thoiGianThucHien) : null;
            });
        }
        return res;
    }
}
