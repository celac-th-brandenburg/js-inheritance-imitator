import Extension from '../src/Extension';

export default class WorkingProfessional extends Extension {

  constructor( hostObject ) {
    super( hostObject );
    this._salary = void 0;
  }

  get salary() {
    return this._salary;
  }

  set salary( newSalary ) {
    this._salary = newSalary;
  }

  startVacation() {}

  static isExtension() {
    return true;
  }

}