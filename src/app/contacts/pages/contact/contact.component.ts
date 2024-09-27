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

  public userProfile: any | null = null;  // Para almacenar los detalles del perfil del usuario
  public userForm: FormGroup; // Formulario reactivo
  public isEditing: boolean = false; // Para activar el modo de edición
  public userId: number | undefined; // ID del usuario logueado

  constructor(
    private contactService: ContactService,
    private authService: AuthenticationService,  // Inyectar el servicio de autenticación
    private fb: FormBuilder  // Inyectar FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      photo: ['']
    });
  }

  // Método para obtener los detalles del usuario logueado por su ID
  getUserDetails() {
    this.authService.currentUserId.subscribe((userId: any) => {
      if (userId) {
        this.userId = userId; // Almacena el ID del usuario logueado
        // Usar el ID del usuario logueado para obtener su perfil
        this.contactService.getUserById(userId)
          .subscribe((profile: any) => {
            this.userProfile = profile;  // Almacenar los detalles del perfil

            // Separar fullName en firstName y lastName solo si fullName existe
            if (profile.fullName) {
              const names = profile.fullName.split(' ');
              this.userProfile.firstName = names[0]; // Primer nombre
              this.userProfile.lastName = names.slice(1).join(' '); // El resto como apellido
            }

            // Inicializar el formulario con los datos del perfil
            this.userForm.patchValue({
              firstName: this.userProfile.firstName || '',  // Fallback a '' si está vacío
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
    this.getUserDetails();  // Obtener los detalles del usuario al inicializar el componente
  }

  // Activar modo edición
  enableEditing() {
    this.isEditing = true;

    // Asegurarse de que firstName y lastName están definidos al iniciar edición
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

  // Guardar los cambios
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
          // Actualizar fullName después de guardar
          this.userProfile.fullName = `${updatedData.firstName} ${updatedData.lastName}`;

          this.isEditing = false;
          this.getUserDetails(); // Recargar el perfil con los cambios guardados
        },
        error: (error) => {
          console.error('Error actualizando el perfil:', error);
        }
      });
    }
  }

  // Cancelar edición
  cancelEditing() {
    this.isEditing = false;
    this.getUserDetails(); // Recargar el perfil sin cambios
  }
}
