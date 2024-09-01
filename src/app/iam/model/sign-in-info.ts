export class SignInInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photo: string;
  email: string;
  userId: number;
  constructor(firstName: string = '', lastName: string = '', phoneNumber: string = '', photo: string = '', email: string = '', userId: number = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.photo = photo;
    this.email = email;
    this.userId = userId;
  }
}
