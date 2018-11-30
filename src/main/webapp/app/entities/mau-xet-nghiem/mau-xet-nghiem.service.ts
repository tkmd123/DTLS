import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';

type EntityResponseType = HttpResponse<IMauXetNghiem>;
type EntityArrayResponseType = HttpResponse<IMauXetNghiem[]>;

@Injectable({ providedIn: 'root' })
export class MauXetNghiemService {
    public resourceUrl = SERVER_API_URL + 'api/mau-xet-nghiems';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/mau-xet-nghiems';

    constructor(private http: HttpClient) {}

    create(mauXetNghiem: IMauXetNghiem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mauXetNghiem);
        return this.http
            .post<IMauXetNghiem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(mauXetNghiem: IMauXetNghiem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(mauXetNghiem);
        return this.http
            .put<IMauXetNghiem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMauXetNghiem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMauXetNghiem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMauXetNghiem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(mauXetNghiem: IMauXetNghiem): IMauXetNghiem {
        const copy: IMauXetNghiem = Object.assign({}, mauXetNghiem, {
            ngayLayMau: mauXetNghiem.ngayLayMau != null && mauXetNghiem.ngayLayMau.isValid() ? mauXetNghiem.ngayLayMau.toJSON() : null,
            ngayTiepNhan:
                mauXetNghiem.ngayTiepNhan != null && mauXetNghiem.ngayTiepNhan.isValid() ? mauXetNghiem.ngayTiepNhan.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.ngayLayMau = res.body.ngayLayMau != null ? moment(res.body.ngayLayMau) : null;
            res.body.ngayTiepNhan = res.body.ngayTiepNhan != null ? moment(res.body.ngayTiepNhan) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((mauXetNghiem: IMauXetNghiem) => {
                mauXetNghiem.ngayLayMau = mauXetNghiem.ngayLayMau != null ? moment(mauXetNghiem.ngayLayMau) : null;
                mauXetNghiem.ngayTiepNhan = mauXetNghiem.ngayTiepNhan != null ? moment(mauXetNghiem.ngayTiepNhan) : null;
            });
        }
        return res;
    }
}
