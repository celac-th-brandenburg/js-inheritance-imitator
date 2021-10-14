/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/Identifier.js
class Identifier {

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

  static isProtoype( inputParameter ) {
    return Identifier.isObject( inputParameter ) &&
      Reflect.has( inputParameter, "constructor" );
  }

  static isConstructorFunction( inputParameter ) {
    return typeof inputParameter == "function" &&
      Reflect.has( inputParameter, "prototype" ) &&
      Reflect.has( inputParameter, "constructor" );
  }

  static isObject( inputParameter ) {
    return !!inputParameter && typeof inputParameter == "object";
  }

  static isString( inputParameter ) {
    return !!inputParameter &&
      typeof inputParameter == "string" && inputParameter.length > 0;
  }

  static isNumber( inputParameter ) {
    return typeof inputParameter == "number";
  }

  static isInteger( inputParameter ) {
    return Identifier.isNumber( inputParameter ) &&
      Number.isInteger( inputParameter );
  }

  static isPositiveNumber( inputParameter, canBeZero = true ) {
    return Identifier.isNumber( inputParameter ) &&
      ( !canBeZero ? inputParameter > 0 : inputParameter >= 0 );
  }

  static isPositiveInteger( inputParameter, canBeZero = true ) {
    return Identifier.isInteger( inputParameter ) &&
      Identifier.isPositiveNumber( inputParameter, canBeZero );
  }

  static isBoolean( inputParameter ) {
    return typeof inputParameter == "boolean";
  }

  static isFunction( inputParameter ) {
    return !!inputParameter && typeof inputParameter == "function";
  }

  static isArray( inputParameter, testLength = false ) {
    if ( !( inputParameter instanceof Array ) ) return false;
    if ( Identifier.isBoolean( testLength ) )
      return !testLength ? true : inputParameter.length > 0;
    if ( !Identifier.isPositiveInteger( testLength, true ) ) return true;
    return inputParameter.length === testLength;
  }

  static isSet( inputParameter, testSize = false ) {
    return !( inputParameter instanceof Set ) ? false : !testSize ? true :
      inputParameter.size > 0;
  }

  static isIterable( inputParameter ) {
    if ( !Identifier.isObject( inputParameter ) &&
      !Identifier.isString( inputParameter ) ) return false;
    return Identifier.isFunction( inputParameter[ Symbol.iterator ] );
  }

  static isObjectPath( parentObject, pathString = "" ) {
    if ( !Identifier.isFunction( pathString.split ) ) return false;
    let pathArray = pathString.split( "." );
    if ( pathArray.length > 0 ) pathArray.shift();
    return Identifier._isObjectHierarchy( parentObject, pathArray );
  }

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

  static _isObjectHierarchy( parentObject, levelsArray = [] ) {
    if ( !Identifier.isObject( parentObject ) ) return false;
    let currentlyValidating = parentObject;
    for ( let childLevelName of levelsArray ) {
      currentlyValidating = currentlyValidating[ childLevelName ];
      if ( !Identifier.isObject( currentlyValidating ) ) return false;
    }
    return true;
  }

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

  static firstMatchIndex( source, regExp ) {
    const firstMatch = Identifier._getFirstMatchArr( source, regExp );
    if ( !Identifier.isArray( firstMatch, true ) ) return -1;
    const index = firstMatch.index;
    return Identifier.isPositiveInteger( index ) ? index : -1;
  }

}
;// CONCATENATED MODULE: ./src/Logger.js


class Logger {

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
;// CONCATENATED MODULE: ./src/SuperExtensionManager.js



class SuperExtensionManager {

  static addSuperMethod( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isFunction( hostObject.super ) ) return false;
    hostObject.super = ( methodName, ...args ) => {
      if ( !Identifier.isSet( hostObject.__extends ) ) return void 0;
      let superPrototype = void 0;
      for ( let extensionObject of hostObject.__extends ) {
        let currentPrototype = Identifier.isConstructorFunction( extensionObject ) ? extensionObject.prototype :
          Identifier.isProtoype( extensionObject ) ? extensionObject : void 0;
        if ( !currentPrototype ||
          !Identifier.isFunction( currentPrototype[ methodName ] ) ) continue;
        if ( hostObject[ methodName ] == currentPrototype[ methodName ] ) {
          continue;
        }
        superPrototype = currentPrototype;
        break;
      }
      if ( !superPrototype ) return void 0;
      const temporaryMethodName = Identifier.generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
      hostObject[ temporaryMethodName ] = superPrototype[ methodName ];
      const returnValue = hostObject[ temporaryMethodName ]( ...args );
      delete hostObject[ temporaryMethodName ];
      return returnValue;
    };
    return true;
  }

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
      const returnValue = hostObject[ temporaryMethodName ]( ...args );
      delete hostObject[ temporaryMethodName ];
      return returnValue;
    };
    return true;
  }

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

  static getPrototypeExtensions( constructorObject ) {
    const prototype = Identifier.isConstructorFunction( constructorObject ) ?
      constructorObject.prototype : Identifier.isProtoype( constructorObject ) ?
      constructorObject : void 0;
    if ( !prototype ) return new Set();
    return Identifier.isSet( prototype.__extends ) ? prototype.__extends :
      new Set();
  }

  static addExtendsSet( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isSet( hostObject.__extends ) ) return false;
    hostObject.__extends = new Set();
    return true;
  }

  static addInstanceofFunction( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isFunction( hostObject.instanceof ) ) return false;
    hostObject.instanceof = ( constructorObject ) => {
      return Identifier["instanceof"]( hostObject, constructorObject );
    }
    return true;
  }

  static redefineHasInstanceSymbol( constructorObject ) {
    const constructorFunction =
      Identifier.isConstructorFunction( constructorObject ) ?
      constructorObject : Identifier.isProtoype( constructorObject ) ?
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

  static ownsHasInstanceSymbolProperty( constructorFunction ) {
    if ( !Identifier.isConstructorFunction( constructorFunction ) ) return false;
    const propertySymbols = Object.getOwnPropertySymbols( constructorFunction );
    if ( !Identifier.isArray( propertySymbols ) ) return false;
    return propertySymbols.some( propertySymbol =>
      propertySymbol.toString() == "Symbol(Symbol.hasInstance)" );
  }

}
;// CONCATENATED MODULE: ./src/AccessorDescriptorReplicator.js




