import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';

type EntityResponseType = HttpResponse<IHoSoThanNhan>;
type EntityArrayResponseType = HttpResponse<IHoSoThanNhan[]>;

@Injectable({ providedIn: 'root' })
export class HoSoThanNhanService {
    public resourceUrl = SERVER_API_URL + 'api/ho-so-than-nhans';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/ho-so-than-nhans';

    constructor(private http: HttpClient) {}

    create(hoSoThanNhan: IHoSoThanNhan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hoSoThanNhan);
        return this.http
            .post<IHoSoThanNhan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(hoSoThanNhan: IHoSoThanNhan): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hoSoThanNhan);
        return this.http
            .put<IHoSoThanNhan>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHoSoThanNhan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHoSoThanNhan[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHoSoThanNhan[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(hoSoThanNhan: IHoSoThanNhan): IHoSoThanNhan {
        const copy: IHoSoThanNhan = Object.assign({}, hoSoThanNhan, {
            namSinh: hoSoThanNhan.namSinh != null && hoSoThanNhan.namSinh.isValid() ? hoSoThanNhan.namSinh.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.namSinh = res.body.namSinh != null ? moment(res.body.namSinh) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((hoSoThanNhan: IHoSoThanNhan) => {
                hoSoThanNhan.namSinh = hoSoThanNhan.namSinh != null ? moment(hoSoThanNhan.namSinh) : null;
            });
        }
        return res;
    }
}
