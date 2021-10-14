import Cloner from './Cloner';
import Identifier from './Identifier';

export default class Extension {

  constructor( hostObject, config = void 0 ) {
    if ( Identifier.isObject( hostObject ) )
      Cloner.extendFromInstance( hostObject, this, config );
  }

}