import Logger from '../src/Logger';
import {
  Human
} from './Student';

export class Scientist extends Human {

  constructor( name, age ) {
    super( name, age );
  }

  get skillSet() {
    return void 0;
  }

  get education() {
    return void 0;
  }

  contact() {}

}

export default class Informatician extends Scientist {

  constructor( name, age ) {
    super( name, age );
  }

  get experience() {
    return void 0;
  }

  readCode() {}

  writeCode() {}

  work( taskName, hours ) {
    Logger.trace( taskName + " " + hours );
  }

}