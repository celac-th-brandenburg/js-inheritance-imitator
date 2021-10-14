import Identifier from './Identifier';

export default class Logger {

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

  static trace( logMessage, errorOrErrorText = null, returnValue ) {
    let fullFunctionName = Logger.getFullFunctionName( 1, "." );
    let message = "";
    if ( Identifier.isString( fullFunctionName ) ) message += fullFunctionName;
    if ( Identifier.isString( logMessage ) )
      message += !Identifier.isString( message ) ? logMessage : "\n" + logMessage;
    return Logger._trace( message, errorOrErrorText, returnValue );
  }

  static traceIf( doTrace = true, logMessage, errorOrErrorText = null, returnValue ) {
    if ( !doTrace ) return returnValue;
    return Logger.trace( logMessage, errorOrErrorText, returnValue );
  }

  static getCurrentTime() {
    let fullDate = new Date();
    let hours = Logger.dateNumberToString( fullDate.getHours() );
    let minutes = Logger.dateNumberToString( fullDate.getMinutes() );
    let seconds = Logger.dateNumberToString( fullDate.getSeconds() );
    let milliseconds = Logger.dateNumberToString( fullDate.getMilliseconds(), true );
    return `${ hours }:${ minutes }:${ seconds }:${ milliseconds }`;
  }

  static dateNumberToString( dateNumber, threeDigits = false ) {
    if ( !Identifier.isPositiveInteger( dateNumber ) ) return "";
    let stringDateNumber = dateNumber.toString();
    while ( stringDateNumber.length < 2 )
      stringDateNumber = "0" + stringDateNumber;
    while ( threeDigits && stringDateNumber.length < 3 )
      stringDateNumber = "0" + stringDateNumber;
    return stringDateNumber;
  }

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
}