export default class Identifier {

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