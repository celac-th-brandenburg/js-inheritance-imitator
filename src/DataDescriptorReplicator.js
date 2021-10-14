import Cloner from './Cloner';
import Identifier from './Identifier';
import Logger from './Logger';

const NON_CLONABLE_PROPERTY_NAMES = [ "constructor", "super",
  "instanceof", "__extends"
];

export default class DataDescriptorReplicator {

  static mirrorDataDescriptorsFromInstanceOnWholePrototypeChain( {
    hostObject,
    instance,
    mirrorFunctions = true,
    mirrorOthers = true,
    overrideFunctions = false,
    overrideOthers = false
  } ) {
    if ( !Identifier.isObject( instance ) ) return false;
    return DataDescriptorReplicator
      .mirrorDataDescriptorsFromPrototypeOnWholePrototypeChain( {
        hostObject: hostObject,
        prototype: Object.getPrototypeOf( instance ),
        mirrorFunctions: mirrorFunctions,
        mirrorOthers: mirrorOthers,
        overrideFunctions: overrideFunctions,
        overrideOthers: overrideOthers
      } );
  }

  static mirrorDataDescriptorsFromPrototypeOnWholePrototypeChain( {
    hostObject,
    prototype,
    mirrorFunctions = true,
    mirrorOthers = true,
    overrideFunctions = false,
    overrideOthers = false
  } ) {
    let currentSource = prototype;
    if ( !DataDescriptorReplicator.mirrorDataDescriptorsFromPrototype( {
        hostObject: hostObject,
        prototype: currentSource,
        mirrorFunctions: mirrorFunctions,
        mirrorOthers: mirrorOthers,
        overrideFunctions: overrideFunctions,
        overrideOthers: overrideOthers
      } ) ) return false;
    let lastReplicationSuccessfull = true;
    while ( lastReplicationSuccessfull ) {
      currentSource = Object.getPrototypeOf( currentSource );
      if ( !Identifier.isObject( currentSource ) ) break;
      const constructorName = currentSource.constructor.name;
      if ( !Identifier.isString( constructorName ) || [
          "Object", "Function"
        ].indexOf( constructorName ) >= 0 ) break;
      lastReplicationSuccessfull = DataDescriptorReplicator
        .mirrorDataDescriptorsFromPrototype( {
          hostObject: hostObject,
          prototype: currentSource,
          mirrorFunctions: mirrorFunctions,
          mirrorOthers: mirrorOthers,
          overrideFunctions: overrideFunctions,
          overrideOthers: overrideOthers
        } );
    }
    return lastReplicationSuccessfull;
  }

  static mirrorDataDescriptorsFromInstance( {
    hostObject,
    instance,
    mirrorFunctions = true,
    mirrorOthers = true,
    overrideFunctions = false,
    overrideOthers = false
  } ) {
    if ( !Identifier.isObject( instance ) ) return false;
    return DataDescriptorReplicator.mirrorGettersAndSettersFromPrototype( {
      hostObject: hostObject,
      prototype: Object.getPrototypeOf( instance ),
      mirrorFunctions: mirrorFunctions,
      mirrorOthers: mirrorOthers,
      overrideFunctions: overrideFunctions,
      overrideOthers: overrideOthers
    } );
  }

  static mirrorDataDescriptorsFromPrototype( {
    hostObject,
    prototype,
    mirrorFunctions = true,
    mirrorOthers = true,
    overrideFunctions = false,
    overrideOthers = false
  } ) {
    if ( !mirrorFunctions && !mirrorOthers ) return false;
    if ( !Identifier.isObject( hostObject ) ) return false;
    if ( !Object.isExtensible( hostObject ) )
      return Logger.trace( `Could not assign/copy/mirror getter and setter` +
        ` (accessor descriptor) properties to a non extensible object.`, null, false );
    if ( mirrorFunctions ) {
      const functionPropertyNames = DataDescriptorReplicator
        .getFunctionPropertyNamesFromPrototype( prototype );
      if ( Identifier.isIterable( functionPropertyNames ) )
        for ( let propertyName of functionPropertyNames ) {
          DataDescriptorReplicator.mirrorDataDescriptorFromPrototype( {
            hostObject: hostObject,
            prototype: prototype,
            propertyName: propertyName,
            override: overrideFunctions
          } );
        }
    }
    if ( !mirrorOthers ) return true;
    const dataValuePropertyNames = DataDescriptorReplicator
      .getDataValuePropertyNamesFromPrototype( prototype );
    if ( !Identifier.isIterable( dataValuePropertyNames ) ) return true;
    for ( let propertyName of dataValuePropertyNames ) {
      DataDescriptorReplicator.mirrorDataDescriptorFromPrototype( {
        hostObject: hostObject,
        prototype: prototype,
        propertyName: propertyName,
        override: overrideOthers
      } );
    }
    return true;
  }

