/**
 * @name Cloner
 * @module Cloner
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file Cloner.js contains the class Cloner. The class Cloner
 (constructor function object) performs extension & multiple inheritance
 operations.
 * @classdesc Performs extension & multiple inheritance operations between an
  inheriting instance, object or prototype (host object) and one or more
  inherited instances, objects, prototypes or constructor functions (extension
  object). This class should not be instantiated and is supposed to be used as
  a constructor function to access static methods.
 * @since 1.0.0
 */

import Identifier from './Identifier';
import Logger from './Logger';
import SuperExtensionManager from './SuperExtensionManager';
import AccessorDescriptorReplicator from './AccessorDescriptorReplicator';
import DataDescriptorReplicator from './DataDescriptorReplicator';

/**
 * @name Cloner
 * @class Cloner
 * @classdesc Performs extension & multiple inheritance operations between an
  inheriting instance, object or prototype (host object) and one or more
  inherited instances, objects, prototypes or constructor functions (extension
  object). This class should not be instantiated and is supposed to be used as
  a constructor function to access static methods.
 * @description Cloner performs extension & multiple inheritance operations
 * @exports Cloner the Cloner class (constructor function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
export default class Cloner {

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description creates an inheritance realtionship between two objects based
   * on the provided configuration
   * @param {Object} hostObject the inheriting (scope) host object; can be an
   * instance or a prototype
   * @param {Object} extensionObject the inherited extension object; can be an
   * instance, a prototype or a constructor function object (class)
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: register, mirrorGettersAndSetters,
   * overrideGettersAndSetters, mirrorFunctions, mirrorOthers,
   * overrideFunctions, overrideOthers
   * @param {Boolean} config.register whether or not the extension object should
   * be registered in the __extends Set of the host object
   * @param {Boolean} config.mirrorGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be overriden
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @param extensionConstructorArgs further arguments/parameters to be
   * passed to the constructor of the inherited extension object
   * @return {Boolean} the success of the operation
   */
  static extend( hostObject, extensionObject, config, ...extensionConstructorArgs ) {
    if ( Identifier.isConstructorFunction( extensionObject ) )
      return Cloner.extendFromConstructorFunction( hostObject, extensionObject,
        config, ...extensionConstructorArgs );
    if ( Identifier.isPrototype( extensionObject ) )
      return Cloner.extendFromPrototype( hostObject, extensionObject,
        config, ...extensionConstructorArgs );
    return false;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description creates an inheritance realtionship between an object and an
   * object instance based on the provided configuration
   * @param {Object} hostObject the inheriting (scope) host object; can be an
   * instance or a prototype
   * @param {Object} extensionInstance the inherited instance
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: register, mirrorGettersAndSetters,
   * overrideGettersAndSetters, mirrorFunctions, mirrorOthers,
   * overrideFunctions, overrideOthers
   * @param {Boolean} config.register whether or not the extension object should
   * be registered in the __extends Set of the host object
   * @param {Boolean} config.mirrorGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be overriden
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @param extensionConstructorArgs further arguments/parameters to be
   * passed to the constructor of the inherited extension instance
   * @return {Boolean} the success of the operation
   */
  static extendFromInstance( hostObject, extensionInstance, config, ...extensionConstructorArgs ) {
    if ( !Identifier.isObject( extensionInstance ) ) return false;
    if ( Identifier.isConstructorFunction( extensionInstance.constructor ) )
      return Cloner.extendFromConstructorFunction( hostObject,
        extensionInstance.constructor, config, ...extensionConstructorArgs );
    return Cloner.extendFromPrototype( hostObject,
      Object.getPrototypeOf( extensionInstance ),
      config, ...extensionConstructorArgs );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description creates an inheritance realtionship between an object and an
   * object prototype based on the provided configuration
   * @param {Object} hostObject the inheriting (scope) host object; can be an
   * instance or a prototype
   * @param {Object} extensionObject the inherited prototype
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: register, mirrorGettersAndSetters,
   * overrideGettersAndSetters, mirrorFunctions, mirrorOthers,
   * overrideFunctions, overrideOthers
   * @param {Boolean} config.register whether or not the extension object should
   * be registered in the __extends Set of the host object
   * @param {Boolean} config.mirrorGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be overriden
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @param extensionConstructorArgs further arguments/parameters to be
   * passed to the constructor of the inherited extension object
   * @return {Boolean} the success of the operation
   */
  static extendFromPrototype( hostObject, extensionObject, config, ...extensionConstructorArgs ) {
    if ( !Identifier.isObject( hostObject ) )
      return Logger.trace( `Could not extend an invalid object.`, null, false );
    if ( !Identifier.isPrototype( extensionObject ) )
      return Logger.trace( `Could not extend an object by an invalid extension.`,
        null, false );
    const hasConfig = Identifier.isObject( config );
    if ( !hasConfig || !!config.register ) {
      SuperExtensionManager.registerInstance( hostObject, extensionObject );
      SuperExtensionManager.addSuperMethod( hostObject );
    }
    const accessorDescriptorPropertiesMirrored = hasConfig &&
      !config.mirrorGettersAndSetters ? true : AccessorDescriptorReplicator
      .mirrorGettersAndSettersFromPrototypeOnWholePrototypeChain( {
        hostObject: hostObject,
        prototype: extensionObject,
        override: !hasConfig ? false : !!config.overrideGettersAndSetters
      } );
    const dataDescriptorPropertiesMirrored = DataDescriptorReplicator
      .mirrorDataDescriptorsFromPrototypeOnWholePrototypeChain( {
        hostObject: hostObject,
        prototype: extensionObject,
        mirrorFunctions: !hasConfig ? true : !!config.mirrorFunctions,
        mirrorOthers: !hasConfig ? true : !!config.mirrorOthers,
        overrideFunctions: !hasConfig ? false : !!config.overrideFunctions,
        overrideOthers: !hasConfig ? false : !!config.overrideOthers
      } );
    return accessorDescriptorPropertiesMirrored &&
      dataDescriptorPropertiesMirrored;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description creates an inheritance realtionship between an object and a
   * constructor function object
   * @param {Object} hostObject the inheriting (scope) host object; can be an
   * instance or a prototype
   * @param {Function} extensionObject the constructor function
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: register, mirrorGettersAndSetters,
   * overrideGettersAndSetters, mirrorFunctions, mirrorOthers,
   * overrideFunctions, overrideOthers
   * @param {Boolean} config.register whether or not the extension object should
   * be registered in the __extends Set of the host object
   * @param {Boolean} config.mirrorGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideGettersAndSetters whether or not accessor
   * descriptors (getter and setter methods) should be overriden
   * @param {Boolean} config.mirrorFunctions whether or not data descriptors
   * with a function as a value (methods) should be
   * mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideFunctions whether or not data descriptors
   * with a function as a value (methods) should be overriden
   * @param {Boolean} config.mirrorOthers whether or not data descriptors that
   * do not have a function as a value (data descriptor attributes that are not
   * methods) should be mirorred/replicated/copied/imitated/mimiced/simulated
   * @param {Boolean} config.overrideOthers whether or not data descriptors
   * that do not have a function as a value (data descriptor attributes that
   * are not methods) should be overriden
   * @param extensionConstructorArgs further arguments/parameters to be
   * passed to the constructor of the inherited extension object
   * @return {Boolean} the success of the operation
   */
  static extendFromConstructorFunction( hostObject, extensionObject, config, ...extensionConstructorArgs ) {
    if ( !Identifier.isObject( hostObject ) )
      return Logger.trace( `Could not extend an invalid object.`, null, false );
    if ( !Identifier.isConstructorFunction( extensionObject ) )
      return Logger.trace( `Could not extend an object by an invalid extension.`,
        null, false );
    const hasConfig = Identifier.isObject( config );
    if ( !hasConfig || !!config.register ) {
      SuperExtensionManager.registerInstance( hostObject, extensionObject );
      SuperExtensionManager.addSuperMethod( hostObject );
    }
    const accessorDescriptorPropertiesMirrored = hasConfig &&
      !config.mirrorGettersAndSetters ? true : AccessorDescriptorReplicator
      .mirrorGettersAndSettersFromInstanceOnWholePrototypeChain( {
        hostObject: hostObject,
        instance: new extensionObject( ...extensionConstructorArgs ),
        override: !hasConfig ? false : !!config.overrideGettersAndSetters
      } );
    const dataDescriptorPropertiesMirrored = DataDescriptorReplicator
      .mirrorDataDescriptorsFromInstanceOnWholePrototypeChain( {
        hostObject: hostObject,
        instance: new extensionObject( ...extensionConstructorArgs ),
        mirrorFunctions: !hasConfig ? true : !!config.mirrorFunctions,
        mirrorOthers: !hasConfig ? true : !!config.mirrorOthers,
        overrideFunctions: !hasConfig ? false : !!config.overrideFunctions,
        overrideOthers: !hasConfig ? false : !!config.overrideOthers
      } );
    return accessorDescriptorPropertiesMirrored &&
      dataDescriptorPropertiesMirrored;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description converts (instantiates) a constructor function object to an
   * instance
   * @param {Function} classFunction the constructor funtion object
   * @return {Object} an instance of the class function
   */
  static classFunctionToInstance( classFunction ) {
    if ( !( classFunction instanceof Function ) ||
      !Identifier.isFunction( classFunction.constructor ) )
      return void 0;
    let instance = void 0;
    try {
      instance = new classFunction();
    } catch ( error ) {}
    return instance;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description gets a property descriptor that can be used in replication or
   * mirorring operations
   * @param {Object} config the configuration object; might contain some or none
   * of the following fields: hostObject, prototype, propertyName, override
   * @param {Object} config.hostObject the object that the property might be
   * assigned to later
   * @param {Object} config.prototype the prototype that contains the descriptor
   * that should be returned
   * @param {String} config.propertyName the name (key) of the descriptor
   * (property/attribute)
   * @param {Boolean} config.override whether or not the descriptor can be
   * overrien on the host object
   * @return {Object} the descriptor object
   */
  static getClonablePropertyDescriptor( {
    hostObject,
    prototype,
    propertyName,
    override = false
  } ) {
    if ( !Identifier.isObject( hostObject ) ||
      !Identifier.isObject( prototype ) ||
      !Identifier.isString( propertyName ) ||
      !( propertyName in prototype ) ) return void 0;
    if ( propertyName in hostObject ) {
      if ( !override ) return void 0;
      const hostObjectDescriptor =
        Object.getOwnPropertyDescriptor( hostObject, propertyName );
      if ( !hostObjectDescriptor.configurable )
        return Logger.trace( `The property ${ propertyName } is not` +
          ` configurable and could not be mirrored on the object.`, null, void 0 );
      delete hostObject[ propertyName ];
    } else if ( !Object.isExtensible( hostObject ) )
      return Logger.trace( `Could not assign the property ${ propertyName }` +
        ` to a non extensible object.`, null, void 0 );
    return Object.getOwnPropertyDescriptor( prototype, propertyName );
  }

  /**
   * @class Cloner
   * @constructor Cloner
   * @since 1.0.0
   * @deprecated since version 1.0.0
   * @description Calling the constructor function of Cloner throws an error.
   * @classdesc Performs extension & multiple inheritance operations between an
    inheriting instance, object or prototype (host object) and one or more
    inherited instances, objects, prototypes or constructor functions (extension
    object). This class should not be instantiated and is supposed to be used as
    a constructor function to access static methods.
   * @summary The Cloner class only provides static methods and should not be
   instantiated.
   * @exception {Error} throws an Error when called
   */
  constructor() {
    throw new Error( 'The constructor function object Cloner should not be' +
      ' instantiated.' );
  }

}