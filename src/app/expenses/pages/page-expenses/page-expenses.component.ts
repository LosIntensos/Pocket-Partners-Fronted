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

  constructor(public expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.expensesService.getExpenses().subscribe((expenses: ExpensesEntity[]) => {
      this.expenses = expenses;
      console.log(this.expenses);
    });
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