class AccessorDescriptorReplicator {

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
;// CONCATENATED MODULE: ./src/DataDescriptorReplicator.js




const NON_CLONABLE_PROPERTY_NAMES = [ "constructor", "super",
  "instanceof", "__extends"
];

class DataDescriptorReplicator {

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
;// CONCATENATED MODULE: ./src/Cloner.js






class Cloner {

  static extend( hostObject, extensionObject, config, ...extensionConstructorArgs ) {
    if ( Identifier.isConstructorFunction( extensionObject ) )
      return Cloner.extendFromConstructorFunction( hostObject, extensionObject,
        config, ...extensionConstructorArgs );
    if ( Identifier.isProtoype( extensionObject ) )
      return Cloner.extendFromPrototype( hostObject, extensionObject,
        config, ...extensionConstructorArgs );
    return false;
  }

  static extendFromInstance( hostObject, extensionInstance, config, ...extensionConstructorArgs ) {
    if ( !Identifier.isObject( extensionInstance ) ) return false;
    if ( Identifier.isConstructorFunction( extensionInstance.constructor ) )
      return Cloner.extendFromConstructorFunction( hostObject,
        extensionInstance.constructor, config, ...extensionConstructorArgs );
    return Cloner.extendFromPrototype( hostObject,
      Object.getPrototypeOf( extensionInstance ),
      config, ...extensionConstructorArgs );
  }

  static extendFromPrototype( hostObject, extensionObject, config, ...extensionConstructorArgs ) {
    if ( !Identifier.isObject( hostObject ) )
      return Logger.trace( `Could not extend an invalid object.`, null, false );
    if ( !Identifier.isProtoype( extensionObject ) )
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



class Extension {

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











var Random = class extends Student {};

class InformaticsStudent extends Student {

  #private() {
    Logger.trace();
  }

  constructor( name, age ) {
    // Object.defineProperty( InformaticsStudent, Symbol.hasInstance, {
    //   value: function( leftHandOperand ) {
    //     return Identifier.instanceof( leftHandOperand, InformaticsStudent, false );
    //   }
    // } );
    super( name, age );
    // Cloner.extend( this, Informatician, null, name, age );
    new WorkingProfessional( this );
    this.abc;
    new Random();
    delete this.eat;
    this.eat();
    // console.log( this.instanceof( Informatician ) );
    // console.log( this.instanceof( Scientist ) );
    // console.log( this.instanceof( WorkingProfessional ) );
    // console.log( this instanceof Extension );
    // this.work( "TaskA", 5 );
    // this.#private();
  }

  work( taskName, hours ) {
    console.log( super.age );
    try {
      this.#private();
    } catch ( err ) {
      Logger.trace( ``, err );
    }
    super.eat();
    this.super( "work", taskName, hours );
  }

  // static[ Symbol.hasInstance ]( leftHandOperand ) {
  //   return Identifier.instanceof( leftHandOperand, InformaticsStudent, false );
  // }

}

Cloner.extend( InformaticsStudent.prototype, Informatician, null );
new WorkingProfessional( InformaticsStudent.prototype );

class StudentOfInformatics extends Informatician {

  constructor( name, age ) {
    super( name, age );
    Cloner.extendFromInstance( this, new Student(), null, name, age );
    // console.log( this.instanceof( Informatician ) );
    // console.log( this.instanceof( Student ) );
  }

}

class StudentInformatician {

  constructor( name, age ) {
    let a = new InformaticsStudent();
    Cloner.extend( this, InformaticsStudent, null, name, age );
    // Cloner.extend( this, new Informatician(), null, name, age );
    // Cloner.extend( this, new Student(), null, name, age, faculty );
    // console.log( this.instanceof( Informatician ) );
    // console.log( this.instanceof( Student ) );
    console.log( this.instanceof( WorkingProfessional ) );
    console.log( this instanceof InformaticsStudent );
    console.log( this instanceof WorkingProfessional );
    console.log( this instanceof Student );
    console.log( a instanceof WorkingProfessional );
    console.log( a instanceof InformaticsStudent );
    this.work( "TaskA", 5 );
  }

}
;// CONCATENATED MODULE: ./index.js




function registerTestObjects() {
  Object.defineProperty( window, "inheritanceImitator", {
    value: {},
    configurable: false,
    enumerable: false
  } );
  window.inheritanceImitator.studentA = new InformaticsStudent();
  window.inheritanceImitator.studentB = new StudentOfInformatics();
  window.inheritanceImitator.studentC = new StudentInformatician();
}

registerTestObjects();
/******/ })()
;
//# sourceMappingURL=main.js.map