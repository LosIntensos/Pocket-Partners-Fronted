import { Injectable } from '@angular/core';
import { GroupEntity } from '../model/group.entity';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { overrides } from 'chart.js/dist/core/core.defaults';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupMembersService extends BaseService<GroupEntity> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/groups';
  }

  getAllMembersByIdGroup(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.resourcePath()}/${id}/members`, this.httpOptions);
  }

  postGroupMember(groupId: number, memberId: number) {
    return this.http.post<GroupEntity>(`${this.resourcePath()}/${groupId}/members/${memberId}`, null, this.httpOptions);
  }
}
