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
export default class Identifier {

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