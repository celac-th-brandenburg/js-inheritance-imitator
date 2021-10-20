/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/Identifier.js
/**
 * @name Identifier
 * @module Identifier
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file Identifier.js contains the class Identifier. The class
 Identifier (constructor function object) identifies the type of objects as well
 as the inheritance relationship between two objects
 * @classdesc Identifies the type of objects as well as the inheritance
 relationship between two objects This class should not be instantiated and is
 supposed to be used as a constructor function to access static methods.
 * @since 1.0.0
 */

/**
 * @name Identifier
 * @class Identifier
 * @classdesc Identifies the type of objects as well as the inheritance
 relationship between two objects This class should not be instantiated and is
 supposed to be used as a constructor function to access static methods.
 * @description Identifier identifies the type of objects as well as the
 inheritance relationship between two objects
 * @exports Identifier the Identifier class (constructor function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
class Identifier {

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a target host object is an instance
   * of a constructor object, meaning that there is an inheritance relationship
   * between the two objects
   * @param {Object} hostObject the target host object (the operand on the left
   * side of the instanceof operator)
   * @param {Object} constructorObject the constructor object (the operand on
   * the right side of the instanceof operator)
   * @param {Boolean} testNative whether or not to also test the native
   * instanceof functionality
   * @return {Boolean} whether or not the target object is an instance of the
   * constructor object
   */
  static instanceof( hostObject, constructorObject, testNative = true ) {
    if ( !Identifier.isObject( hostObject ) ) return false;
    const isConstructorFunction = Identifier
      .isConstructorFunction( constructorObject );
    if ( isConstructorFunction &&
      hostObject.constructor === constructorObject ) return true;
    if ( testNative && isConstructorFunction &&
      hostObject instanceof constructorObject )
      return true;
    if ( !Identifier.isSet( hostObject.__extends ) ) return false;
    if ( hostObject.__extends.has( constructorObject ) ) return true;
    return isConstructorFunction && [ ...hostObject.__extends.values() ]
      .some( extension => {
        if ( extension.constructor == constructorObject ) return true;
        const constructorFunction =
          Identifier.isConstructorFunction( extension.constructor ) ?
          extension.constructor :
          Identifier.isConstructorFunction( extension ) ? extension : void 0;
        if ( !constructorFunction ) return false;
        let testInstance = void 0;
        try {
          testInstance = new constructorFunction();
        } catch ( err ) {}
        if ( !testInstance ) return false;
        if ( testNative && testInstance instanceof constructorObject )
          return true;
        if ( !Identifier.isFunction( testInstance.instanceof ) ) return false;
        return !!testInstance.instanceof( constructorObject );
      } );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a prototype
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a prototype
   */
  static isPrototype( inputParameter ) {
    return Identifier.isObject( inputParameter ) &&
      Reflect.has( inputParameter, "constructor" );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a constructor function
   * object
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a constructor
   * function object
   */
  static isConstructorFunction( inputParameter ) {
    return typeof inputParameter == "function" &&
      Reflect.has( inputParameter, "prototype" ) &&
      Reflect.has( inputParameter, "constructor" );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is an object
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is an object
   */
  static isObject( inputParameter ) {
    return !!inputParameter && typeof inputParameter == "object";
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a string
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a string
   */
  static isString( inputParameter ) {
    return !!inputParameter &&
      typeof inputParameter == "string" && inputParameter.length > 0;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a number
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a number
   */
  static isNumber( inputParameter ) {
    return typeof inputParameter == "number";
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is an integer number
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is an integer number
   */
  static isInteger( inputParameter ) {
    return Identifier.isNumber( inputParameter ) &&
      Number.isInteger( inputParameter );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a number greater than
   * or equal to zero
   * @param inputParameter the parameter/argument to be tested
   * @param {Boolean} canBeZero whether or not the parameter/argument can be
   * equal to zero
   * @return {Boolean} whether or not the parameter/argument is a number greater
   * than or equal to zero
   */
  static isPositiveNumber( inputParameter, canBeZero = true ) {
    return Identifier.isNumber( inputParameter ) &&
      ( !canBeZero ? inputParameter > 0 : inputParameter >= 0 );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is an integer number
   * greater than or equal to zero
   * @param inputParameter the parameter/argument to be tested
   * @param {Boolean} canBeZero whether or not the parameter/argument can be
   * equal to zero
   * @return {Boolean} whether or not the parameter/argument is an integer
   * number greater than or equal to zero
   */
  static isPositiveInteger( inputParameter, canBeZero = true ) {
    return Identifier.isInteger( inputParameter ) &&
      Identifier.isPositiveNumber( inputParameter, canBeZero );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a boolean
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a boolean
   */
  static isBoolean( inputParameter ) {
    return typeof inputParameter == "boolean";
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a function
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a function
   */
  static isFunction( inputParameter ) {
    return !!inputParameter && typeof inputParameter == "function";
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is an Array
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is an Array
   */
  static isArray( inputParameter, testLength = false ) {
    if ( !( inputParameter instanceof Array ) ) return false;
    if ( Identifier.isBoolean( testLength ) )
      return !testLength ? true : inputParameter.length > 0;
    if ( !Identifier.isPositiveInteger( testLength, true ) ) return true;
    return inputParameter.length === testLength;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is a Set
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is a Set
   */
  static isSet( inputParameter, testSize = false ) {
    return !( inputParameter instanceof Set ) ? false : !testSize ? true :
      inputParameter.size > 0;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not something is iterable
   * @param inputParameter the parameter/argument to be tested
   * @return {Boolean} whether or not the parameter/argument is iterable
   */
  static isIterable( inputParameter ) {
    if ( !Identifier.isObject( inputParameter ) &&
      !Identifier.isString( inputParameter ) ) return false;
    return Identifier.isFunction( inputParameter[ Symbol.iterator ] );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a path to an object exists
   * @param {Object} parentObject the first object in the path
   * definition/notation
   * @param {String} pathString the full pat to be tested
   * @return {Boolean} whether or not the path exists
   */
  static isObjectPath( parentObject, pathString = "" ) {
    if ( !Identifier.isFunction( pathString.split ) ) return false;
    let pathArray = pathString.split( "." );
    if ( pathArray.length > 0 ) pathArray.shift();
    return Identifier._isObjectHierarchy( parentObject, pathArray );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not a path to a function exists
   * @param {Object} parentObject the first object in the path
   * definition/notation
   * @param {String} pathString the full pat to be tested
   * @return {Boolean} whether or not the path exists
   */
  static isFunctionPath( parentObject, pathString = "" ) {
    if ( !Identifier.isString( pathString ) )
      return Identifier.isFunction( pathString ) ||
        Identifier.isFunction( parentObject );
    if ( pathString.indexOf( "." ) < 0 )
      return Identifier.isObject( parentObject ) &&
        Identifier.isFunction( parentObject[ pathString ] );
    let pathArray = pathString.split( "." );
    if ( pathArray.length < 1 ) return Identifier.isFunction( parentObject );
    if ( pathArray.length == 1 ) return Identifier.isFunction( parentObject ) ||
      Identifier.isObject( parentObject ) &&
      Identifier.isFunction( parentObject[ pathString ] );
    pathArray.shift();
    const functionName = pathArray[ pathArray.length - 1 ];
    pathArray.splice( -1 );
    if ( !Identifier._isObjectHierarchy( parentObject, pathArray ) ) return false;
    const finalObject = Identifier._getObjectFromHierarchy( parentObject, pathArray );
    return Identifier.isObject( finalObject ) &&
      Identifier.isFunction( finalObject[ functionName ] );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description identifies whether or not an oject hierarchy exists
   * @param {Object} parentObject the first object in the path/hierarchy
   * definition/notation
   * @param {Array} levelsArray list of object levels froman object path
   * @return {Boolean} whether or not the hierarchy exists
   */
  static _isObjectHierarchy( parentObject, levelsArray = [] ) {
    if ( !Identifier.isObject( parentObject ) ) return false;
    let currentlyValidating = parentObject;
    for ( let childLevelName of levelsArray ) {
      currentlyValidating = currentlyValidating[ childLevelName ];
      if ( !Identifier.isObject( currentlyValidating ) ) return false;
    }
    return true;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns the last object from a hierarchy
   * @param {Object} parentObject the first object in the path/hierarchy
   * definition/notation
   * @param {Array} pathArray the path to the target object as a list of object
   * levels from an object path
   * @param {Boolean} validateEachLevel whether or not each level of the
   * hierarchy should be tested to make sure it is an object
   * @return {Boolean} whether or not the hierarchy exists
   */
  static _getObjectFromHierarchy( parentObject, pathArray = [], validateEachLevel = false ) {
    if ( !Identifier.isObject( parentObject ) ) return void 0;
    let finalObject = parentObject;
    for ( let childLevelName of pathArray ) {
      finalObject = finalObject[ childLevelName ];
      if ( !!validateEachLevel && !Identifier.isObject( finalObject ) )
        return void 0;
    }
    return finalObject;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description generates a random character sequence with an optional prefix,
   * an optional sufix and of a defined or undeined length
   * @param {String} prefix the optional prefix of the character sequence
   * @param {String} suffix the optional suffix of the character sequence
   * @param {Number} length the exact length of the char sequence
   * @return {String} a random char sequence
   */
  static generateRandomString( prefix = "", suffix = "", length = void 0 ) {
    let now = Date.now();
    let randomString = ( now * Math.random() ).toString( 36 ).replace( /\./g, now );
    if ( Identifier.isPositiveInteger( length ) )
      randomString = randomString.length >= length ?
      randomString.substring( 0, length - 1 ) :
      randomString + Math.pow( 10, length - randomString.length - 1 );
    if ( Identifier.isString( prefix ) ) randomString = prefix + randomString;
    if ( Identifier.isString( suffix ) ) randomString = randomString + suffix;
    return randomString;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns the first occurence of a regular
   * expression in a source
   * @param {String} source the source where the regular expresion should find a
   * match
   * @param {RegExp} regExp the regular expression to be matched
   * @return {Array} the first match of the regular expression in the source
   */
  static _getFirstMatchArr( source, regExp ) {
    if ( !Identifier.isString( source ) ) return void 0;
    if ( Identifier.isString( regExp ) ) regExp = new RegExp( regExp, "g" );
    if ( !( regExp instanceof RegExp ) ) return void 0;
    const matches = [ ...source.matchAll( regExp ) ];
    if ( !Identifier.isArray( matches, true ) ) return void 0;
    const firstMatch = matches[ 0 ];
    if ( !Identifier.isArray( firstMatch, true ) ) return void 0;
    return firstMatch;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns the index of the first occurence
   * of a regular expression in a source
   * @param {String} source the source where the regular expresion should find a
   * match
   * @param {RegExp} regExp the regular expression to be matched
   * @return {Number} the index of the first occurence of a regular expression
   * in a source
   */
  static firstMatchIndex( source, regExp ) {
    const firstMatch = Identifier._getFirstMatchArr( source, regExp );
    if ( !Identifier.isArray( firstMatch, true ) ) return -1;
    const index = firstMatch.index;
    return Identifier.isPositiveInteger( index ) ? index : -1;
  }

  /**
   * @class Identifier
   * @constructor Identifier
   * @since 1.0.0
   * @deprecated since version 1.0.0
   * @description Calling the constructor function of Identifier throws an error.
   * @classdesc Identifies the type of objects as well as the inheritance
   relationship between two objects This class should not be instantiated and is
   supposed to be used as a constructor function to access static methods.
   * @summary The Identifier class only provides static methods and should not
   be instantiated.
   * @exception {Error} throws an Error when called
   */
  constructor() {
    throw new Error( 'The constructor function object Identifier should not' +
      ' be instantiated.' );
  }

}
;// CONCATENATED MODULE: ./src/Logger.js
/**
 * @name Logger
 * @module Logger
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file Logger.js contains the class Logger. The class Logger
 (constructor function object) logs messages with the browser Console API.
 * @classdesc Logs messages with the browser Console API. This class should not
 be instantiated and is supposed to be used as a constructor function to access
 static methods.
 * @since 1.0.0
 */



/**
 * @name Logger
 * @class Logger
 * @classdesc Logs messages with the browser Console API. This class should not
 be instantiated and is supposed to be used as a constructor function to access
 static methods.
 * @description Logger logs messages with the browser Console API
 * @exports Logger the Logger class (constructor function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
class Logger {

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description logs a message and it's host function/method call stack to the
   browser console
   * @param {String} logMessage the message to be displayed/logged to the
   * console
   * @param {Error} errorOrErrorText the Error to be logged to the console, if
   * such exists
   * @param returnValue what this method should return (for chaining purposes)
   * @return the parameter returnValue (for chaining purposes)
   */
  static _trace( logMessage, errorOrErrorText = null, returnValue ) {
    if ( !Identifier.isString( logMessage ) ) logMessage = "";
    console.group( "[ " + Logger.getCurrentTime() + " ] " + logMessage );
    if ( Identifier.isString( errorOrErrorText ) ||
      Identifier.isObject( errorOrErrorText ) ) {
      console.groupCollapsed( "%cError", "color: #009688" );
      console.warn( errorOrErrorText );
      console.groupEnd();
    }
    console.groupCollapsed( "%c Call Stack", "color: #009688" );
    console.trace( "%c ", "color: #009688" );
    console.groupEnd();
    console.groupEnd();
    return returnValue;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description logs a message and it's host function/method call stack to the
   browser console
   * @param {String} logMessage the message to be displayed/logged to the
   * console
   * @param {Error} errorOrErrorText the Error to be logged to the console, if
   * such exists
   * @param returnValue what this method should return (for chaining purposes)
   * @return the parameter returnValue (for chaining purposes)
   */
  static trace( logMessage, errorOrErrorText = null, returnValue ) {
    let fullFunctionName = Logger.getFullFunctionName( 1, "." );
    let message = "";
    if ( Identifier.isString( fullFunctionName ) ) message += fullFunctionName;
    if ( Identifier.isString( logMessage ) )
      message += !Identifier.isString( message ) ? logMessage : "\n" + logMessage;
    return Logger._trace( message, errorOrErrorText, returnValue );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description logs a message and it's host function/method call stack to the
   browser console depending on an assertion
   * @param {Boolean} doTrace the assertion that decides whether or not the
   * message should be logged in the console
   * @param {String} logMessage the message to be displayed/logged to the
   * console
   * @param {Error} errorOrErrorText the Error to be logged to the console, if
   * such exists
   * @param returnValue what this method should return (for chaining purposes)
   * @return the parameter returnValue (for chaining purposes)
   */
  static traceIf( doTrace = true, logMessage, errorOrErrorText = null, returnValue ) {
    if ( !doTrace ) return returnValue;
    return Logger.trace( logMessage, errorOrErrorText, returnValue );
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description creates a representation of the current time in the format
   * [ HH:MM:SS:MMM ]
   * @return {String} the current time in the given format
   */
  static getCurrentTime() {
    let fullDate = new Date();
    let hours = Logger.dateNumberToString( fullDate.getHours() );
    let minutes = Logger.dateNumberToString( fullDate.getMinutes() );
    let seconds = Logger.dateNumberToString( fullDate.getSeconds() );
    let milliseconds = Logger.dateNumberToString( fullDate.getMilliseconds(), true );
    return `${ hours }:${ minutes }:${ seconds }:${ milliseconds }`;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description converts a date number to string
   * @param {Number} dateNumber the date number
   * @param {Boolean} threeDigits whether the date can/should have three digits
   * (for example, miliseconds)
   * @return {String} the date number converted to string
   */
  static dateNumberToString( dateNumber, threeDigits = false ) {
    if ( !Identifier.isPositiveInteger( dateNumber ) ) return "";
    let stringDateNumber = dateNumber.toString();
    while ( stringDateNumber.length < 2 )
      stringDateNumber = "0" + stringDateNumber;
    while ( threeDigits && stringDateNumber.length < 3 )
      stringDateNumber = "0" + stringDateNumber;
    return stringDateNumber;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description retrieves/gets and returns a function name from a call stack
   * @param {Number} topEntriesToRemove the number of entries in the call stack
   * after the method whose name should be retrieved
   * @param {String} separator the separator used betweed class name and method
   * name
   * @return {String} the full function name
   */
  static getFullFunctionName( topEntriesToRemove = 0, separator = "#" ) {
    topEntriesToRemove = Identifier.isInteger( topEntriesToRemove ) ?
      topEntriesToRemove + 2 : 2;
    let stack = Logger.getStack( topEntriesToRemove );
    if ( !Identifier.isString( stack ) ) return void 0;
    if ( stack.startsWith( "at " ) ) {
      stack = stack.substring( 3 );
    }
    const spaceIndex = stack.indexOf( " " );
    if ( !Identifier.isInteger( spaceIndex ) || spaceIndex < 0 ||
      stack.length - 1 < spaceIndex + 1 ) return stack;
    stack = stack.substring( 0, spaceIndex );
    const atIndex = stack.indexOf( "@" );
    if ( Identifier.isInteger( atIndex ) && atIndex >= 0 &&
      stack.length - 1 >= atIndex + 1 ) stack = stack.substring( 0, atIndex );
    if ( Identifier.isString( separator ) ) {
      stack = stack.replace( ".", separator );
    }
    return stack;
  }

  /**
   * @since 1.0.0
   * @static
   * @method
   * @description gets the full stack of the current call
   * @param {Number} topEntriesToRemove the amount of entries from the end of
   * the stack (the most recent) to be removed
   * @return {String} the current call stack
   */
  static getStack( topEntriesToRemove = 1 ) {
    const err = new Error();
    if ( !Identifier.isObject( err ) ) return void 0;
    let stack = err.stack;
    if ( !Identifier.isString( stack ) ) return void 0;
    if ( !Identifier.isInteger( topEntriesToRemove ) )
      topEntriesToRemove = 1;
    if ( Identifier.firstMatchIndex( stack, /\sat\s/g ) < 0 ) topEntriesToRemove--;
    while ( topEntriesToRemove > -1 ) {
      const firstNewLineIndex = stack.indexOf( "\n" );
      if ( !Identifier.isInteger( firstNewLineIndex ) || firstNewLineIndex < 0 ||
        stack.length - 1 < firstNewLineIndex + 1 ) break;
      stack = stack.substring( firstNewLineIndex + 1 );
      topEntriesToRemove--;
    }
    while ( stack.length > 0 && !!stack.charAt( 0 ).match( /\s/gi ) )
      stack = stack.substring( 1 );
    return stack;
  }

  /**
   * @class Logger
   * @constructor Logger
   * @since 1.0.0
   * @deprecated since version 1.0.0
   * @description Calling the constructor function of Logger throws an error.
   * @classdesc Logs messages with the browser Console API. This class should not
   be instantiated and is supposed to be used as a constructor function to access
   static methods.
   * @summary The Logger class only provides static methods and should not be
   instantiated.
   * @exception {Error} throws an Error when called
   */
  constructor() {
    throw new Error( 'The constructor function object Logger should not be' +
      ' instantiated.' );
  }

}
;// CONCATENATED MODULE: ./src/SuperExtensionManager.js
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
class SuperExtensionManager {

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
        let currentPrototype = Identifier.isConstructorFunction( extensionObject ) ? extensionObject.prototype :
          Identifier.isPrototype( extensionObject ) ? extensionObject : void 0;
        if ( !currentPrototype ||
          !Identifier.isFunction( currentPrototype[ methodName ] ) ||
          hostObject[ methodName ] == currentPrototype[ methodName ] ) continue;
        superPrototype = currentPrototype;
        break;
      }
      if ( !superPrototype ) return void 0;
      const temporaryMethodName = Identifier.generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
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
      const temporaryMethodName = Identifier.generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
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
      return Identifier["instanceof"]( hostObject, constructorObject );
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
          return Identifier["instanceof"]( leftHandOperand, constructorFunction, false );
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
;// CONCATENATED MODULE: ./src/AccessorDescriptorReplicator.js
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
class AccessorDescriptorReplicator {

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
;// CONCATENATED MODULE: ./src/DataDescriptorReplicator.js
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
class DataDescriptorReplicator {

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
;// CONCATENATED MODULE: ./src/Cloner.js
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
class Cloner {

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
      !config.mirrorGettersAndSetters ? true : AccessorDescriptorReplicator.mirrorGettersAndSettersFromPrototypeOnWholePrototypeChain( {
        hostObject: hostObject,
        prototype: extensionObject,
        override: !hasConfig ? false : !!config.overrideGettersAndSetters
      } );
    const dataDescriptorPropertiesMirrored = DataDescriptorReplicator.mirrorDataDescriptorsFromPrototypeOnWholePrototypeChain( {
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
      !config.mirrorGettersAndSetters ? true : AccessorDescriptorReplicator.mirrorGettersAndSettersFromInstanceOnWholePrototypeChain( {
        hostObject: hostObject,
        instance: new extensionObject( ...extensionConstructorArgs ),
        override: !hasConfig ? false : !!config.overrideGettersAndSetters
      } );
    const dataDescriptorPropertiesMirrored = DataDescriptorReplicator.mirrorDataDescriptorsFromInstanceOnWholePrototypeChain( {
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
;// CONCATENATED MODULE: ./test/Student.js
class Mammal {

  constructor( weight ) {
    Object.defineProperty( this, "_weight", {
      value: weight,
      writable: true,
      configurable: true,
      enumarable: false
    } );
  }

  get weight() {
    return this._weight;
  }

  eat() {}

}

class Human extends Mammal {

  constructor( name, age, weight ) {
    super( weight );
    this._name = name;
  }

  get name() {
    return this._name;
  }

  breathe() {}

}

class Student extends Human {

  constructor( name, age ) {
    super( name, age );
    this._credits = 0;
  }

  addCredits( amountOfCreditsToAdd ) {
    this._credits += amountOfCreditsToAdd;
  }

  get credits() {
    return this._credits;
  }

}
;// CONCATENATED MODULE: ./test/Informatician.js



class Scientist extends Human {

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

class Informatician extends Scientist {

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
;// CONCATENATED MODULE: ./src/Extension.js
/**
 * @name Extension
 * @module Extension
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @license AGPL-3.0-only
 * @file The file Extension.js contains the class Extension. The class Extension
 replicates itself through the keyword this to another obejct.
 * @classdesc Replicates itself and all properties of the scope (this) on an
 inheriting target host object. Should be used as a subclass for classes that
 should be further used in multiple ineritance relationships or to create mixins.
 * @since 1.0.0
 */




/**
 * @name Extension
 * @class Extension
 * @classdesc Replicates itself and all properties of the scope (this) on an
 inheriting target host object. Should be used as a subclass for classes that
 should be further used in multiple ineritance relationships or to create mixins.
 * @description The class Extension replicates itself through the keyword this
 to another obejct.
 * @exports Extension the Extension class (constructor function object)
 * @author Veronica Celac <celac@web.de>
 * @copyright Veronica Celac, 2021
 * @version 1.0.0
 * @since 1.0.0
 * @license AGPL-3.0-only
 */
class Extension {

  /**
   * @class Extension
   * @constructor Extension
   * @since 1.0.0
   * @description Creates a new Extension
   * @classdesc Replicates itself and all properties of the scope (this) on an
   inheriting target host object. Should be used as a subclass for classes that
   should be further used in multiple ineritance relationships or to create mixins.
   * @summary The Extension class replicates its properties and the properties
   of all classes that inherit from it from the current prototype chain on the
   target host object.
   */
  constructor( hostObject, config = void 0 ) {
    if ( Identifier.isObject( hostObject ) )
      Cloner.extendFromInstance( hostObject, this, config );
  }

}
;// CONCATENATED MODULE: ./test/WorkingProfessional.js


class WorkingProfessional extends Extension {

  constructor( hostObject ) {
    super( hostObject );
    this._salary = void 0;
  }

  get salary() {
    return this._salary;
  }

  set salary( newSalary ) {
    this._salary = newSalary;
  }

  startVacation() {}

  static isExtension() {
    return true;
  }

}
;// CONCATENATED MODULE: ./test/InformaticsStudent.js






class InformaticsStudent extends Student {

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

class StudentOfInformatics extends Informatician {

  constructor( name, age ) {
    super( name, age );
    Cloner.extendFromInstance( this, new Student(), null, name, age );
  }

}

class StudentInformatician {

  constructor( name, age ) {
    Cloner.extend( this, InformaticsStudent, null, name, age );
    console.log( this.instanceof( WorkingProfessional ) );
    console.log( this instanceof InformaticsStudent );
    console.log( this instanceof WorkingProfessional );
    console.log( this instanceof Student );
    this.work( "TaskA", 5 );
  }

}
;// CONCATENATED MODULE: ./index.js




function registerTestObjects() {
  try {
    // window.open( "../out/index.html" );
  } finally {
    Object.defineProperty( window, "inheritanceImitator", {
      value: {},
      configurable: false,
      enumerable: false
    } );
    window.inheritanceImitator.studentA = new InformaticsStudent();
    window.inheritanceImitator.studentB = new StudentOfInformatics();
    window.inheritanceImitator.studentC = new StudentInformatician();
  }
}

registerTestObjects();
/******/ })()
;
//# sourceMappingURL=main.js.map