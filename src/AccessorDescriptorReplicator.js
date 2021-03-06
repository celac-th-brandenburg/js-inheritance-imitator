/**
 * @name AccessorDescriptorReplicator
 * @module AccessorDescriptorReplicator
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file AccessorDescriptorReplicator.js contains the class
 AccessorDescriptorReplicator. The class AccessorDescriptorReplicator replicates
 (copies/imitates/mimics/mirrors/simulates) accessor descriptors.
 * @classdesc Replicates the accessor properties from an inherited instance,
 object, prototype or constructor function (extension object) on/to an
 inheriting instance, object or prototype (host object). This class should not
 be instantiated and is supposed to be used as a constructor function to access
 static methods.
 * @since 1.0.0
 */

import Cloner from './Cloner';
import Identifier from './Identifier';
import Logger from './Logger';

/**
 * @name AccessorDescriptorReplicator
 * @class AccessorDescriptorReplicator
 * @classdesc Replicates the accessor properties from an inherited instance,
 object, prototype or constructor function (extension object) on/to an
 inheriting instance, object or prototype (host object). This class should not
 be instantiated and is supposed to be used as a constructor function to access
 static methods.
 * @description AccessorDescriptorReplicator replicates
 (copies/imitates/mimics/mirrors/simulates) accessor descriptors.
 * @exports AccessorDescriptorReplicator the AccessorDescriptorReplicator class
 (constructor function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
export default class AccessorDescriptorReplicator {

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with an accessor descriptor
   * (getter and setter methods) from an instance and all objects in the
   * prototype chain of that instance
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, instance, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.instance the instance whose prototype chain should
   * provide properties to be mirorred on the target object
   * @param {Boolean} config.override whether the new mirorred properties should
   * override already existing properties of the host object
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with an accessor descriptor
   * (getter and setter methods) from a prototype and all objects in the
   * prototype chain of that prototype
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.prototype the prototype whose prototype chain should
   * provide properties to be mirorred on the target object
   * @param {Boolean} config.override whether the new mirorred properties should
   * override already existing properties of the host object
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with an accessor descriptor
   * (getter and setter methods) from an instance on a target object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, instance, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.instance the instance who should provide properties
   * to be mirorred on the target object
   * @param {Boolean} config.override whether the new mirorred properties should
   * override already existing properties of the host object
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with an accessor descriptor
   * (getter and setter methods) from a prototype on a target object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.prototype the prototype who should provide
   * properties to be mirorred on the target object
   * @param {Boolean} config.override whether the new mirorred properties should
   * override already existing properties of the host object
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates a (one) property with an accessor descriptor
   * (a getter and optionally a setter method) from an instance on a target
   * object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, instance, propertyName, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.instance the instance who has the property to be
   mirorred on the target object
   * @param {String} config.propertyName the name (key) of the property to be
   * mirrored/replicated
   * @param {Boolean} config.override whether the new mirorred property should
   * override an already existing property of the host object
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates a (one) property with an accessor descriptor
   * (a getter and optionally a setter method) from a prototype on a target
   * object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, propertyName, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.prototype the prototype who has the property to be
   mirorred on the target object
   * @param {String} config.propertyName the name (key) of the property to be
   * mirrored/replicated
   * @param {Boolean} config.override whether the new mirorred property should
   * override an already existing property of the host object
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through an accessor descriptor (getter and
   * optionally setter methods) from an instance
   * @param {Object} instance the instance whose property names (keys) should be
   * retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with an accessor descriptor (names of getter and setter methods)
   */
  static getAccessorDescriptorPropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return AccessorDescriptorReplicator
      .getAccessorDescriptorPropertyNamesFromPrototype( instancePrototype );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through an accessor descriptor (getter and
   * optionally setter methods) from a prototype
   * @param {Object} prototype the prototype whose property names (keys) should
   * be retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with an accessor descriptor (names of getter and setter methods)
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a property name (key) of a certain
   * prototype has an accessor descriptor (is the name of a getter and
   * optionally a setter method)
   * @param {Object} prototype the prototype (potentially) containing a property
   * with said name (key)
   * @param {String} propertyName the name of the property
   * @return {Boolean} whether or not the property exists and has an accessor
   * descriptor (corresponds to a getter and optionally a setter method)
   */
  static isSetterGetterPropertyName( prototype, propertyName ) {
    if ( !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) || !( propertyName in prototype ) )
      return false;
    const propertyDescriptor =
      Object.getOwnPropertyDescriptor( prototype, propertyName );
    return AccessorDescriptorReplicator.hasSetterOrGetter( propertyDescriptor );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a descriptor is an accessor
   * descriptor (has the fields [[Get]] and [[Set]])
   * @param {Object} propertyDescriptor the descriptor that should be tested
   * @return {Boolean} whether or not the property descriptor is an accessor
   * descriptor (has the fields [[Get]] and [[Set]])
   */
  static isAccessorDescriptor( propertyDescriptor ) {
    return AccessorDescriptorReplicator.hasSetterOrGetter( propertyDescriptor );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a descriptor is an accessor
   * descriptor (has the fields [[Get]] and [[Set]])
   * @param {Object} propertyDescriptor the descriptor that should be tested
   * @return {Boolean} whether or not the property descriptor is an accessor
   * descriptor (has the fields [[Get]] and [[Set]])
   */
  static hasSetterOrGetter( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return [ "get", "set" ].some( descriptorPart =>
      Identifier.isFunction( propertyDescriptor[ descriptorPart ] ) );
  }

  /**
   * @class AccessorDescriptorReplicator
   * @constructor AccessorDescriptorReplicator
   * @since 1.0.0
   * @deprecated since version 1.0.0
   * @description Calling the constructor function of
   AccessorDescriptorReplicator throws an error.
   * @classdesc Replicates the accessor properties from an inherited instance,
   object, prototype or constructor function (extension object) on/to an
   inheriting instance, object or prototype (host object). This class should not
   be instantiated and is supposed to be used as a constructor function to access
   static methods.
   * @summary The AccessorDescriptorReplicator class only provides static
   * methods and should not be instantiated.
   * @exception {Error} throws an Error when called
   */
  constructor() {
    throw new Error( 'The constructor function object' +
      ' AccessorDescriptorReplicator should not be instantiated.' );
  }
}