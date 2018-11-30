import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITinhSach } from 'app/shared/model/tinh-sach.model';

type EntityResponseType = HttpResponse<ITinhSach>;
type EntityArrayResponseType = HttpResponse<ITinhSach[]>;

@Injectable({ providedIn: 'root' })
export class TinhSachService {
    public resourceUrl = SERVER_API_URL + 'api/tinh-saches';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/tinh-saches';

    constructor(private http: HttpClient) {}

    create(tinhSach: ITinhSach): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tinhSach);
        return this.http
            .post<ITinhSach>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tinhSach: ITinhSach): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tinhSach);
        return this.http
            .put<ITinhSach>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITinhSach>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITinhSach[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITinhSach[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(tinhSach: ITinhSach): ITinhSach {
        const copy: ITinhSach = Object.assign({}, tinhSach, {
            thoiGianThucHien:
                tinhSach.thoiGianThucHien != null && tinhSach.thoiGianThucHien.isValid() ? tinhSach.thoiGianThucHien.toJSON() : null
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
            res.body.forEach((tinhSach: ITinhSach) => {
                tinhSach.thoiGianThucHien = tinhSach.thoiGianThucHien != null ? moment(tinhSach.thoiGianThucHien) : null;
            });
        }
        return res;
    }
}
