import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPCR } from 'app/shared/model/pcr.model';

type EntityResponseType = HttpResponse<IPCR>;
type EntityArrayResponseType = HttpResponse<IPCR[]>;

@Injectable({ providedIn: 'root' })
export class PCRService {
    public resourceUrl = SERVER_API_URL + 'api/pcrs';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/pcrs';

    constructor(private http: HttpClient) {}

    create(pCR: IPCR): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pCR);
        return this.http
            .post<IPCR>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(pCR: IPCR): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pCR);
        return this.http
            .put<IPCR>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPCR>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPCR[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPCR[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(pCR: IPCR): IPCR {
        const copy: IPCR = Object.assign({}, pCR, {
            thoiGianThucHien: pCR.thoiGianThucHien != null && pCR.thoiGianThucHien.isValid() ? pCR.thoiGianThucHien.toJSON() : null,
            thoiGianBatDau: pCR.thoiGianBatDau != null && pCR.thoiGianBatDau.isValid() ? pCR.thoiGianBatDau.toJSON() : null,
            thoiGianKetThuc: pCR.thoiGianKetThuc != null && pCR.thoiGianKetThuc.isValid() ? pCR.thoiGianKetThuc.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.thoiGianThucHien = res.body.thoiGianThucHien != null ? moment(res.body.thoiGianThucHien) : null;
            res.body.thoiGianBatDau = res.body.thoiGianBatDau != null ? moment(res.body.thoiGianBatDau) : null;
            res.body.thoiGianKetThuc = res.body.thoiGianKetThuc != null ? moment(res.body.thoiGianKetThuc) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((pCR: IPCR) => {
                pCR.thoiGianThucHien = pCR.thoiGianThucHien != null ? moment(pCR.thoiGianThucHien) : null;
                pCR.thoiGianBatDau = pCR.thoiGianBatDau != null ? moment(pCR.thoiGianBatDau) : null;
                pCR.thoiGianKetThuc = pCR.thoiGianKetThuc != null ? moment(pCR.thoiGianKetThuc) : null;
            });
        }
        return res;
    }
}