  static mirrorDataDescriptorFromPrototype( {
    hostObject,
    prototype,
    propertyName,
    override = false
  } ) {
    const propertyDescriptor = Cloner.getClonablePropertyDescriptor( {
      hostObject: hostObject,
      prototype: prototype,
      propertyName: propertyName,
      override: !!override
    } );
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    Object.defineProperty( hostObject, propertyName, {
      value: propertyDescriptor.value,
      writable: propertyDescriptor.writable,
      configurable: !!propertyDescriptor.configurable,
      enumerable: !!propertyDescriptor.enumerable
    } );
    return true;
  }

  static getDataDescriptorPropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return DataDescriptorReplicator
      .getDataDescriptorPropertyNamesFromPrototype( instancePrototype );
  }

  static getFunctionPropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return DataDescriptorReplicator
      .getFunctionPropertyNamesFromPrototype( instancePrototype );
  }

  static getDataValuePropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return DataDescriptorReplicator
      .getDataValuePropertyNamesFromPrototype( instancePrototype );
  }

  static getDataDescriptorPropertyNamesFromPrototype( prototype ) {
    if ( !Identifier.isObject( prototype ) )
      return Logger.trace( `Could not identify and filter data descriptor` +
        ` properties from an invalid prototype.`, null, void 0 );
    const dataDescriptorPropertyNames = Object.getOwnPropertyNames( prototype )
      .filter( propertyName => {
        return DataDescriptorReplicator
          .isDataDescriptorPropertyName( prototype, propertyName );
      } );
    return dataDescriptorPropertyNames;
  }

  static getFunctionPropertyNamesFromPrototype( prototype ) {
    if ( !Identifier.isObject( prototype ) )
      return Logger.trace( `Could not identify and filter function` +
        ` properties from an invalid prototype.`, null, void 0 );
    const functionPropertyNames = Object.getOwnPropertyNames( prototype )
      .filter( propertyName => {
        return DataDescriptorReplicator
          .isFunctionPropertyName( prototype, propertyName );
      } );
    return functionPropertyNames;
  }

  static getDataValuePropertyNamesFromPrototype( prototype ) {
    if ( !Identifier.isObject( prototype ) )
      return Logger.trace( `Could not identify and filter data value` +
        ` properties from an invalid prototype.`, null, void 0 );
    const dataValuePropertyNames = Object.getOwnPropertyNames( prototype )
      .filter( propertyName => {
        return DataDescriptorReplicator
          .isDataValuePropertyName( prototype, propertyName );
      } );
    return dataValuePropertyNames;
  }

  static isDataDescriptorPropertyName( prototype, propertyName ) {
    if ( !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) || !( propertyName in prototype ) ||
      NON_CLONABLE_PROPERTY_NAMES.indexOf( propertyName ) >= 0 )
      return false;
    const propertyDescriptor =
      Object.getOwnPropertyDescriptor( prototype, propertyName );
    return DataDescriptorReplicator.isDataDescriptor( propertyDescriptor );
  }

  static isFunctionPropertyName( prototype, propertyName ) {
    if ( !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) || !( propertyName in prototype ) ||
      NON_CLONABLE_PROPERTY_NAMES.indexOf( propertyName ) >= 0 )
      return false;
    const propertyDescriptor =
      Object.getOwnPropertyDescriptor( prototype, propertyName );
    return DataDescriptorReplicator
      .isFunctionPropertyDescriptor( propertyDescriptor );
  }

  static isDataValuePropertyName( prototype, propertyName ) {
    if ( !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) || !( propertyName in prototype ) ||
      NON_CLONABLE_PROPERTY_NAMES.indexOf( propertyName ) >= 0 )
      return false;
    const propertyDescriptor =
      Object.getOwnPropertyDescriptor( prototype, propertyName );
    return DataDescriptorReplicator
      .isDataValuePropertyDescriptor( propertyDescriptor );
  }

  static isDataDescriptor( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return Reflect.has( propertyDescriptor, "value" );
  }

  static isFunctionPropertyDescriptor( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return Identifier.isFunction( propertyDescriptor.value );
  }

  static isDataValuePropertyDescriptor( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return Reflect.has( propertyDescriptor, "value" ) &&
      !Identifier.isFunction( propertyDescriptor.value );
  }

}