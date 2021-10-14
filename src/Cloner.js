import Identifier from './Identifier';
import Logger from './Logger';
import SuperExtensionManager from './SuperExtensionManager';
import AccessorDescriptorReplicator from './AccessorDescriptorReplicator';
import DataDescriptorReplicator from './DataDescriptorReplicator';

export default class Cloner {

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