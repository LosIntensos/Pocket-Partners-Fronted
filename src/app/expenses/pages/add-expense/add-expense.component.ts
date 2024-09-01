import { Component, OnInit } from '@angular/core';
import { PartnerEntity } from '../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/pockets/model/partnerEntity';
import { PartnerService } from '../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/pockets/services/Partner.service';
import { ExpensesEntity } from '../../model/expenses.entity';
import { ExpensesService } from '../../services/expenses.service';
import { AuthenticationService } from '../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/iam/services/authentication.service';
import { GroupService } from '../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/group/services/group.service';
import {GroupOperationsService} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/group/services/group-operations.service";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {
  userId: number = 0;
  joinedGroups: any = [];
  constructor(
    private partnerService: PartnerService,
    private expenseService: ExpensesService,
    private authenticationService: AuthenticationService,
    private groupService: GroupService,
    private groupOperationService: GroupOperationsService,
  ) { }
  user: PartnerEntity = new PartnerEntity();

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe((userId: any) => {
      this.userId = userId;
      this.partnerService.getPartnerById(userId).subscribe((partner: any) => {
        this.expenseService.getJoinedUserGroups(userId).subscribe((groups: any) => {
          groups.forEach((group: any) => {
            this.groupService.getById(group.groupId).subscribe((group: any) => {
              this.joinedGroups.push(group);

            });
          });
        });
      });
    });
  }

  onSubmit(expense: ExpensesEntity) {
    // delete un necessary properties
    let expenseClean: any = { ...expense };
    expenseClean.userId = this.userId;
    delete expenseClean.createdAt;
    delete expenseClean.updatedAt;
    this.expenseService.create(expenseClean).subscribe();
  }
}
