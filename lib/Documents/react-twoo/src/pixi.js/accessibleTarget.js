/*
 * react-twoo
 * undefined
 * https://github.com/aarondupon/react-twoo
 * v0.1.0
 * undefined License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _commonjsHelpers = require('../../../../_virtual/_commonjsHelpers.js');

var accessibleTarget = _commonjsHelpers.createCommonjsModule(function (module, exports) {

exports.__esModule = true;
/**
 * Default property values of accessible objects
 * used by {@link PIXI.accessibility.AccessibilityManager}.
 *
 * @function accessibleTarget
 * @memberof PIXI.accessibility
 * @example
 *      function MyObject() {}
 *
 *      Object.assign(
 *          MyObject.prototype,
 *          PIXI.accessibility.accessibleTarget
 *      );
 */

exports["default"] = {
  /**
   *  Flag for if the object is accessible. If true AccessibilityManager will overlay a
   *   shadow div with attributes set
   *
   * @member {boolean}
   */
  accessible: false,

  /**
   * Sets the title attribute of the shadow div
   * If accessibleTitle AND accessibleHint has not been this will default to 'displayObject [tabIndex]'
   *
   * @member {string}
   */
  accessibleTitle: null,

  /**
   * Sets the aria-label attribute of the shadow div
   *
   * @member {string}
   */
  accessibleHint: null,

  /**
   * @todo Needs docs.
   */
  tabIndex: 0,

  /**
   * @todo Needs docs.
   */
  _accessibleActive: false,

  /**
   * @todo Needs docs.
   */
  _accessibleDiv: false
};
});

var accessibleTarget$1 = _commonjsHelpers.unwrapExports(accessibleTarget);

exports.__moduleExports = accessibleTarget;
exports.default = accessibleTarget$1;