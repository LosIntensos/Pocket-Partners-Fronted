import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {PartnerEntity} from "../model/partnerEntity";
import {catchError, Observable} from "rxjs";
import {ChartEntity} from "../model/chart.entity";

@Injectable({
  providedIn: 'root'
})
export class ChartService extends BaseService<ChartEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/payments';
  }

  getAllChartData(): Observable<any[]> {
    return this.http.get<any[]>(this.resourcePath(), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
