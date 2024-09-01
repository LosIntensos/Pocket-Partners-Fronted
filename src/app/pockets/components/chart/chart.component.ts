import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ExpensesService } from "../../../expenses/services/expenses.service";
import {ExpensesEntity} from "../../../expenses/model/expenses.entity";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  dataMonth: string[] = [];
  dataAmount: number[] = [];
  dataColor: string[] = [];

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    const userId = 1; // ID del usuario para excluir, reemplázalo con el ID real o pasa el ID como un parámetro al componente.

    this.expensesService.getExpensesByUserId(userId).subscribe((expenses: ExpensesEntity[]) => {
      expenses.forEach(expense => {
        if (expense.createdAt) {
          this.dataMonth.push(this.formatDate(expense.createdAt));
          this.dataAmount.push(expense.amount);
          this.dataColor.push(this.getRandomColor());
        }
      });
      this.showChart();
    });
  }

  showChart() {
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.dataMonth,
        datasets: [{
          label: '# of Money Used',
          data: this.dataAmount,
          borderWidth: 1,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-GB'); // Ajusta el formato según tus necesidades
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
