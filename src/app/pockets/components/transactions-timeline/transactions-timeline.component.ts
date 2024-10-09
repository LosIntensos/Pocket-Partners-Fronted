import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../../iam/services/authentication.service';
import {PaymentEntity} from "../../../payments/model/payment-entity";
import {ExpensesEntity} from "../../../expenses/model/expenses.entity";
import {ExpensesService} from "../../../expenses/services/expenses.service";
import {PaymentService} from "../../../payments/services/payment.service";

@Component({
  selector: 'app-transactions-timeline',
  templateUrl: './transactions-timeline.component.html',
  styleUrls: ['./transactions-timeline.component.css']
})
export class TransactionsTimelineComponent implements OnInit, OnDestroy {
  public payments: PaymentEntity[] = [];
  public expenses: ExpensesEntity[] = [];
  private subscriptions: Subscription[] = [];
  private userId: number | undefined; 

  constructor(
    private expensesService: ExpensesService,
    private paymentService: PaymentService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    
    const authSubscription = this.authenticationService.currentUserId
      .subscribe((userId: number) => {
        this.userId = userId;
        if (this.userId) { 
          this.getExpenses();
          this.getPayments();
        }
      });

    this.subscriptions.push(authSubscription);
  }

  getExpenses(): void {
    if (this.userId !== undefined) {
      this.expensesService.getExpensesByUserId(this.userId)
        .subscribe(
          (expenses: ExpensesEntity[]) => {
            this.expenses = expenses;
          },
          (error: any) => {
            console.error('Error al obtener gastos:', error);
          }
        );
    }
  }

  getPayments(): void {
    if (this.userId !== undefined) {
      this.paymentService.getPaymentByUserId(this.userId)
        .subscribe(
          (payments: PaymentEntity[]) => {
            this.payments = payments;
          },
          (error: any) => {
            console.error('Error al obtener pagos:', error);
          }
        );
    }
  }

  ngOnDestroy() {
    
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
