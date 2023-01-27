export class User {
  private id: number;
  private _name: string;
  private _emailId: string;
  private static uderId = 0;

  constructor(name: string, emailId: string) {
    this.id = ++User.uderId;
    this._name = name;
    this._emailId = emailId;
  }

  get emailId(): string {
    return this._emailId;
  }

  get name(): string {
    return this._name;
  }
}