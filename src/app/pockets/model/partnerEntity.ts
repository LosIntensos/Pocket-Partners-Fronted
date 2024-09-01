export class PartnerEntity {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  photo: string;

  constructor(id: number = 0, fullName: string = '', email: string = '', phoneNumber: string = '', password: string = '', photo: string = '') {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.photo = photo;
  }

}
