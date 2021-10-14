import Cloner from './Cloner';
import Identifier from './Identifier';
import Logger from './Logger';

export default class AccessorDescriptorReplicator {

  static mirrorGettersAndSettersFromInstanceOnWholePrototypeChain( {
    hostObject,
    instance,
    override = false
  } ) {
    if ( !Identifier.isObject( instance ) ) return false;
    return AccessorDescriptorReplicator
      .mirrorGettersAndSettersFromPrototypeOnWholePrototypeChain( {
        hostObject: hostObject,
        prototype: Object.getPrototypeOf( instance ),
        override: override
      } );
  }

  static mirrorGettersAndSettersFromPrototypeOnWholePrototypeChain( {
    hostObject,
    prototype,
    override = false
  } ) {
    let currentSource = prototype;
    if ( !AccessorDescriptorReplicator.mirrorGettersAndSettersFromPrototype( {
        hostObject: hostObject,
        prototype: currentSource,
        override: override
      } ) ) return false;
    let lastReplicationSuccessfull = true;
    while ( lastReplicationSuccessfull ) {
      currentSource = Object.getPrototypeOf( currentSource );
      if ( !Identifier.isObject( currentSource ) ) break;
      const constructorName = currentSource.constructor.name;
      if ( !Identifier.isString( constructorName ) || [
          "Object", "Function"
        ].indexOf( constructorName ) >= 0 ) break;
      lastReplicationSuccessfull = AccessorDescriptorReplicator
        .mirrorGettersAndSettersFromPrototype( {
          hostObject: hostObject,
          prototype: currentSource,
          override: false
        } );
    }
    return lastReplicationSuccessfull;
  }

  static mirrorGettersAndSettersFromInstance( {
    hostObject,
    instance,
    override = false
  } ) {
    if ( !Identifier.isObject( instance ) ) return false;
    return AccessorDescriptorReplicator.mirrorGettersAndSettersFromPrototype( {
      hostObject: hostObject,
      prototype: Object.getPrototypeOf( instance ),
      override: override
    } );
  }

  static mirrorGettersAndSettersFromPrototype( {
    hostObject,
    prototype,
    override = false
  } ) {
    if ( !Identifier.isObject( hostObject ) ) return false;
    if ( !Object.isExtensible( hostObject ) )
      return Logger.trace( `Could not assign/copy/mirror getter and setter` +
        ` (accessor descriptor) properties to a non extensible object.`, null, false );
    const getterSetterPropertyNames = AccessorDescriptorReplicator
      .getAccessorDescriptorPropertyNamesFromPrototype( prototype );
    if ( !Identifier.isIterable( getterSetterPropertyNames ) ) return false;
    let mirroredPropertiesCounter = 0;
    for ( let propertyName of getterSetterPropertyNames ) {
      if ( !AccessorDescriptorReplicator.mirrorGetterSetterFromPrototype( {
          hostObject: hostObject,
          prototype: prototype,
          propertyName: propertyName,
          override: override
        } ) ) continue;
      mirroredPropertiesCounter++;
    }
    return mirroredPropertiesCounter == getterSetterPropertyNames.length;
  }

  static mirrorGetterSetterFromInstance( {
    hostObject,
    instance,
    propertyName,
    override = false
  } ) {
    if ( !Identifier.isObject( instance ) ) return false;
    return AccessorDescriptorReplicator.mirrorGetterSetterFromPrototype( {
      hostObject: hostObject,
      prototype: Object.getPrototypeOf( instance ),
      propertyName: propertyName,
      override: override
    } );
  }

  static mirrorGetterSetterFromPrototype( {
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
      get: propertyDescriptor.get,
      set: propertyDescriptor.set,
      configurable: !!propertyDescriptor.configurable,
      enumerable: !!propertyDescriptor.enumerable
    } );
    return true;
  }

  static getAccessorDescriptorPropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return AccessorDescriptorReplicator
      .getAccessorDescriptorPropertyNamesFromPrototype( instancePrototype );
  }

  static getAccessorDescriptorPropertyNamesFromPrototype( prototype ) {
    if ( !Identifier.isObject( prototype ) )
      return Logger.trace( `Could not identify and filter getter and setter` +
        ` properties from an invalid prototype.`, null, void 0 );
    const getterSetterPropertyNames = Object.getOwnPropertyNames( prototype )
      .filter( propertyName => {
        return AccessorDescriptorReplicator
          .isSetterGetterPropertyName( prototype, propertyName );
      } );
    return getterSetterPropertyNames;
  }

  static isSetterGetterPropertyName( prototype, propertyName ) {
    if ( !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) || !( propertyName in prototype ) )
      return false;
    const propertyDescriptor =
      Object.getOwnPropertyDescriptor( prototype, propertyName );
    return AccessorDescriptorReplicator.hasSetterOrGetter( propertyDescriptor );
  }

  static isAccessorDescriptor( propertyDescriptor ) {
    return AccessorDescriptorReplicator.hasSetterOrGetter( propertyDescriptor );
  }

  static hasSetterOrGetter( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return [ "get", "set" ].some( descriptorPart =>
      Identifier.isFunction( propertyDescriptor[ descriptorPart ] ) );
  }

}