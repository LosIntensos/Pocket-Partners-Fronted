import { Component, OnInit } from '@angular/core';
import { PartnerEntity } from "../../model/partnerEntity";
import { PartnerService } from "../../services/Partner.service";
import { ExpensesEntity } from "../../../expenses/model/expenses.entity";
import { ExpensesService } from "../../../expenses/services/expenses.service";
import { AuthenticationService } from '../../../iam/services/authentication.service';
import {GroupEntity} from "../../../group/model/group.entity";
import {GroupService} from "../../../group/services/group.service";
import {PaymentService} from "../../../payments/services/payment.service";
import {PaymentEntity} from "../../../payments/model/payment-entity";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  partner: PartnerEntity = new PartnerEntity();
  public groups: GroupEntity[] = [];
  public groupPayments: { [key: number]: PaymentEntity[] } = {};
  currentUsername: any;
  userId: any;
  expenses: ExpensesEntity[] = [];

  constructor(private partnerService: PartnerService, private expensesService: ExpensesService, private authenticationService: AuthenticationService, private groupService: GroupService, private paymentService: PaymentService,) { }

  ngOnInit(): void {
    this.authenticationService.currentUserId.subscribe(userId => {
      this.userId = userId;
      this.getPartnerById(userId);
      this.authenticationService.currentUsername.subscribe(username => {
        this.currentUsername = username;
        this.getExpenses();
      });
    });
  }

  getPartnerById(id: number): void {
    this.partnerService.getPartnerById(id)
      .subscribe(
        (partner: PartnerEntity) => {
          this.partner = partner;
        },
        (error) => {
          console.error('Error al obtener usuario por ID:', error);
        }
      );
  }

  getExpenses(): void {
    this.expensesService.getExpenses()
      .subscribe(
        (expenses: ExpensesEntity[]) => {
          // Filtrar los gastos del usuario especificado
          // @ts-ignore
          this.expenses = expenses.filter(expense => expense.userId !== this.userId);
        },
        (error) => {
          console.error('Error al obtener gastos:', error);
        }
      );
  }

  generateUserReport() {
    // Obtener los gastos del usuario
    this.expensesService.getExpensesByUserId(this.userId).subscribe(expenses => {
      // Obtener los grupos a los que pertenece el usuario
      this.groupService.getById(this.userId).subscribe(groups => {
        // Validar si hay gastos y grupos
        if (expenses.length === 0) {
          alert('No hay gastos disponibles para generar el reporte.');
          return;
        }

        const reportData = {
          expenses: expenses,
          groups: groups,
          totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0)
        };

        // Llama a la función para descargar el reporte
        this.downloadReport(reportData);
      });
    });
  }

  downloadReport(reportData: any) {
    const csvRows = [];

    // Agregar encabezados para gastos
    csvRows.push(['Gastos', '', '', '']);
    const expenseHeaders = ['Expense Name', 'Amount', 'Created At', 'Uploaded By'];
    csvRows.push(expenseHeaders.join(','));

    // Agregar datos de gastos
    reportData.expenses.forEach((expense: { name: any; amount: any; createdAt: string | number | Date; uploadedBy: any; }) => {
      const row = [
        expense.name,
        expense.amount,
        new Date(expense.createdAt).toLocaleDateString(),
        expense.uploadedBy
      ];
      csvRows.push(row.join(','));
    });

    // Agregar total de gastos
    csvRows.push(['', 'Total Expenses:', reportData.totalExpenses, '']);

    // Agregar encabezados para grupos
    csvRows.push(['', '', '', '']);
    csvRows.push(['Grupos', '', '', '']);
    const groupHeaders = ['Group Name', 'Group ID'];
    csvRows.push(groupHeaders.join(','));

    // Agregar datos de grupos
    if (reportData.groups.length > 0) {
      reportData.groups.forEach((group: { name: any; id: any; }) => {
        const row = [group.name, group.id];
        csvRows.push(row.join(','));
      });
    } else {
      csvRows.push(['No hay grupos disponibles.', '', '']);
    }

    // Crear una cadena CSV
    const csvString = csvRows.join('\n');

    // Crear un blob de los datos CSV
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'user_expenses_report.csv');
    a.click(); // Simula un clic en el enlace para descargar
    window.URL.revokeObjectURL(url); // Libera el objeto URL
  }


}
