import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';

type EntityResponseType = HttpResponse<IThongTinKhaiQuat>;
type EntityArrayResponseType = HttpResponse<IThongTinKhaiQuat[]>;

@Injectable({ providedIn: 'root' })
export class ThongTinKhaiQuatService {
    public resourceUrl = SERVER_API_URL + 'api/thong-tin-khai-quats';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/thong-tin-khai-quats';

    constructor(private http: HttpClient) {}

    create(thongTinKhaiQuat: IThongTinKhaiQuat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(thongTinKhaiQuat);
        return this.http
            .post<IThongTinKhaiQuat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(thongTinKhaiQuat: IThongTinKhaiQuat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(thongTinKhaiQuat);
        return this.http
            .put<IThongTinKhaiQuat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IThongTinKhaiQuat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IThongTinKhaiQuat[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IThongTinKhaiQuat[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(thongTinKhaiQuat: IThongTinKhaiQuat): IThongTinKhaiQuat {
        const copy: IThongTinKhaiQuat = Object.assign({}, thongTinKhaiQuat, {
            thoiGianKhaiQuat:
                thongTinKhaiQuat.thoiGianKhaiQuat != null && thongTinKhaiQuat.thoiGianKhaiQuat.isValid()
                    ? thongTinKhaiQuat.thoiGianKhaiQuat.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.thoiGianKhaiQuat = res.body.thoiGianKhaiQuat != null ? moment(res.body.thoiGianKhaiQuat) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((thongTinKhaiQuat: IThongTinKhaiQuat) => {
                thongTinKhaiQuat.thoiGianKhaiQuat =
                    thongTinKhaiQuat.thoiGianKhaiQuat != null ? moment(thongTinKhaiQuat.thoiGianKhaiQuat) : null;
            });
        }
        return res;
    }
}
