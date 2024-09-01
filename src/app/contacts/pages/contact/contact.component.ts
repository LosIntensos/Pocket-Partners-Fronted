import {Component, OnInit} from '@angular/core';
import {ContactEntity} from "../../model/contact.entity";
import {ContactService} from "../../services/contact.service";
import {MatDialog} from "@angular/material/dialog";
import {FormCreateContactComponent} from "../../components/form-create-contact/form-create-contact.component";
import {GroupService} from "../../../group/services/group.service";

@Component({
  selector: 'app-components',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  public contacts: ContactEntity[] = [];
  constructor(private contactService: ContactService, private dialog: MatDialog) { }

  gelAllContacts() {
    this.contactService.getAll()
      .subscribe((contacts: any) => {
        this.contacts = contacts;
      });
  }

  openPopup() {
    var _popup = this.dialog.open(FormCreateContactComponent,{width: '40%'});
    _popup.afterClosed().subscribe(result => {
      this.gelAllContacts();
    } );
  }

  ngOnInit() {
    this.gelAllContacts();
  }

}
