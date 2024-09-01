import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpensesEntity } from '../../model/expenses.entity';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerEntity } from '../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/pockets/model/partnerEntity';
import {PaymentEntity} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/payments/model/payment-entity";
import {PaymentService} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/payments/services/payment.service";
import {GroupMembersService} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/group/services/group-members.service";
import {ExpensesService} from "../../services/expenses.service";
import {GroupOperationsService} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/group/services/group-operations.service";
import {GroupEntity} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/group/model/group.entity";
import {OperationEntity} from "../../../../../../../../../../Downloads/PocketPartners-master/PocketPartners-master/src/app/group/model/operation-entity";

@Component({
  selector: 'app-form-expense',
  templateUrl: './form-expense.component.html',
  styleUrl: './form-expense.component.css'
})
export class FormExpenseComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  @Input() user: PartnerEntity = new PartnerEntity();
  @Input() joinedGroups: any;
  private Expense = new ExpensesEntity();
  @Output() onAddExpense: EventEmitter<ExpensesEntity> = new EventEmitter<ExpensesEntity>();
  constructor(private _formBuilder: FormBuilder, private router: Router,private paymentService: PaymentService, private groupMembersService: GroupMembersService, private expenseService: ExpensesService, private groupOperationService: GroupOperationsService) { }

  onSubmit() {
    this.Expense.name = this.firstFormGroup.value.firstCtrl as string;
    this.Expense.amount = this.thirdFormGroup.value.firstCtrl as unknown as number;
    this.Expense.userId = this.user.id;
    this.Expense.groupId = this.fourthFormGroup.value.firstCtrl as unknown as number;
    this.onAddExpense.emit(this.Expense);

    const groupId = this.Expense.groupId;
    this.groupMembersService.getAllMembersByIdGroup(groupId).subscribe((members: any[]) => {
      this.expenseService.getExpensesByGroupId(groupId).subscribe((expenses: any) => {
        const paymentAmount = this.Expense.amount / members.length;
        const expenseId = expenses[expenses.length - 1].id;
        const groupOperation = new OperationEntity();

        console.log(expenses);
        members.forEach((member: any) => {
          const payment = new PaymentEntity();
          payment.description = this.firstFormGroup.value.firstCtrl as string;
          const desc = this.firstFormGroup.value.firstCtrl as string;

          this.paymentService.create({description:desc, amount:paymentAmount, userId:member.userId, expenseId:expenseId}).subscribe((payment: any) => {
            const paymentId = payment.id;

            const groupID = this.fourthFormGroup.value.firstCtrl as unknown as number;
            this.groupOperationService.create({groupId:groupID ,expenseId:expenseId, paymentId:paymentId}).subscribe();
          });
        });
      });
    });

    // redirect to expenses list
    this.router.navigate(['/expenses']);
  }

}
