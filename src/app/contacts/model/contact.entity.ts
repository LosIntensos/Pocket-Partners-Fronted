export class ContactEntity {

  id: number;
  fullName?: string;
  email: string;
  phoneNumber: string;
  photo: string;

  constructor(id: number = 0, fullName: string = '', email: string = '', phoneNumber: string = '', photo: string = '') {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.photo = photo;
  }

}
