/**
 * @name DataDescriptorReplicator
 * @module DataDescriptorReplicator
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file DataDescriptorReplicator.js contains the class
 DataDescriptorReplicator. The class DataDescriptorReplicator replicates
 (copies/imitates/mimics/mirrors/simulates) data descriptors (methods & others).
 * @classdesc Replicates the data properties (methods & others) from an
 inherited instance, object, prototype or constructor function (extension object) on/to an
 inheriting instance, object or prototype (host object). This class should not
 be instantiated and is supposed to be used as a constructor function to access
 static methods.
 * @since 1.0.0
 */

import Cloner from './Cloner';
import Identifier from './Identifier';
import Logger from './Logger';

const NON_CLONABLE_PROPERTY_NAMES = [ "constructor", "super",
  "instanceof", "__extends"
];

/**
 * @name DataDescriptorReplicator
 * @class DataDescriptorReplicator
 * @classdesc Replicates the data properties (methods & others) from an
 inherited instance, object, prototype or constructor function (extension object) on/to an
 inheriting instance, object or prototype (host object). This class should not
 be instantiated and is supposed to be used as a constructor function to access
 static methods.
 * @description DataDescriptorReplicator replicates
 (copies/imitates/mimics/mirrors/simulates) data descriptors.
 * @exports DataDescriptorReplicator the AccessorDescriptorReplicator class
 (constructor function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
export default class DataDescriptorReplicator {

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with a data descriptor
   * (with the vields [[Value]] and [[Writable]]) from an instance and all
   * objects in the prototype chain of that instance
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, instance, mirrorFunctions,
   * mirrorOthers, overrideFunctions, overrideOthers
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.instance the instance whose prototype chain should
   * provide properties to be mirorred on the target object
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value [[Value]] (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with a data descriptor
   * (with the vields [[Value]] and [[Writable]]) from a prototype and from all
   * objects in the prototype chain of that prototype
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, mirrorFunctions,
   * mirrorOthers, overrideFunctions, overrideOthers
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.prototype the prototype whose prototype chain should
   * provide properties to be mirorred on the target object
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value [[Value]] (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with a data descriptor
   * (with the vields [[Value]] and [[Writable]]) from an instance on a target
   * object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, instance, mirrorFunctions,
   * mirrorOthers, overrideFunctions, overrideOthers
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.instance the instance whose prototype should
   * provide properties to be mirorred on the target object
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value [[Value]] (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates properties with a data descriptor
   * (with the vields [[Value]] and [[Writable]]) from an prototype on a target
   * object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, mirrorFunctions,
   * mirrorOthers, overrideFunctions, overrideOthers
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.prototype the instance whose prototype should
   * provide properties to be mirorred on the target object
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value [[Value]] (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description mirrors/replicates a (one) property with a data descriptor
   * (with the vields [[Value]] and [[Writable]]) from an prototype on a target
   * object
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, propertyName, override
   * @param {Object} config.hostObject the targeted inheriting host object
   * @param {Object} config.prototype the instance whose prototype should
   * provide properties to be mirorred on the target object
   * @param {String} config.propertyName the name of the data property to be
   * mirrored/replicated
   * @param {Boolean} config.override whether or not the data descriptor
   * property should be overriden on the target host object in case it already
   * exists
   * @return {Boolean} the success of the operation
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through a data descriptor (that has the fields
   * [[Value]] and [[Writable]]) from an instance
   * @param {Object} instance the instance whose property names (keys) should be
   * retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with a data descriptor
   */
  static getDataDescriptorPropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return DataDescriptorReplicator
      .getDataDescriptorPropertyNamesFromPrototype( instancePrototype );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through a data descriptor (that has the fields
   * [[Value]] and [[Writable]]) and whose value is a function from an instance;
   * TLDR: retrieves method names from an instance
   * @param {Object} instance the instance whose property names (keys) should be
   * retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with a data descriptor with a function in the [[Value]] field
   */
  static getFunctionPropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return DataDescriptorReplicator
      .getFunctionPropertyNamesFromPrototype( instancePrototype );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through a data descriptor (that has the fields
   * [[Value]] and [[Writable]]) and whose value is not a function from an
   * instance
   * @param {Object} instance the instance whose property names (keys) should be
   * retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with a data descriptor with a value that is not a function
   */
  static getDataValuePropertyNamesFromInstance( instance ) {
    if ( !Identifier.isObject( instance ) ) return void 0;
    const instancePrototype = Object.getPrototypeOf( instance );
    return DataDescriptorReplicator
      .getDataValuePropertyNamesFromPrototype( instancePrototype );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through a data descriptor (that has the fields
   * [[Value]] and [[Writable]]) from a prototype
   * @param {Object} prototype the prototype whose property names (keys) should
   * be retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with a data descriptor
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through a data descriptor (that has the fields
   * [[Value]] and [[Writable]]) and whose value is a function from an instance;
   * TLDR: retrieves method names from a prototype
   * @param {Object} prototype the prototype whose property names (keys) should
   * be retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with a data descriptor with a function in the [[Value]] field
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns filtered property names (keys) for
   * properties that are defined through a data descriptor (that has the fields
   * [[Value]] and [[Writable]]) and whose value is not a function from a
   * prototype
   * @param {Object} prototype the prototype whose property names (keys) should
   * be retrieved
   * @return {Array} the list of all property names (keys) that are assigned to
   * properties with a data descriptor with a value that is not a function
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a property name (key) of a certain
   * prototype has a data descriptor
   * @param {Object} prototype the prototype (potentially) containing a property
   * with said name (key)
   * @param {String} propertyName the name of the property
   * @return {Boolean} whether or not the property exists and has a data
   * descriptor
   */
  static isDataDescriptorPropertyName( prototype, propertyName ) {
    if ( !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) || !( propertyName in prototype ) ||
      NON_CLONABLE_PROPERTY_NAMES.indexOf( propertyName ) >= 0 )
      return false;
    const propertyDescriptor =
      Object.getOwnPropertyDescriptor( prototype, propertyName );
    return DataDescriptorReplicator.isDataDescriptor( propertyDescriptor );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a property name (key) of a certain
   * prototype has a data descriptor with a function as a value (method property)
   * @param {Object} prototype the prototype (potentially) containing a property
   * with said name (key)
   * @param {String} propertyName the name of the property (method)
   * @return {Boolean} whether or not the property exists and is a method (has a
   * data descriptor with a function as value)
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a property name (key) of a certain
   * prototype has a data descriptor with a value that is not a function (not a
   * method)
   * @param {Object} prototype the prototype (potentially) containing a property
   * with said name (key)
   * @param {String} propertyName the name of the property
   * @return {Boolean} whether or not the property exists and has a data
   * descriptor with a value that is not a function (not a method)
   */
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

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a descriptor is a data descriptor
   * (has the fields [[Value]] and [[Writable]])
   * @param {Object} propertyDescriptor the descriptor that should be tested
   * @return {Boolean} whether or not the property descriptor is a data
   * descriptor (has the fields [[Value]] and [[Writable]])
   */
  static isDataDescriptor( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return Reflect.has( propertyDescriptor, "value" );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a descriptor is a data descriptor
   * (has the fields [[Value]] and [[Writable]]) with a function as a value
   * @param {Object} propertyDescriptor the descriptor that should be tested
   * @return {Boolean} whether or not the property descriptor is a data
   * descriptor (has the fields [[Value]] and [[Writable]]) with a function as
   * a value
   */
  static isFunctionPropertyDescriptor( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return Identifier.isFunction( propertyDescriptor.value );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a descriptor is a data descriptor
   * (has the fields [[Value]] and [[Writable]]) with a value that is not a
   * function
   * @param {Object} propertyDescriptor the descriptor that should be tested
   * @return {Boolean} whether or not the property descriptor is a data
   * descriptor (has the fields [[Value]] and [[Writable]]) with a value that
   * is not a function
   */
  static isDataValuePropertyDescriptor( propertyDescriptor ) {
    if ( !Identifier.isObject( propertyDescriptor ) ) return false;
    return Reflect.has( propertyDescriptor, "value" ) &&
      !Identifier.isFunction( propertyDescriptor.value );
  }

  /**
   * @class DataDescriptorReplicator
   * @constructor DataDescriptorReplicator
   * @since 1.0.0
   * @deprecated since version 1.0.0
   * @description Calling the constructor function of
   DataDescriptorReplicator throws an error.
   * @classdesc Replicates the data properties (methods & others) from an
   inherited instance, object, prototype or constructor function (extension
   object) on/to an inheriting instance, object or prototype (host object).
   This class should not be instantiated and is supposed to be used as a
   constructor function to access static methods.
   * @summary The DataDescriptorReplicator class only provides static
   * methods and should not be instantiated.
   * @exception {Error} throws an Error when called
   */
  constructor() {
    throw new Error( 'The constructor function object' +
      ' DataDescriptorReplicator should not be instantiated.' );
  }

}