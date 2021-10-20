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

import Cloner from './Cloner';
import Identifier from './Identifier';

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
export default class Extension {

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