import Cloner from '../src/Cloner';
import Logger from '../src/Logger';
import Student from './Student';
import Informatician from './Informatician';
import WorkingProfessional from './WorkingProfessional';

export class InformaticsStudent extends Student {

  #private() {
    Logger.trace();
  }

  constructor( name, age ) {
    super( name, age );
    new WorkingProfessional( this );
    this.super( "constructor" );
  }

  work( taskName, hours ) {
    try {
      this.#private();
    } catch ( err ) {
      Logger.trace( ``, err );
    }
    super.eat();
    this.super( "work", taskName, hours );
  }

}

Cloner.extend( InformaticsStudent.prototype, Informatician, null );
new WorkingProfessional( InformaticsStudent.prototype );

export class StudentOfInformatics extends Informatician {

  constructor( name, age ) {
    super( name, age );
    Cloner.extendFromInstance( this, new Student(), null, name, age );
  }

}

export class StudentInformatician {

  constructor( name, age ) {
    Cloner.extend( this, InformaticsStudent, null, name, age );
    console.log( this.instanceof( WorkingProfessional ) );
    console.log( this instanceof InformaticsStudent );
    console.log( this instanceof WorkingProfessional );
    console.log( this instanceof Student );
    this.work( "TaskA", 5 );
  }

}