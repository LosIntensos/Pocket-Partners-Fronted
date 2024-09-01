export class OperationEntity {
  id: number;
  groupId: number;
  expenseId: number;
  paymentsId: number;

  constructor(id: number = 0, groupId: number = 0, expenseId: number = 0, paymentsId: number = 0) {
    this.id = id;
    this.groupId = groupId;
    this.expenseId = expenseId;
    this.paymentsId = paymentsId;
  };
}
