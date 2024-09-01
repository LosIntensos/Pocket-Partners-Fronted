export class ExpensesEntity {
  id: number
  name: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  groupId: number;
  constructor(id: number = 0,name: string = '', amount: number = 0, createdAt: Date = new Date(), updatedAt: Date = new Date(), userId: number = 0, groupId: number = 0) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.groupId = groupId;
  }
}
