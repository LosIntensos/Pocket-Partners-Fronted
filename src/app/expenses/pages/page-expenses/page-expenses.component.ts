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
  public searchText: string = '';
  public isLoading: boolean = true;

  constructor(public expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.isLoading = true; 
    this.expensesService.getExpenses().subscribe({
      next: (expenses: ExpensesEntity[]) => {
        this.expenses = expenses;
        console.log('Expenses loaded:', this.expenses);
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
        this.isLoading = false; 
      }
    });
  }

  handleExpenseDeleted(expenseId: number): void {
    this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
    this.loadExpenses();
  }

  filteredExpenses(): ExpensesEntity[] {
    if (!this.searchText) {
      return this.expenses;
    }
    return this.expenses.filter(expense =>
      expense.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
