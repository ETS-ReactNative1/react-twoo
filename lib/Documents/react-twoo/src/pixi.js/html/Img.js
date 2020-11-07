/*
 * react-twoo
 * undefined
 * https://github.com/aarondupon/react-twoo
 * v0.1.0
 * undefined License
 */

'use strict';

var _rollupPluginBabelHelpers = require('../../../../../_virtual/_rollupPluginBabelHelpers.js');
var index = require('../../../../../node_modules/pixi.js/lib/index.js');
var css = require('css-to-react-native');
require('parse-css-transition');
require('fbjs/lib/camelizeStyleName');
var shallowequal = require('shallowequal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var css__default = /*#__PURE__*/_interopDefaultLegacy(css);
var shallowequal__default = /*#__PURE__*/_interopDefaultLegacy(shallowequal);

var AssetsLoader = /*#__PURE__*/function () {
  function AssetsLoader() {
    _rollupPluginBabelHelpers.classCallCheck(this, AssetsLoader);

    this.resources = {};
    this._isLoading = false;
    this.resouceQueu = window.resouceQueu || (window.resouceQueu = []);
    this.loadIndex = 0;
  }

  _rollupPluginBabelHelpers.createClass(AssetsLoader, [{
    key: "add",
    value: function add(url, name, cb) {
      var res = this.resources[name];

      if (res) {
        cb(_rollupPluginBabelHelpers.defineProperty({}, res.name, res));
        return;
      }

      try {
        this.loadResource(url, name, cb);
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.loader.removeAllListeners();
    }
  }, {
    key: "loadResource",
    value: function loadResource(url, name, cb) {
      var _this = this;

      var loader = new index.loaders.Loader();
      this.resouceQueu.push({
        url: url,
        name: name,
        cb: cb
      });
      loader.removeAllListeners();
      loader.add(name, url, function (res) {
        var obj = _this.resouceQueu.find(function (x) {
          return x.name === res.name;
        });

        _this.resources[res.name] = res;
        cb(_rollupPluginBabelHelpers.defineProperty({}, res.name, res));
      });
      loader.load();
    }
  }]);

  return AssetsLoader;
}();

var assetsLoader = new AssetsLoader();

function transformBackgroundImage(image, width, height) {
  var texture = image.texture;
  var textureWidth = texture.width,
      textureHeight = texture.height; // Generic as can be:
  // Image data: (wi, hi) and define ri = wi / hi
  // Screen resolution: (ws, hs) and define rs = ws / hs
  // Scaled image dimensions:

  var wi = textureWidth;
  var hi = textureHeight;
  var ws = width;
  var hs = height;
  var ri = wi / hi;
  var rs = ws / hs; // texture needs downscale

  var _ref = rs < ri ? [wi * hs / hi, hs] : [ws, hi * ws / wi],
      _ref2 = _rollupPluginBabelHelpers.slicedToArray(_ref, 2),
      sx = _ref2[0],
      sy = _ref2[1];
  // center

  var wn = sx; //(ws/sx)*ws;

  var hn = sy; // const tx = ( -(ws - wn)/2)/ws;
  // const ty = ((ws-hn)/2)/ws;

  var tx = ws / 2 - wn / 2; //wn 

  var ty = (hs - hn) / 2; //ws;

  image.width = wn;
  image.height = hn;
  image.x = tx;
  image.y = ty; // image.pivot.x = tx;
  // image.pivot.y = ty;
}

function addBackgroundImage(src, backgroundSize, w, h) {
  var _this2 = this;

  if (this._src === src && this.backgroundImage) {
    transformBackgroundImage(this.backgroundImage, this.width, this.height);
    return;
  }

  var name = src; //this._UID

  console.log('load', name, src);
  this.backgroundImage && this.removeChild(this.backgroundImage);

  var handleAssetsLoaded = function handleAssetsLoaded(resources) {
    _this2.backgroundImage && _this2.removeChild(_this2.backgroundImage);
    var originalframe = resources[name].texture;
    var image;

    if (!_this2.props.enableMesh) {
      image = new undefined(originalframe);
    } else {
      var mesh = new index.mesh.Plane(originalframe, 20, 20);
      image = mesh;
    }

    transformBackgroundImage(image, _this2.width, _this2.height); // image.interactive = this.interactive;
    // image.shader = this.shader;
    // image.filters =  this.filters;

    _this2.addChild(image);

    _this2.backgroundImage = image; // console.log('loaded',this,src,originalframe)
    // image.cashAsBitmap = true

    if (_this2.props.casheAsBitmap) { _this2.casheAsBitmap = true; }
    if (_this2.props.enableMesh && typeof _this2.props.onMesh === "function") { _this2.props.onMesh(image); }
  };

  var handleAssetsLoadedBinded = handleAssetsLoaded.bind(this);

  if (assetsLoader.resources[src]) {
    return handleAssetsLoaded(assetsLoader.resources);
  }

  return assetsLoader.add(src, src, handleAssetsLoadedBinded);
}
var FPS = 30;

var FPSController = function FPSController() {
  var _this3 = this;

  _rollupPluginBabelHelpers.classCallCheck(this, FPSController);

  _rollupPluginBabelHelpers.defineProperty(this, "dates", {});

  _rollupPluginBabelHelpers.defineProperty(this, "checkfps", function () {
    var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : FPS;
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!_this3.dates[id]) { _this3.dates[id] = Date.now(); }
    var allow = false;
    var interval = 1000 / fps;
    var then = _this3.dates[id];
    var now = Date.now();
    var delta = now - then;

    if (delta > interval && _this3.dates[id]) {
      _this3.dates[id] = now - delta % interval;
      allow = true;
    }

    return allow;
  });
};

var fpsController = new FPSController(); // utils

var parseColor = function parseColor(color) {
  var colorObj = rgbToHex(color);
  return colorObj;
};

function rgbToHex(strColor) {
  if (strColor.substr(0, 1) === '#' || strColor.substr(0, 1) === '0x') {
    var _hex = strColor.includes('#') ? strColor.replace('#', '0x') : strColor;

    return {
      hex: _hex,
      alpha: 1
    };
  }

  var rgbReg = /^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  var rgbaReg = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?([+-]?([0-9]+([.][0-9]*)?|[.][0-9]+))?/i;
  var res = strColor.match(strColor.indexOf('rgba') !== -1 ? rgbaReg : rgbReg); //strColor.match();

  var R = res[1];
  var G = res[2];
  var B = res[3];
  var A = res[4];
  var hex = '0x' + (B | G << 8 | R << 16 | 1 << 24).toString(16).slice(1);
  var alpha = parseFloat(A) || 1;
  return {
    hex: hex,
    alpha: alpha
  };
}

function applyCssProperty(property, value, SETTER) {
  if (value && this["__".concat(property)] !== value) {
    //console.log('applyCssProperty',property,value)
    this[SETTER || property] = value;
    this["__".concat(property)] = value;
  }
}

var cssTransfromProperty = {
  scale: function scale(value, target) {
    /**f
     * pixi calculates the scale relative to y
     */
    var sx = target._texture.orig.width > 1 ? target._width / target._texture.orig.width : 1;
    var sy = 1; //target._texture.orig.height > 1 ? target._height / target._texture.orig.height: 1;

    target.scale = {
      x: value * sx,
      y: value * sy
    };
  },
  scaleX: function scaleX(value, target) {
    /**
    * pixi calculates the scale relative to y
    */
    var sx = target._texture.orig.width > 1 ? target._width / target._texture.orig.width : 1;
    var sy = target._texture.orig.height > 1 ? target._height / target._texture.orig.height : 1;
    target.scale = {
      x: value * sx,
      y: target.scale.y * sy
    };
  },
  scaleY: function scaleY(value, target) {
    /**
    * pixi calculates the scale relative to y
    */
    var sx = target._texture.orig.width > 1 ? target._width / target._texture.orig.width : 1;
    var sy = 1; //target._texture.orig.height  > 1 ? target._height / target._texture.orig.height: 1;

    target.scale = {
      x: target.scale.x * sx,
      y: value * sy
    };
  }
};

function applyCssTransformProperty(transform) {
  var _this4 = this;

  transform.forEach(function (tr) {
    var propName = Object.keys(tr)[0];
    var value = tr[propName];
    cssTransfromProperty[propName] && cssTransfromProperty[propName](value, _this4);
  });
} // custom plugins 


function clip(x, y, w, h, maks) {
  var _self = this; //_self.cacheAsBitmap = false;


  if (_self.mask) {
    _self.removeChild(_self.mask);

    _self.mask = null;
  }

  var myMask = new undefined();
  myMask.beginFill();
  myMask.drawRect(x, y, w, h);
  myMask.endFill();

  _self.addChild(myMask);

  _self.mask = myMask; //_self.cacheAsBitmap = true;
  // _self.filterArea = new PIXI.Rectangle(
  //     0,//this.transform.worldTransform.tx,
  //     0,//this.transform.worldTransform.ty,
  //     w,
  //     h
  //     )
}

function drawBoundingbox(w, h) {
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#000000';
  var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  if (this.boundingbox) {
    this.removeChild(this.boundingbox);
  }

  var _parseColor = parseColor(color),
      hex = _parseColor.hex,
      alpha = _parseColor.alpha;

  var boundingbox = new undefined();
  boundingbox.lineStyle(width, hex, alpha);
  boundingbox.drawRect(0, 0, w, h);
  boundingbox.endFill();
  this.boundingbox = boundingbox;
  this.addChild(boundingbox);
} //TODO:: needs to be optimised


function drawBackground(w, h) {
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#000000';

  if (this.background) {
    this.removeChild(this.background);
  }

  var background = new undefined();

  var _parseColor2 = parseColor(color),
      hex = _parseColor2.hex,
      alpha = _parseColor2.alpha;

  background.beginFill(hex, alpha); // drawBackground.lineStyle(width,parseColor(color))

  background.drawRect(0, 0, w, h);
  background.endFill();
  this.background = background;
  this.addChildAt(background, 0);
}
/**
 * object.padding(number, string)
 * Transform the string object to string of the actual width filling by the padding character (by default ' ')
 * Negative value of width means left padding, and positive value means right one
 *
 * @param       number  Width of string
 * @param       string  Padding chacracter (by default, ' ')
 * @return      string
 * @access      public
 */


String.prototype.padding = function (n, c) {
  var val = this.valueOf();

  if (Math.abs(n) <= val.length) {
    return val;
  }

  var m = Math.max(Math.abs(n) - this.length || 0, 0);
  var pad = Array(m + 1).join(String(c || ' ').charAt(0)); //      var pad = String(c || ' ').charAt(0).repeat(Math.abs(n) - this.length);

  return n < 0 ? pad + val : val + pad; //      return (n < 0) ? val + pad : pad + val;
};

var cleanupStyle = function cleanupStyle(style) {
  return Object.keys(style).reduce(function (obj, key) {
    if (style[key] !== 'none') { obj[key] = style[key]; }
    return obj;
  }, {});
};

var getStyle = function getStyle(style) {
  return css__default['default'](Object.keys(style).map(function (key) {
    return [key, String(style[key])];
  }));
};

var Img = /*#__PURE__*/function (_PIXI$Sprite) {
  _rollupPluginBabelHelpers.inherits(Img, _PIXI$Sprite);

  var _super = _rollupPluginBabelHelpers.createSuper(Img);

  function Img(props) {
    var _this5;

    _rollupPluginBabelHelpers.classCallCheck(this, Img);

    _this5 = _super.call(this, props.texture);

    _rollupPluginBabelHelpers.defineProperty(_rollupPluginBabelHelpers.assertThisInitialized(_this5), "clip", clip);

    _rollupPluginBabelHelpers.defineProperty(_rollupPluginBabelHelpers.assertThisInitialized(_this5), "drawBoundingbox", drawBoundingbox);

    _rollupPluginBabelHelpers.defineProperty(_rollupPluginBabelHelpers.assertThisInitialized(_this5), "drawBackground", drawBackground);

    _rollupPluginBabelHelpers.defineProperty(_rollupPluginBabelHelpers.assertThisInitialized(_this5), "applyCssProperty", applyCssProperty);

    _rollupPluginBabelHelpers.defineProperty(_rollupPluginBabelHelpers.assertThisInitialized(_this5), "applyCssTransformProperty", applyCssTransformProperty);

    _rollupPluginBabelHelpers.defineProperty(_rollupPluginBabelHelpers.assertThisInitialized(_this5), "addBackgroundImage", addBackgroundImage);

    _this5.props = props;
    _this5._UID = "div_".concat(new Date().getTime());
    var style = Object.assign(JSON.parse(JSON.stringify(Img.defaultProps.style)), props.style);
    _this5._style = getStyle(cleanupStyle(style));
    return _this5;
  } //plugins


  _rollupPluginBabelHelpers.createClass(Img, [{
    key: "applyStyle",
    value: function applyStyle(style) {
      if (!style) { return; }
      this.getBounds();
      var bounds = this._bounds;
      var width = this._width || style.width || bounds.maxX - bounds.minX;
      var height = this._height || style.height || bounds.maxY - bounds.minY;
      var _this$texture = this.texture,
          textureWidth = _this$texture.width,
          textureHeight = _this$texture.height;
      this.width === 0 && (this.width = width);
      this.height === 0 && (this.height = height);

      if (style.transform) {
        this.applyCssTransformProperty(style.transform);
      } //clippig
      // this._clip =  false    
      // if(
      //     style.overflow === 'hidden'  
      //     && width 
      //     && height
      //     && (this.__width !== width ||this.__height !== height)
      //     ){
      //         console.log('_clip_clip_clip',this.texture.valid ? textureWidth : width)
      //         // this.clip(0,0,width,height,this.props)   
      //         this.clip(0,0,this.texture.valid ? textureWidth : width ,this.texture.valid ? textureHeight : height ,style.backgroundColor,style.borderWidth,style.borderStyle)
      //         this._clip = true;        
      // }
      //borderColor 


      if ((style.borderColor || style.borderWidth) && (this.__width !== width || this.__height !== height || this.__textureWidth !== textureWidth || this.__textureHeight !== textureHeight)) {
        this.drawBoundingbox(textureWidth || width, textureHeight || height, style.borderColor, style.borderWidth, style.borderStyle);
      } //background


      if (style.backgroundColor && (this.__width !== width || this.__height !== height || this.__textureWidth !== textureWidth || this.__textureHeight !== textureHeight)) {
        this.drawBackground(this.texture.valid ? textureWidth : width, this.texture.valid ? textureHeight : height, style.backgroundColor, style.borderWidth, style.borderStyle);
      } //backgroudImage


      if (this.src && (this.__width !== width || this.__height !== height || this.__textureWidth !== textureWidth || this.__textureHeight !== textureHeight)) {
        this.addBackgroundImage(this.props.src, this.texture.valid ? textureWidth : width, this.texture.valid ? textureHeight : height, style.backgroundColor, style.borderWidth, style.borderStyle);
      }

      this.applyCssProperty('left', style.left, 'x');
      this.applyCssProperty('top', style.top, 'y');
      this.applyCssProperty('opacity', style.opacity);
      this.applyCssProperty('zBuffer', style.zIndex); // applyCssProperty('transform',style.transform,(transform)=>{
      //         console.log('transform',transform)
      // });
      // if(newStyle.transform){
      //     newStyle.transform.forEach((obj)=>Object.assign(this,obj))
      // }

      if (this.parent) {
        this.applyCssProperty('right', style.right, this.parent._bounds.maxX - style.right, 'x');
        this.applyCssProperty('bottom', style.bottom, this.parent._bounds.maxY - style.bottom, 'y');
      }

      this.__width = width;
      this.__height = height;
      this.__textureWidth = this.texture.width || width;
      this.__textureHeight = this.texture.height || height; // this._style = style
    }
    /**
    * Updates the transform on all children of this container for rendering
    */

  }, {
    key: "updateTransform",
    value: function updateTransform() {
      this._boundsID++;
      this.transform.updateTransform(this.parent.transform); // TODO: check render flags, how to process stuff here

      this.worldAlpha = this.alpha * this.parent.worldAlpha;

      for (var i = 0, j = this.children.length; i < j; ++i) {
        var child = this.children[i];

        if (child.visible) {
          child.updateTransform();
        }
      }

      if (this._filters) {
        // this._filters.forEach(filter=>filter.worldTransform =this.transform.worldTransform)
        var bounds = this._bounds;
        var width = this.width || this.style.width || bounds.maxX - bounds.minX;
        var height = this.height || this.style.height || bounds.maxY - bounds.minY;
        /**
         * if check on cliip bug on scroll after setState from App.js scrollHeight !!!!!!
         */
        // if(this._clip){
        // console.log(this.transform.worldTransform.ty)

        this.filterArea = new undefined(this.transform.worldTransform.tx, this.transform.worldTransform.ty, width, height); //    / }
      }
    }
  }, {
    key: "calculateBounds",
    value: function calculateBounds() {
      //if(!checkfps(2)) return this._bounds;
      if (!fpsController.checkfps(10, 'calculateBounds')) { return this._bounds; }
      var style = this._style;

      this._bounds.clear();

      this._calculateBounds();

      var width = this._width || style.width;
      var height = this._height || style.height;

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        if (!child.visible || !child.renderable) {
          continue;
        }

        child.calculateBounds(); // TODO: filter+mask, need to mask both somehow

        if (child._mask) {
          child._mask.calculateBounds();

          this._bounds.addBoundsMask(child._bounds, child._mask._bounds);
        } else if (child.filterArea) {
          this._bounds.addBoundsArea(child._bounds, child.filterArea);
        } else {
          this._bounds.addBounds(child._bounds);
        }
      }

      var bounds = new undefined(); // calclulate size        

      var maxX = Number.isInteger(width) ? this._bounds.minX + width : this._bounds.maxX;
      var maxY = Number.isInteger(height) ? this._bounds.minY + height : this._bounds.maxY;
      var paddingLeft = style.paddingLeft || 0;
      var paddingTop = style.paddingTop || 0;
      var paddingRight = style.paddingRight || 0;
      var paddingBottom = style.paddingBottom || 0;
      Object.assign(bounds, {
        minX: this._bounds.mixX - paddingLeft,
        maxX: maxX + paddingRight,
        minY: this._bounds.minY - paddingTop,
        maxY: maxY + paddingBottom
      });

      this._bounds.addBounds(bounds);

      this._lastBoundsID = this._boundsID;
      return this._bounds;
    }
  }, {
    key: "style",
    get: function get() {
      return this._style;
    },
    set: function set(style) {
      var newStyle = getStyle(cleanupStyle(style));
      shallowequal__default['default'](newStyle, this._style) === false && this.applyStyle(newStyle);
      this._style = newStyle;
    }
    /**
     * The width of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this._texture.orig.width > 1 ? Math.abs(this.scale.x) * this._texture.orig.width : this._width;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      var s = Math.sign(this.scale.x) || 1;
      if (this._texture.orig.width > 1) { this.scale.x = s * value / this._texture.orig.width; }
      this._width = value;
      this.applyStyle(this._style);
    }
    /**
     * The height of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @member {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this._texture.orig.width > 1 ? Math.abs(this.scale.y) * this._texture.orig.height : this._height;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      var s = Math.sign(this.scale.y) || 1;
      if (this._texture.orig.height > 1) { this.scale.y = s * value / this._texture.orig.height; }
      this._height = value;
      this.applyStyle(this._style);
    }
  }, {
    key: "opacity",
    get: function get() {
      return this._alpha || 1;
    },
    set: function set(opacity) {
      this._alpha = opacity;
    }
  }, {
    key: "alpha",
    get: function get() {
      return this._alpha || 1;
    },
    set: function set(alpha) {
      this._alpha = alpha;
    }
  }, {
    key: "translateX",
    get: function get() {
      return this._translateX || 0;
    },
    set: function set(translateX) {
      this._translateX = translateX;
      this.x = this.position.x + translateX;
    }
  }, {
    key: "translateY",
    get: function get() {
      return this._translateY || 0;
    },
    set: function set(translateY) {
      this._translateY = translateY;
      this.y = this.position.y + translateY;
    }
  }, {
    key: "x",
    get: function get() {
      return this.transform.position.x;
    },
    set: function set(x) {
      this.transform.position.x = x + this.translateX + (this._style.paddingLeft || 0);
    }
  }, {
    key: "y",
    get: function get() {
      return this.transform.position.y;
    },
    set: function set(y) {
      this.transform.position.y = y + this.translateY + (this._style.paddingTop || 0);
    }
  }, {
    key: "src",
    set: function set(source) {
      if (this._src !== source) {
        this.addBackgroundImage(source);
      }

      this._src = source;
    },
    get: function get() {
      return this._src;
    }
  }, {
    key: "enableMesh",
    set: function set(enableMesh) {
      this._enableMesh = enableMesh;
    },
    get: function get() {
      return this._enableMesh;
    }
  }]);

  return Img;
}(undefined);
Img.defaultProps = {
  style: {
    color: 'none',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    height: 'initial',
    width: 'initial',
    overflow: 'none',
    overflowX: 'none',
    overflowY: 'none',
    transform: 'none',
    border: 'none',
    opacity: 'none',
    zIndex: 'none'
  },
  src: null
};
undefined = Img;

module.exports = Img;