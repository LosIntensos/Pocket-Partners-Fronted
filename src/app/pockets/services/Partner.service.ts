import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../shared/services/base.service";
import { PartnerEntity } from "../model/partnerEntity";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService<PartnerEntity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/usersInformation';
  }

  getUserInformationById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.resourcePath()}/${userId}`, this.httpOptions);
  }

  
  getPartnerById(id: number): Observable<PartnerEntity> {
    return this.http.get<PartnerEntity>(`${this.resourcePath()}/userId/${id}`, this.httpOptions);
  }
}
