/**
 * @name SuperExtensionManager
 * @module SuperExtensionManager
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file SuperExtensionManager.js contains the class Cloner. The class
 SuperExtensionManager (constructor function object) performs extension &
 multiple inheritance operations.
 * @classdesc Performs extension & multiple inheritance operations between an
  inheriting instance, object or prototype (host object) and one or more
  inherited instances, objects, prototypes or constructor functions (extension
  object). This class should not be instantiated and is supposed to be used as
  a constructor function to access static methods.
 * @since 1.0.0
 */

import Identifier from './Identifier';
import Logger from './Logger';

/**
 * @name SuperExtensionManager
 * @class SuperExtensionManager
 * @classdesc Performs extension & multiple inheritance operations between an
  inheriting instance, object or prototype (host object) and one or more
  inherited instances, objects, prototypes or constructor functions (extension
  object). This class should not be instantiated and is supposed to be used as
  a constructor function to access static methods.
 * @description SuperExtensionManager performs extension & multiple inheritance
 operations
 * @exports SuperExtensionManager the SuperExtensionManager class (constructor
 function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
export default class SuperExtensionManager {

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description adds a super method to the target host object; the super
   * method imitates the behavior of the super keyword in inheritance
   * relationships
   * @param {Object} hostObject the object whom will be assigned a super method
   * @return {Boolean} the success of the operation
   */
  static addSuperMethod( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isFunction( hostObject.super ) ) return false;
    hostObject.super = ( methodName, ...args ) => {
      if ( !Identifier.isSet( hostObject.__extends ) ) return void 0;
      let superPrototype = void 0;
      for ( let extensionObject of hostObject.__extends ) {
        let currentPrototype = Identifier
          .isConstructorFunction( extensionObject ) ? extensionObject.prototype :
          Identifier.isPrototype( extensionObject ) ? extensionObject : void 0;
        if ( !currentPrototype ||
          !Identifier.isFunction( currentPrototype[ methodName ] ) ||
          hostObject[ methodName ] == currentPrototype[ methodName ] ) continue;
        superPrototype = currentPrototype;
        break;
      }
      if ( !superPrototype ) return void 0;
      const temporaryMethodName = Identifier
        .generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
      hostObject[ temporaryMethodName ] = superPrototype[ methodName ];
      const returnValue = methodName != "constructor" ?
        hostObject[ temporaryMethodName ]( ...args ) :
        new hostObject[ temporaryMethodName ]( ...args );
      delete hostObject[ temporaryMethodName ];
      return returnValue;
    };
    return true;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description adds a superFrom method to the target host object; the
   * superFrom method imitates the behavior of the super keyword in inheritance
   * relationships
   * @param {Object} hostObject the object whom will be assigned a superFrom
   * method
   * @return {Boolean} the success of the operation
   */
  static addSuperFromMethod( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isFunction( hostObject.superFrom ) ) return false;
    hostObject.superFrom = ( constructorObject, methodName, ...args ) => {
      if ( !Identifier.isConstructorFunction( constructorObject ) ||
        !Identifier.isSet( hostObject.__extends ) ||
        !hostObject.__extends.has( constructorObject ) ||
        !Identifier.isFunction( constructorObject.prototype[ methodName ] ) )
        return void 0;
      if ( hostObject[ methodName ] == constructorObject.prototype[ methodName ] )
        return void 0;
      const temporaryMethodName = Identifier
        .generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
      hostObject[ temporaryMethodName ] = constructorObject.prototype[ methodName ];
      const returnValue = methodName != "constructor" ?
        hostObject[ temporaryMethodName ]( ...args ) :
        new hostObject[ temporaryMethodName ]( ...args );
      delete hostObject[ temporaryMethodName ];
      return returnValue;
    };
    return true;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description registers an inherited object on an inheriting object and
   * imitates a (multiple) inheritance relationship
   * @param {Object} hostObject the inheriting target object
   * @param {Object} constructorObject the inherited constructor object
   * @return {Boolean} the success of the operaton
   */
  static registerInstance( hostObject, constructorObject ) {
    if ( !Identifier.isObject( hostObject ) ) return false;
    if ( !Identifier.isObject( constructorObject ) &&
      !Identifier.isFunction( constructorObject ) ) return false;
    SuperExtensionManager.addInstanceofFunction( hostObject );
    SuperExtensionManager.addExtendsSet( hostObject );
    SuperExtensionManager.redefineHasInstanceSymbol( constructorObject );
    hostObject.__extends.add( constructorObject );
    hostObject.__extends = new Set( [ ...hostObject.__extends,
      ...SuperExtensionManager.getPrototypeExtensions( constructorObject )
    ] );
    return true;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns all extensions of a prototype,
   * stored in the __extends data value, that is a Set
   * @param {Object} constructorObject the object whose extensions should be
   * retrieved
   * @return {Set} the list of all extensions of the constructor object
   */
  static getPrototypeExtensions( constructorObject ) {
    const prototype = Identifier.isConstructorFunction( constructorObject ) ?
      constructorObject.prototype : Identifier.isPrototype( constructorObject ) ?
      constructorObject : void 0;
    if ( !prototype ) return new Set();
    return Identifier.isSet( prototype.__extends ) ? prototype.__extends :
      new Set();
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description adds a data value property with the name (key) __extends and
   * the value of a Set to the target host object
   * @param {Object} hostObject the target host object
   * @return {Boolean} the success of the operation
   */
  static addExtendsSet( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isSet( hostObject.__extends ) ) return false;
    hostObject.__extends = new Set();
    return true;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description adds a instanceof method to the target host object; the
   * instanceof method imitates the behavior of the instanceof keyword in
   * inheritance relationships
   * @param {Object} hostObject the object whom will be assigned a instanceof
   * method
   * @return {Boolean} the success of the operation
   */
  static addInstanceofFunction( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isFunction( hostObject.instanceof ) ) return false;
    hostObject.instanceof = ( constructorObject ) => {
      return Identifier.instanceof( hostObject, constructorObject );
    }
    return true;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description sets/changes the value of the instanceof function by defining
   * the @@hasInstance Symbol
   * @param {Object} constructorObject the target constructor object whose
   * default/native instanceoffunction will be overriden
   * @return {Boolean} the success of the operation
   */
  static redefineHasInstanceSymbol( constructorObject ) {
    const constructorFunction =
      Identifier.isConstructorFunction( constructorObject ) ?
      constructorObject : Identifier.isPrototype( constructorObject ) ?
      constructorObject.constructor : void 0;
    if ( !constructorFunction ) return false;
    if ( SuperExtensionManager
      .ownsHasInstanceSymbolProperty( constructorFunction ) ) return true;
    let success = false;
    try {
      const nativeFunction = constructorFunction[ Symbol.hasInstance ];
      Object.defineProperty( constructorFunction, Symbol.hasInstance, {
        value: function( leftHandOperand ) {
          if ( Identifier.isFunction( nativeFunction ) &&
            nativeFunction( leftHandOperand ) ) return true;
          return Identifier
            .instanceof( leftHandOperand, constructorFunction, false );
        }
      } );
      success = true;
    } catch ( err ) {}
    return success;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description finds out and returns whether or not a constructor function
   * object has a defined Symbol.hasInstance property
   * @param {Object} constructorFunction the constructor function whose
   * Symbol.hasInstance property should be tested
   * @return {Boolean} whether or not the Symbol.hasInstance property was
   * (already) defined
   */
  static ownsHasInstanceSymbolProperty( constructorFunction ) {
    if ( !Identifier.isConstructorFunction( constructorFunction ) ) return false;
    const propertySymbols = Object.getOwnPropertySymbols( constructorFunction );
    if ( !Identifier.isArray( propertySymbols ) ) return false;
    return propertySymbols.some( propertySymbol =>
      propertySymbol.toString() == "Symbol(Symbol.hasInstance)" );
  }

  /**
   * @class SuperExtensionManager
   * @constructor SuperExtensionManager
   * @since 1.0.0
   * @deprecated since version 1.0.0
   * @description Calling the constructor function of SuperExtensionManager
   throws an error.
   * @classdesc Performs extension & multiple inheritance operations between an
    inheriting instance, object or prototype (host object) and one or more
    inherited instances, objects, prototypes or constructor functions (extension
    object). This class should not be instantiated and is supposed to be used as
    a constructor function to access static methods.
   * @summary The SuperExtensionManager class only provides static methods and
   should not be instantiated.
   * @exception {Error} throws an Error when called
   */
  constructor() {
    throw new Error( 'The constructor function object SuperExtensionManager' +
      ' should not be instantiated.' );
  }

}