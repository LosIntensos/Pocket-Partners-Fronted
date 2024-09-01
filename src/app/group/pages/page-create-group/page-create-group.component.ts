import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupEntity } from '../../model/group.entity';
import { Router } from '@angular/router';
import { GroupMembersService } from '../../services/group-members.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-page-create-group',
  templateUrl: './page-create-group.component.html',
  styleUrl: './page-create-group.component.css'
})
export class PageCreateGroupComponent {
  constructor(private groupService: GroupService, private groupMembersService: GroupMembersService, private router: Router, private authenticationService: AuthenticationService) { }
  userId: number = 0;
  createNewGroup(group: GroupEntity) {
    this.authenticationService.currentUserId.subscribe((userIdData: any) => {
      this.userId = userIdData;
      this.groupService.putANewGroup(group.name, group.groupPhoto, group.currency).subscribe((response) => {
        this.groupMembersService.postGroupMember(response.id, this.userId).subscribe((response) => {
          this.redirectToGroupList();
        });
      });
    }).unsubscribe();
  }

  redirectToGroupList() {
    this.router.navigate(['/groups']);
  }
}
