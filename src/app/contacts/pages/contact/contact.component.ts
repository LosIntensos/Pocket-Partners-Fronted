import { Component, OnInit } from '@angular/core';
import { ContactService } from "../../services/contact.service";
import { AuthenticationService } from "../../../iam/services/authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public userProfile: any | null = null;  
  public userForm: FormGroup; 
  public isEditing: boolean = false; 
  public userId: number | undefined; 

  constructor(
    private contactService: ContactService,
    private authService: AuthenticationService,  
    private fb: FormBuilder  
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      photo: ['']
    });
  }

  
  getUserDetails() {
    this.authService.currentUserId.subscribe((userId: any) => {
      if (userId) {
        this.userId = userId; 
        
        this.contactService.getUserById(userId)
          .subscribe((profile: any) => {
            this.userProfile = profile;  

            
            if (profile.fullName) {
              const names = profile.fullName.split(' ');
              this.userProfile.firstName = names[0]; 
              this.userProfile.lastName = names.slice(1).join(' '); 
            }

            
            this.userForm.patchValue({
              firstName: this.userProfile.firstName || '',  
              lastName: this.userProfile.lastName || '',
              email: profile.email || '',
              phoneNumber: profile.phoneNumber || '',
              photo: profile.photo || ''
            });
          }, error => {
            console.error('Error al obtener el perfil del usuario:', error);
          });
      }
    });
  }

  ngOnInit() {
    this.getUserDetails();  
  }

  
  enableEditing() {
    this.isEditing = true;

    
    if (!this.userProfile.firstName || !this.userProfile.lastName) {
      const names = this.userProfile.fullName ? this.userProfile.fullName.split(' ') : ['', ''];
      this.userProfile.firstName = names[0];
      this.userProfile.lastName = names.slice(1).join(' ');
    }

    this.userForm.patchValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName
    });
  }

  
  saveChanges() {
    if (this.userForm.valid) {
      const updatedData = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phoneNumber: this.userForm.value.phoneNumber,
        photo: this.userForm.value.photo
      };

      this.contactService.updateUserById(this.userId, updatedData).subscribe({
        next: (response) => {
          
          this.userProfile.fullName = `${updatedData.firstName} ${updatedData.lastName}`;

          this.isEditing = false;
          this.getUserDetails(); 
        },
        error: (error) => {
          console.error('Error actualizando el perfil:', error);
        }
      });
    }
  }

  
  cancelEditing() {
    this.isEditing = false;
    this.getUserDetails(); 
  }
}
