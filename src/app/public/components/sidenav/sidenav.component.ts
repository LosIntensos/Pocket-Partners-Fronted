import {Component, Input} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { trigger, transition, style, animate } from '@angular/animations';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatListModule} from "@angular/material/list";

// @ts-ignore
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink,
    NgForOf,
    MatIcon,
    MatBadgeModule,
    MatListModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidenavComponent {
  @Input() isBreeder: boolean;

  constructor() {
    this.isBreeder = true;
  }

  getSidebarButtons(): string[] {
    if (this.isBreeder) {
      return ["Mi granja", "Asesores", "Mis animales", "Registro", "Notificaciones"];
    } else {
      return ["Clientes", "Notificaciones", "Mis publicaciones"];
    }
  }

  getButtonRoute(button: string): string {
    switch (button) {
      case "Mi granja":
        return "/mi-granja";
      case "Asesores":
        return "/asesores";
      case "Mis animales":
        return "/mis-animales";
      case "Registro":
        return "/registro";
      case "Notificaciones":
        return "/notificaciones";
      case "Clientes":
        return "/clientes";
      case "Mis publicaciones":
        return "/mis-publicaciones";
      default:
        return "/";
    }
  }
}
