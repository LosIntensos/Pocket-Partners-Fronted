import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactEntity} from "../../model/contact.entity";
import {FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-form-create-contact',
  templateUrl: './form-create-contact.component.html',
  styleUrl: './form-create-contact.component.css'
})
export class FormCreateContactComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private contactService: ContactService, private ref: MatDialogRef<FormCreateContactComponent>, public buildr: FormBuilder) { }

  private contact: ContactEntity = new ContactEntity();

  inputdata: any;
  editdata: any;


  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata(code: any) {
    this.contactService.getUserById(code).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({name:this.editdata.name,email:this.editdata.email,phone:this.editdata.phone,photo:this.editdata.photo})
    });
  }

  closePopUp(){
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    name: this.buildr.control(''),
    email: this.buildr.control(''),
    phone: this.buildr.control(''),
    photo: this.buildr.control(''),
  });


  Saveuser() {
    this.contactService.saveUser(this.myform.value).subscribe(res => {
      this.closePopUp();
    });
  }




}
