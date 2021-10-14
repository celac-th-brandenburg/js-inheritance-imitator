export class Mammal {

  constructor( weight ) {
    Object.defineProperty( this, "_weight", {
      value: weight,
      writable: true,
      configurable: true,
      enumarable: false
    } );
  }

  get weight() {
    return this._weight;
  }

  eat() {}

}

export class Human extends Mammal {

  constructor( name, age, weight ) {
    super( weight );
    this._name = name;
  }

  get name() {
    return this._name;
  }

  breathe() {}

}

export default class Student extends Human {

  constructor( name, age ) {
    super( name, age );
    this._credits = 0;
  }

  addCredits( amountOfCreditsToAdd ) {
    this._credits += amountOfCreditsToAdd;
  }

  get credits() {
    return this._credits;
  }

}