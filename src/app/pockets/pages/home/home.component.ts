import { Component, OnInit } from '@angular/core';
import { PartnerEntity } from "../../model/partnerEntity";
import { PartnerService } from "../../services/Partner.service";
import { ExpensesEntity } from "../../../expenses/model/expenses.entity";
import { ExpensesService } from "../../../expenses/services/expenses.service";
import { AuthenticationService } from '../../../iam/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  partner: PartnerEntity = new PartnerEntity();
  currentUsername: any;
  userId: any;
  expenses: ExpensesEntity[] = [];

  constructor(private partnerService: PartnerService, private expensesService: ExpensesService, private authenticationService: AuthenticationService) { }

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
}
