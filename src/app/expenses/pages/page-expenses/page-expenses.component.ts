import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { ExpensesEntity } from '../../model/expenses.entity';

@Component({
  selector: 'app-page-expenses',
  templateUrl: './page-expenses.component.html',
  styleUrls: ['./page-expenses.component.css']
})
export class PageExpensesComponent implements OnInit {
  public expenses: ExpensesEntity[] = [];

  constructor(public expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expensesService.getAll().subscribe((expense: any) => {
      this.expenses = expense;
    });
  }

  handleExpenseDeleted(expenseId: number): void {
    this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
  }
}