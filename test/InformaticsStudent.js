import Cloner from '../src/Cloner';
import Extension from '../src/Extension';
import Identifier from '../src/Identifier';
import Logger from '../src/Logger';
import {
  Mammal
} from './Student';
import Student from './Student';
import Informatician from './Informatician';
import Scientist from './Informatician';
import AccessorDescriptorReplicator from '../src/AccessorDescriptorReplicator';
import WorkingProfessional from './WorkingProfessional';

var Random = class extends Student {};

export class InformaticsStudent extends Student {

  #private() {
    Logger.trace();
  }

  constructor( name, age ) {
    // Object.defineProperty( InformaticsStudent, Symbol.hasInstance, {
    //   value: function( leftHandOperand ) {
    //     return Identifier.instanceof( leftHandOperand, InformaticsStudent, false );
    //   }
    // } );
    super( name, age );
    // Cloner.extend( this, Informatician, null, name, age );
    new WorkingProfessional( this );
    this.abc;
    new Random();
    delete this.eat;
    this.eat();
    // console.log( this.instanceof( Informatician ) );
    // console.log( this.instanceof( Scientist ) );
    // console.log( this.instanceof( WorkingProfessional ) );
    // console.log( this instanceof Extension );
    // this.work( "TaskA", 5 );
    // this.#private();
  }

  work( taskName, hours ) {
    console.log( super.age );
    try {
      this.#private();
    } catch ( err ) {
      Logger.trace( ``, err );
    }
    super.eat();
    this.super( "work", taskName, hours );
  }

  // static[ Symbol.hasInstance ]( leftHandOperand ) {
  //   return Identifier.instanceof( leftHandOperand, InformaticsStudent, false );
  // }

}

Cloner.extend( InformaticsStudent.prototype, Informatician, null );
new WorkingProfessional( InformaticsStudent.prototype );

export class StudentOfInformatics extends Informatician {

  constructor( name, age ) {
    super( name, age );
    Cloner.extendFromInstance( this, new Student(), null, name, age );
    // console.log( this.instanceof( Informatician ) );
    // console.log( this.instanceof( Student ) );
  }

}

export class StudentInformatician {

  constructor( name, age ) {
    let a = new InformaticsStudent();
    Cloner.extend( this, InformaticsStudent, null, name, age );
    // Cloner.extend( this, new Informatician(), null, name, age );
    // Cloner.extend( this, new Student(), null, name, age, faculty );
    // console.log( this.instanceof( Informatician ) );
    // console.log( this.instanceof( Student ) );
    console.log( this.instanceof( WorkingProfessional ) );
    console.log( this instanceof InformaticsStudent );
    console.log( this instanceof WorkingProfessional );
    console.log( this instanceof Student );
    console.log( a instanceof WorkingProfessional );
    console.log( a instanceof InformaticsStudent );
    this.work( "TaskA", 5 );
  }

}