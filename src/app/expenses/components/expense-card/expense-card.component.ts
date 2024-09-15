import { Component, Input, OnInit } from '@angular/core';
import { ExpensesEntity } from '../../model/expenses.entity';
import {ContactService} from "../../../contacts/services/contact.service";

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {
  @Input() expense: ExpensesEntity = new ExpensesEntity();
  user: any;

  constructor(private userService: ContactService) { }

  ngOnInit() {
    if (this.expense && this.expense.userId) {
      this.userService.getUserById(this.expense.userId).subscribe(user => {
        this.user = user;
        console.log('User loaded:', this.user);
      });
    }
  }
}
