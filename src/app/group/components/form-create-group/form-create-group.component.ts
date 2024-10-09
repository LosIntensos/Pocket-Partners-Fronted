import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GroupEntity } from '../../model/group.entity';
import { PartnerEntity } from '../../../pockets/model/partnerEntity';
import { PartnerService } from '../../../pockets/services/Partner.service';
import { GroupMembersService } from '../../services/group-members.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-form-create-group',
  templateUrl: './form-create-group.component.html',
  styleUrl: './form-create-group.component.css'
})
export class FormCreateGroupComponent implements OnInit {
  
  groupMembers = new FormControl();
  groupMembersList: any[] = [];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  isLinear = false;

  @Output() createGroup: EventEmitter<GroupEntity> = new EventEmitter<GroupEntity>();

  private group: GroupEntity = new GroupEntity();
  currentUserId: number = 0;

  constructor(private _formBuilder: FormBuilder, private groupMember: GroupMembersService, private authenticationService: AuthenticationService) { }
  ngOnInit() {
    this.authenticationService.currentUserId.subscribe((userId: any) => {
      this.currentUserId = userId;
    });
    this.groupMember.getAllMembersByIdGroup(1).subscribe((partners: any) => {
      console.log(partners);
      partners.forEach((partner: any) => {
        if (partner.userId !== this.currentUserId) {
          this.groupMembersList.push({ name: partner.fullName, id: partner.userId });
        }
      });
    });
  }

  onChanges(): void {
    this.firstFormGroup.valueChanges.subscribe(val => {
    });
  }

  createNewGroup() {
    this.group.name = this.firstFormGroup.get('firstCtrl')?.value as string;
    this.group.groupPhoto = this.firstFormGroup.get('secondCtrl')?.value as string;
    
    
    let currency: any = this.thirdFormGroup.get('firstCtrl')?.value;
    this.group.currency = currency;
    console.log(this.group);
    this.createGroup.emit(this.group);
  }
}
