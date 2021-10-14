import Identifier from './Identifier';
import Logger from './Logger';

export default class SuperExtensionManager {

  static addSuperMethod( hostObject ) {
    if ( !Identifier.isObject( hostObject ) ||
      Identifier.isFunction( hostObject.super ) ) return false;
    hostObject.super = ( methodName, ...args ) => {
      if ( !Identifier.isSet( hostObject.__extends ) ) return void 0;
      let superPrototype = void 0;
      for ( let extensionObject of hostObject.__extends ) {
        let currentPrototype = Identifier
          .isConstructorFunction( extensionObject ) ? extensionObject.prototype :
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
      const temporaryMethodName = Identifier
        .generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
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
      const temporaryMethodName = Identifier
        .generateRandomString( "__tempSuperMethod" ).replaceAll( /\W/g, "" );
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
      return Identifier.instanceof( hostObject, constructorObject );
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
          return Identifier
            .instanceof( leftHandOperand, constructorFunction, false );
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