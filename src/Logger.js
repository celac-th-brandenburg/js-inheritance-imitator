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

import Identifier from './Identifier';

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
export default class Logger {

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