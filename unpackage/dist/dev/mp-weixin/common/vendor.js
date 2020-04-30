(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 132:
/*!*********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/wd_016.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAADSCAYAAAA/mZ5CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGQThERDBFMzM3RDExRUE4QzE3OUU0MkIyQzBGMEU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGQThERDBGMzM3RDExRUE4QzE3OUU0MkIyQzBGMEU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkZBOEREMEMzMzdEMTFFQThDMTc5RTQyQjJDMEYwRTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkZBOEREMEQzMzdEMTFFQThDMTc5RTQyQjJDMEYwRTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5X/6nHAAAk4ElEQVR42uxd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"

/***/ }),

/***/ 133:
/*!*********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/wd_015.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAADSCAYAAAA/mZ5CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMxMUE3M0VEMzM3RDExRUE4OTk4QTI3MTE2QTBBQjA0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMxMUE3M0VFMzM3RDExRUE4OTk4QTI3MTE2QTBBQjA0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzExQTczRUIzMzdEMTFFQTg5OThBMjcxMTZBMEFCMDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzExQTczRUMzMzdEMTFFQTg5OThBMjcxMTZBMEFCMDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Tyv4AAAAjMUlEQVR42uxd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"

/***/ }),

/***/ 134:
/*!*********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/wd_014.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAADSCAYAAAA/mZ5CAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMyNkFGRjc1MzM3RDExRUFCNkQ1RjI1NUFCNzk3Q0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMyNkFGRjc2MzM3RDExRUFCNkQ1RjI1NUFCNzk3Q0MxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI2QUZGNzMzMzdEMTFFQUI2RDVGMjU1QUI3OTdDQzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI2QUZGNzQzMzdEMTFFQUI2RDVGMjU1QUI3OTdDQzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4sm/PRAAAfLUlEQVR42uyd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"

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/components/style/resetm.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 259:
/*!**************************************************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/components/common/simple-address/city-data/province.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11" },

{
  "label": "天津市",
  "value": "12" },

{
  "label": "河北省",
  "value": "13" },

{
  "label": "山西省",
  "value": "14" },

{
  "label": "内蒙古自治区",
  "value": "15" },

{
  "label": "辽宁省",
  "value": "21" },

{
  "label": "吉林省",
  "value": "22" },

{
  "label": "黑龙江省",
  "value": "23" },

{
  "label": "上海市",
  "value": "31" },

{
  "label": "江苏省",
  "value": "32" },

{
  "label": "浙江省",
  "value": "33" },

{
  "label": "安徽省",
  "value": "34" },

{
  "label": "福建省",
  "value": "35" },

{
  "label": "江西省",
  "value": "36" },

{
  "label": "山东省",
  "value": "37" },

{
  "label": "河南省",
  "value": "41" },

{
  "label": "湖北省",
  "value": "42" },

{
  "label": "湖南省",
  "value": "43" },

{
  "label": "广东省",
  "value": "44" },

{
  "label": "广西壮族自治区",
  "value": "45" },

{
  "label": "海南省",
  "value": "46" },

{
  "label": "重庆市",
  "value": "50" },

{
  "label": "四川省",
  "value": "51" },

{
  "label": "贵州省",
  "value": "52" },

{
  "label": "云南省",
  "value": "53" },

{
  "label": "西藏自治区",
  "value": "54" },

{
  "label": "陕西省",
  "value": "61" },

{
  "label": "甘肃省",
  "value": "62" },

{
  "label": "青海省",
  "value": "63" },

{
  "label": "宁夏回族自治区",
  "value": "64" },

{
  "label": "新疆维吾尔自治区",
  "value": "65" },

{
  "label": "台湾",
  "value": "66" },

{
  "label": "香港",
  "value": "67" },

{
  "label": "澳门",
  "value": "68" },

{
  "label": "钓鱼岛",
  "value": "69" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 260:
/*!**********************************************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/components/common/simple-address/city-data/city.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "市辖区",
  "value": "1101" }],

[{
  "label": "市辖区",
  "value": "1201" }],

[{
  "label": "石家庄市",
  "value": "1301" },

{
  "label": "唐山市",
  "value": "1302" },

{
  "label": "秦皇岛市",
  "value": "1303" },

{
  "label": "邯郸市",
  "value": "1304" },

{
  "label": "邢台市",
  "value": "1305" },

{
  "label": "保定市",
  "value": "1306" },

{
  "label": "张家口市",
  "value": "1307" },

{
  "label": "承德市",
  "value": "1308" },

{
  "label": "沧州市",
  "value": "1309" },

{
  "label": "廊坊市",
  "value": "1310" },

{
  "label": "衡水市",
  "value": "1311" }],


[{
  "label": "太原市",
  "value": "1401" },

{
  "label": "大同市",
  "value": "1402" },

{
  "label": "阳泉市",
  "value": "1403" },

{
  "label": "长治市",
  "value": "1404" },

{
  "label": "晋城市",
  "value": "1405" },

{
  "label": "朔州市",
  "value": "1406" },

{
  "label": "晋中市",
  "value": "1407" },

{
  "label": "运城市",
  "value": "1408" },

{
  "label": "忻州市",
  "value": "1409" },

{
  "label": "临汾市",
  "value": "1410" },

{
  "label": "吕梁市",
  "value": "1411" }],


[{
  "label": "呼和浩特市",
  "value": "1501" },

{
  "label": "包头市",
  "value": "1502" },

{
  "label": "乌海市",
  "value": "1503" },

{
  "label": "赤峰市",
  "value": "1504" },

{
  "label": "通辽市",
  "value": "1505" },

{
  "label": "鄂尔多斯市",
  "value": "1506" },

{
  "label": "呼伦贝尔市",
  "value": "1507" },

{
  "label": "巴彦淖尔市",
  "value": "1508" },

{
  "label": "乌兰察布市",
  "value": "1509" },

{
  "label": "兴安盟",
  "value": "1522" },

{
  "label": "锡林郭勒盟",
  "value": "1525" },

{
  "label": "阿拉善盟",
  "value": "1529" }],


[{
  "label": "沈阳市",
  "value": "2101" },

{
  "label": "大连市",
  "value": "2102" },

{
  "label": "鞍山市",
  "value": "2103" },

{
  "label": "抚顺市",
  "value": "2104" },

{
  "label": "本溪市",
  "value": "2105" },

{
  "label": "丹东市",
  "value": "2106" },

{
  "label": "锦州市",
  "value": "2107" },

{
  "label": "营口市",
  "value": "2108" },

{
  "label": "阜新市",
  "value": "2109" },

{
  "label": "辽阳市",
  "value": "2110" },

{
  "label": "盘锦市",
  "value": "2111" },

{
  "label": "铁岭市",
  "value": "2112" },

{
  "label": "朝阳市",
  "value": "2113" },

{
  "label": "葫芦岛市",
  "value": "2114" }],


[{
  "label": "长春市",
  "value": "2201" },

{
  "label": "吉林市",
  "value": "2202" },

{
  "label": "四平市",
  "value": "2203" },

{
  "label": "辽源市",
  "value": "2204" },

{
  "label": "通化市",
  "value": "2205" },

{
  "label": "白山市",
  "value": "2206" },

{
  "label": "松原市",
  "value": "2207" },

{
  "label": "白城市",
  "value": "2208" },

{
  "label": "延边朝鲜族自治州",
  "value": "2224" }],


[{
  "label": "哈尔滨市",
  "value": "2301" },

{
  "label": "齐齐哈尔市",
  "value": "2302" },

{
  "label": "鸡西市",
  "value": "2303" },

{
  "label": "鹤岗市",
  "value": "2304" },

{
  "label": "双鸭山市",
  "value": "2305" },

{
  "label": "大庆市",
  "value": "2306" },

{
  "label": "伊春市",
  "value": "2307" },

{
  "label": "佳木斯市",
  "value": "2308" },

{
  "label": "七台河市",
  "value": "2309" },

{
  "label": "牡丹江市",
  "value": "2310" },

{
  "label": "黑河市",
  "value": "2311" },

{
  "label": "绥化市",
  "value": "2312" },

{
  "label": "大兴安岭地区",
  "value": "2327" }],


[{
  "label": "市辖区",
  "value": "3101" }],

[{
  "label": "南京市",
  "value": "3201" },

{
  "label": "无锡市",
  "value": "3202" },

{
  "label": "徐州市",
  "value": "3203" },

{
  "label": "常州市",
  "value": "3204" },

{
  "label": "苏州市",
  "value": "3205" },

{
  "label": "南通市",
  "value": "3206" },

{
  "label": "连云港市",
  "value": "3207" },

{
  "label": "淮安市",
  "value": "3208" },

{
  "label": "盐城市",
  "value": "3209" },

{
  "label": "扬州市",
  "value": "3210" },

{
  "label": "镇江市",
  "value": "3211" },

{
  "label": "泰州市",
  "value": "3212" },

{
  "label": "宿迁市",
  "value": "3213" }],


[{
  "label": "杭州市",
  "value": "3301" },

{
  "label": "宁波市",
  "value": "3302" },

{
  "label": "温州市",
  "value": "3303" },

{
  "label": "嘉兴市",
  "value": "3304" },

{
  "label": "湖州市",
  "value": "3305" },

{
  "label": "绍兴市",
  "value": "3306" },

{
  "label": "金华市",
  "value": "3307" },

{
  "label": "衢州市",
  "value": "3308" },

{
  "label": "舟山市",
  "value": "3309" },

{
  "label": "台州市",
  "value": "3310" },

{
  "label": "丽水市",
  "value": "3311" }],


[{
  "label": "合肥市",
  "value": "3401" },

{
  "label": "芜湖市",
  "value": "3402" },

{
  "label": "蚌埠市",
  "value": "3403" },

{
  "label": "淮南市",
  "value": "3404" },

{
  "label": "马鞍山市",
  "value": "3405" },

{
  "label": "淮北市",
  "value": "3406" },

{
  "label": "铜陵市",
  "value": "3407" },

{
  "label": "安庆市",
  "value": "3408" },

{
  "label": "黄山市",
  "value": "3410" },

{
  "label": "滁州市",
  "value": "3411" },

{
  "label": "阜阳市",
  "value": "3412" },

{
  "label": "宿州市",
  "value": "3413" },

{
  "label": "六安市",
  "value": "3415" },

{
  "label": "亳州市",
  "value": "3416" },

{
  "label": "池州市",
  "value": "3417" },

{
  "label": "宣城市",
  "value": "3418" }],


[{
  "label": "福州市",
  "value": "3501" },

{
  "label": "厦门市",
  "value": "3502" },

{
  "label": "莆田市",
  "value": "3503" },

{
  "label": "三明市",
  "value": "3504" },

{
  "label": "泉州市",
  "value": "3505" },

{
  "label": "漳州市",
  "value": "3506" },

{
  "label": "南平市",
  "value": "3507" },

{
  "label": "龙岩市",
  "value": "3508" },

{
  "label": "宁德市",
  "value": "3509" }],


[{
  "label": "南昌市",
  "value": "3601" },

{
  "label": "景德镇市",
  "value": "3602" },

{
  "label": "萍乡市",
  "value": "3603" },

{
  "label": "九江市",
  "value": "3604" },

{
  "label": "新余市",
  "value": "3605" },

{
  "label": "鹰潭市",
  "value": "3606" },

{
  "label": "赣州市",
  "value": "3607" },

{
  "label": "吉安市",
  "value": "3608" },

{
  "label": "宜春市",
  "value": "3609" },

{
  "label": "抚州市",
  "value": "3610" },

{
  "label": "上饶市",
  "value": "3611" }],


[{
  "label": "济南市",
  "value": "3701" },

{
  "label": "青岛市",
  "value": "3702" },

{
  "label": "淄博市",
  "value": "3703" },

{
  "label": "枣庄市",
  "value": "3704" },

{
  "label": "东营市",
  "value": "3705" },

{
  "label": "烟台市",
  "value": "3706" },

{
  "label": "潍坊市",
  "value": "3707" },

{
  "label": "济宁市",
  "value": "3708" },

{
  "label": "泰安市",
  "value": "3709" },

{
  "label": "威海市",
  "value": "3710" },

{
  "label": "日照市",
  "value": "3711" },

{
  "label": "莱芜市",
  "value": "3712" },

{
  "label": "临沂市",
  "value": "3713" },

{
  "label": "德州市",
  "value": "3714" },

{
  "label": "聊城市",
  "value": "3715" },

{
  "label": "滨州市",
  "value": "3716" },

{
  "label": "菏泽市",
  "value": "3717" }],


[{
  "label": "郑州市",
  "value": "4101" },

{
  "label": "开封市",
  "value": "4102" },

{
  "label": "洛阳市",
  "value": "4103" },

{
  "label": "平顶山市",
  "value": "4104" },

{
  "label": "安阳市",
  "value": "4105" },

{
  "label": "鹤壁市",
  "value": "4106" },

{
  "label": "新乡市",
  "value": "4107" },

{
  "label": "焦作市",
  "value": "4108" },

{
  "label": "濮阳市",
  "value": "4109" },

{
  "label": "许昌市",
  "value": "4110" },

{
  "label": "漯河市",
  "value": "4111" },

{
  "label": "三门峡市",
  "value": "4112" },

{
  "label": "南阳市",
  "value": "4113" },

{
  "label": "商丘市",
  "value": "4114" },

{
  "label": "信阳市",
  "value": "4115" },

{
  "label": "周口市",
  "value": "4116" },

{
  "label": "驻马店市",
  "value": "4117" },

{
  "label": "省直辖县级行政区划",
  "value": "4190" }],


[{
  "label": "武汉市",
  "value": "4201" },

{
  "label": "黄石市",
  "value": "4202" },

{
  "label": "十堰市",
  "value": "4203" },

{
  "label": "宜昌市",
  "value": "4205" },

{
  "label": "襄阳市",
  "value": "4206" },

{
  "label": "鄂州市",
  "value": "4207" },

{
  "label": "荆门市",
  "value": "4208" },

{
  "label": "孝感市",
  "value": "4209" },

{
  "label": "荆州市",
  "value": "4210" },

{
  "label": "黄冈市",
  "value": "4211" },

{
  "label": "咸宁市",
  "value": "4212" },

{
  "label": "随州市",
  "value": "4213" },

{
  "label": "恩施土家族苗族自治州",
  "value": "4228" },

{
  "label": "省直辖县级行政区划",
  "value": "4290" }],


[{
  "label": "长沙市",
  "value": "4301" },

{
  "label": "株洲市",
  "value": "4302" },

{
  "label": "湘潭市",
  "value": "4303" },

{
  "label": "衡阳市",
  "value": "4304" },

{
  "label": "邵阳市",
  "value": "4305" },

{
  "label": "岳阳市",
  "value": "4306" },

{
  "label": "常德市",
  "value": "4307" },

{
  "label": "张家界市",
  "value": "4308" },

{
  "label": "益阳市",
  "value": "4309" },

{
  "label": "郴州市",
  "value": "4310" },

{
  "label": "永州市",
  "value": "4311" },

{
  "label": "怀化市",
  "value": "4312" },

{
  "label": "娄底市",
  "value": "4313" },

{
  "label": "湘西土家族苗族自治州",
  "value": "4331" }],


[{
  "label": "广州市",
  "value": "4401" },

{
  "label": "韶关市",
  "value": "4402" },

{
  "label": "深圳市",
  "value": "4403" },

{
  "label": "珠海市",
  "value": "4404" },

{
  "label": "汕头市",
  "value": "4405" },

{
  "label": "佛山市",
  "value": "4406" },

{
  "label": "江门市",
  "value": "4407" },

{
  "label": "湛江市",
  "value": "4408" },

{
  "label": "茂名市",
  "value": "4409" },

{
  "label": "肇庆市",
  "value": "4412" },

{
  "label": "惠州市",
  "value": "4413" },

{
  "label": "梅州市",
  "value": "4414" },

{
  "label": "汕尾市",
  "value": "4415" },

{
  "label": "河源市",
  "value": "4416" },

{
  "label": "阳江市",
  "value": "4417" },

{
  "label": "清远市",
  "value": "4418" },

{
  "label": "东莞市",
  "value": "4419" },

{
  "label": "中山市",
  "value": "4420" },

{
  "label": "潮州市",
  "value": "4451" },

{
  "label": "揭阳市",
  "value": "4452" },

{
  "label": "云浮市",
  "value": "4453" }],


[{
  "label": "南宁市",
  "value": "4501" },

{
  "label": "柳州市",
  "value": "4502" },

{
  "label": "桂林市",
  "value": "4503" },

{
  "label": "梧州市",
  "value": "4504" },

{
  "label": "北海市",
  "value": "4505" },

{
  "label": "防城港市",
  "value": "4506" },

{
  "label": "钦州市",
  "value": "4507" },

{
  "label": "贵港市",
  "value": "4508" },

{
  "label": "玉林市",
  "value": "4509" },

{
  "label": "百色市",
  "value": "4510" },

{
  "label": "贺州市",
  "value": "4511" },

{
  "label": "河池市",
  "value": "4512" },

{
  "label": "来宾市",
  "value": "4513" },

{
  "label": "崇左市",
  "value": "4514" }],


[{
  "label": "海口市",
  "value": "4601" },

{
  "label": "三亚市",
  "value": "4602" },

{
  "label": "三沙市",
  "value": "4603" },

{
  "label": "儋州市",
  "value": "4604" },

{
  "label": "省直辖县级行政区划",
  "value": "4690" }],


[{
  "label": "市辖区",
  "value": "5001" },

{
  "label": "县",
  "value": "5002" }],


[{
  "label": "成都市",
  "value": "5101" },

{
  "label": "自贡市",
  "value": "5103" },

{
  "label": "攀枝花市",
  "value": "5104" },

{
  "label": "泸州市",
  "value": "5105" },

{
  "label": "德阳市",
  "value": "5106" },

{
  "label": "绵阳市",
  "value": "5107" },

{
  "label": "广元市",
  "value": "5108" },

{
  "label": "遂宁市",
  "value": "5109" },

{
  "label": "内江市",
  "value": "5110" },

{
  "label": "乐山市",
  "value": "5111" },

{
  "label": "南充市",
  "value": "5113" },

{
  "label": "眉山市",
  "value": "5114" },

{
  "label": "宜宾市",
  "value": "5115" },

{
  "label": "广安市",
  "value": "5116" },

{
  "label": "达州市",
  "value": "5117" },

{
  "label": "雅安市",
  "value": "5118" },

{
  "label": "巴中市",
  "value": "5119" },

{
  "label": "资阳市",
  "value": "5120" },

{
  "label": "阿坝藏族羌族自治州",
  "value": "5132" },

{
  "label": "甘孜藏族自治州",
  "value": "5133" },

{
  "label": "凉山彝族自治州",
  "value": "5134" }],


[{
  "label": "贵阳市",
  "value": "5201" },

{
  "label": "六盘水市",
  "value": "5202" },

{
  "label": "遵义市",
  "value": "5203" },

{
  "label": "安顺市",
  "value": "5204" },

{
  "label": "毕节市",
  "value": "5205" },

{
  "label": "铜仁市",
  "value": "5206" },

{
  "label": "黔西南布依族苗族自治州",
  "value": "5223" },

{
  "label": "黔东南苗族侗族自治州",
  "value": "5226" },

{
  "label": "黔南布依族苗族自治州",
  "value": "5227" }],


[{
  "label": "昆明市",
  "value": "5301" },

{
  "label": "曲靖市",
  "value": "5303" },

{
  "label": "玉溪市",
  "value": "5304" },

{
  "label": "保山市",
  "value": "5305" },

{
  "label": "昭通市",
  "value": "5306" },

{
  "label": "丽江市",
  "value": "5307" },

{
  "label": "普洱市",
  "value": "5308" },

{
  "label": "临沧市",
  "value": "5309" },

{
  "label": "楚雄彝族自治州",
  "value": "5323" },

{
  "label": "红河哈尼族彝族自治州",
  "value": "5325" },

{
  "label": "文山壮族苗族自治州",
  "value": "5326" },

{
  "label": "西双版纳傣族自治州",
  "value": "5328" },

{
  "label": "大理白族自治州",
  "value": "5329" },

{
  "label": "德宏傣族景颇族自治州",
  "value": "5331" },

{
  "label": "怒江傈僳族自治州",
  "value": "5333" },

{
  "label": "迪庆藏族自治州",
  "value": "5334" }],


[{
  "label": "拉萨市",
  "value": "5401" },

{
  "label": "日喀则市",
  "value": "5402" },

{
  "label": "昌都市",
  "value": "5403" },

{
  "label": "林芝市",
  "value": "5404" },

{
  "label": "山南市",
  "value": "5405" },

{
  "label": "那曲地区",
  "value": "5424" },

{
  "label": "阿里地区",
  "value": "5425" }],


[{
  "label": "西安市",
  "value": "6101" },

{
  "label": "铜川市",
  "value": "6102" },

{
  "label": "宝鸡市",
  "value": "6103" },

{
  "label": "咸阳市",
  "value": "6104" },

{
  "label": "渭南市",
  "value": "6105" },

{
  "label": "延安市",
  "value": "6106" },

{
  "label": "汉中市",
  "value": "6107" },

{
  "label": "榆林市",
  "value": "6108" },

{
  "label": "安康市",
  "value": "6109" },

{
  "label": "商洛市",
  "value": "6110" }],


[{
  "label": "兰州市",
  "value": "6201" },

{
  "label": "嘉峪关市",
  "value": "6202" },

{
  "label": "金昌市",
  "value": "6203" },

{
  "label": "白银市",
  "value": "6204" },

{
  "label": "天水市",
  "value": "6205" },

{
  "label": "武威市",
  "value": "6206" },

{
  "label": "张掖市",
  "value": "6207" },

{
  "label": "平凉市",
  "value": "6208" },

{
  "label": "酒泉市",
  "value": "6209" },

{
  "label": "庆阳市",
  "value": "6210" },

{
  "label": "定西市",
  "value": "6211" },

{
  "label": "陇南市",
  "value": "6212" },

{
  "label": "临夏回族自治州",
  "value": "6229" },

{
  "label": "甘南藏族自治州",
  "value": "6230" }],


[{
  "label": "西宁市",
  "value": "6301" },

{
  "label": "海东市",
  "value": "6302" },

{
  "label": "海北藏族自治州",
  "value": "6322" },

{
  "label": "黄南藏族自治州",
  "value": "6323" },

{
  "label": "海南藏族自治州",
  "value": "6325" },

{
  "label": "果洛藏族自治州",
  "value": "6326" },

{
  "label": "玉树藏族自治州",
  "value": "6327" },

{
  "label": "海西蒙古族藏族自治州",
  "value": "6328" }],


[{
  "label": "银川市",
  "value": "6401" },

{
  "label": "石嘴山市",
  "value": "6402" },

{
  "label": "吴忠市",
  "value": "6403" },

{
  "label": "固原市",
  "value": "6404" },

{
  "label": "中卫市",
  "value": "6405" }],


[{
  "label": "乌鲁木齐市",
  "value": "6501" },

{
  "label": "克拉玛依市",
  "value": "6502" },

{
  "label": "吐鲁番市",
  "value": "6504" },

{
  "label": "哈密市",
  "value": "6505" },

{
  "label": "昌吉回族自治州",
  "value": "6523" },

{
  "label": "博尔塔拉蒙古自治州",
  "value": "6527" },

{
  "label": "巴音郭楞蒙古自治州",
  "value": "6528" },

{
  "label": "阿克苏地区",
  "value": "6529" },

{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530" },

{
  "label": "喀什地区",
  "value": "6531" },

{
  "label": "和田地区",
  "value": "6532" },

{
  "label": "伊犁哈萨克自治州",
  "value": "6540" },

{
  "label": "塔城地区",
  "value": "6542" },

{
  "label": "阿勒泰地区",
  "value": "6543" },

{
  "label": "自治区直辖县级行政区划",
  "value": "6590" }],


[{
  "label": "台北",
  "value": "6601" },

{
  "label": "高雄",
  "value": "6602" },

{
  "label": "基隆",
  "value": "6603" },

{
  "label": "台中",
  "value": "6604" },

{
  "label": "台南",
  "value": "6605" },

{
  "label": "新竹",
  "value": "6606" },

{
  "label": "嘉义",
  "value": "6607" },

{
  "label": "宜兰",
  "value": "6608" },

{
  "label": "桃园",
  "value": "6609" },

{
  "label": "苗栗",
  "value": "6610" },

{
  "label": "彰化",
  "value": "6611" },

{
  "label": "南投",
  "value": "6612" },

{
  "label": "云林",
  "value": "6613" },

{
  "label": "屏东",
  "value": "6614" },

{
  "label": "台东",
  "value": "6615" },

{
  "label": "花莲",
  "value": "6616" },

{
  "label": "澎湖",
  "value": "6617" }],


[{
  "label": "香港岛",
  "value": "6701" },

{
  "label": "九龙",
  "value": "6702" },

{
  "label": "新界",
  "value": "6703" }],


[{
  "label": "澳门半岛",
  "value": "6801" },

{
  "label": "氹仔岛",
  "value": "6802" },

{
  "label": "路环岛",
  "value": "6803" },

{
  "label": "路氹城",
  "value": "6804" }],


[{
  "label": "钓鱼岛",
  "value": "6901" }]];var _default =


cityData;exports.default = _default;

/***/ }),

/***/ 261:
/*!**********************************************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/components/common/simple-address/city-data/area.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "东城区",
  "value": "110101" },

{
  "label": "西城区",
  "value": "110102" },

{
  "label": "朝阳区",
  "value": "110105" },

{
  "label": "丰台区",
  "value": "110106" },

{
  "label": "石景山区",
  "value": "110107" },

{
  "label": "海淀区",
  "value": "110108" },

{
  "label": "门头沟区",
  "value": "110109" },

{
  "label": "房山区",
  "value": "110111" },

{
  "label": "通州区",
  "value": "110112" },

{
  "label": "顺义区",
  "value": "110113" },

{
  "label": "昌平区",
  "value": "110114" },

{
  "label": "大兴区",
  "value": "110115" },

{
  "label": "怀柔区",
  "value": "110116" },

{
  "label": "平谷区",
  "value": "110117" },

{
  "label": "密云区",
  "value": "110118" },

{
  "label": "延庆区",
  "value": "110119" }]],



[
[{
  "label": "和平区",
  "value": "120101" },

{
  "label": "河东区",
  "value": "120102" },

{
  "label": "河西区",
  "value": "120103" },

{
  "label": "南开区",
  "value": "120104" },

{
  "label": "河北区",
  "value": "120105" },

{
  "label": "红桥区",
  "value": "120106" },

{
  "label": "东丽区",
  "value": "120110" },

{
  "label": "西青区",
  "value": "120111" },

{
  "label": "津南区",
  "value": "120112" },

{
  "label": "北辰区",
  "value": "120113" },

{
  "label": "武清区",
  "value": "120114" },

{
  "label": "宝坻区",
  "value": "120115" },

{
  "label": "滨海新区",
  "value": "120116" },

{
  "label": "宁河区",
  "value": "120117" },

{
  "label": "静海区",
  "value": "120118" },

{
  "label": "蓟州区",
  "value": "120119" }]],



[
[{
  "label": "长安区",
  "value": "130102" },

{
  "label": "桥西区",
  "value": "130104" },

{
  "label": "新华区",
  "value": "130105" },

{
  "label": "井陉矿区",
  "value": "130107" },

{
  "label": "裕华区",
  "value": "130108" },

{
  "label": "藁城区",
  "value": "130109" },

{
  "label": "鹿泉区",
  "value": "130110" },

{
  "label": "栾城区",
  "value": "130111" },

{
  "label": "井陉县",
  "value": "130121" },

{
  "label": "正定县",
  "value": "130123" },

{
  "label": "行唐县",
  "value": "130125" },

{
  "label": "灵寿县",
  "value": "130126" },

{
  "label": "高邑县",
  "value": "130127" },

{
  "label": "深泽县",
  "value": "130128" },

{
  "label": "赞皇县",
  "value": "130129" },

{
  "label": "无极县",
  "value": "130130" },

{
  "label": "平山县",
  "value": "130131" },

{
  "label": "元氏县",
  "value": "130132" },

{
  "label": "赵县",
  "value": "130133" },

{
  "label": "石家庄高新技术产业开发区",
  "value": "130171" },

{
  "label": "石家庄循环化工园区",
  "value": "130172" },

{
  "label": "辛集市",
  "value": "130181" },

{
  "label": "晋州市",
  "value": "130183" },

{
  "label": "新乐市",
  "value": "130184" }],


[{
  "label": "路南区",
  "value": "130202" },

{
  "label": "路北区",
  "value": "130203" },

{
  "label": "古冶区",
  "value": "130204" },

{
  "label": "开平区",
  "value": "130205" },

{
  "label": "丰南区",
  "value": "130207" },

{
  "label": "丰润区",
  "value": "130208" },

{
  "label": "曹妃甸区",
  "value": "130209" },

{
  "label": "滦县",
  "value": "130223" },

{
  "label": "滦南县",
  "value": "130224" },

{
  "label": "乐亭县",
  "value": "130225" },

{
  "label": "迁西县",
  "value": "130227" },

{
  "label": "玉田县",
  "value": "130229" },

{
  "label": "唐山市芦台经济技术开发区",
  "value": "130271" },

{
  "label": "唐山市汉沽管理区",
  "value": "130272" },

{
  "label": "唐山高新技术产业开发区",
  "value": "130273" },

{
  "label": "河北唐山海港经济开发区",
  "value": "130274" },

{
  "label": "遵化市",
  "value": "130281" },

{
  "label": "迁安市",
  "value": "130283" }],


[{
  "label": "海港区",
  "value": "130302" },

{
  "label": "山海关区",
  "value": "130303" },

{
  "label": "北戴河区",
  "value": "130304" },

{
  "label": "抚宁区",
  "value": "130306" },

{
  "label": "青龙满族自治县",
  "value": "130321" },

{
  "label": "昌黎县",
  "value": "130322" },

{
  "label": "卢龙县",
  "value": "130324" },

{
  "label": "秦皇岛市经济技术开发区",
  "value": "130371" },

{
  "label": "北戴河新区",
  "value": "130372" }],


[{
  "label": "邯山区",
  "value": "130402" },

{
  "label": "丛台区",
  "value": "130403" },

{
  "label": "复兴区",
  "value": "130404" },

{
  "label": "峰峰矿区",
  "value": "130406" },

{
  "label": "肥乡区",
  "value": "130407" },

{
  "label": "永年区",
  "value": "130408" },

{
  "label": "临漳县",
  "value": "130423" },

{
  "label": "成安县",
  "value": "130424" },

{
  "label": "大名县",
  "value": "130425" },

{
  "label": "涉县",
  "value": "130426" },

{
  "label": "磁县",
  "value": "130427" },

{
  "label": "邱县",
  "value": "130430" },

{
  "label": "鸡泽县",
  "value": "130431" },

{
  "label": "广平县",
  "value": "130432" },

{
  "label": "馆陶县",
  "value": "130433" },

{
  "label": "魏县",
  "value": "130434" },

{
  "label": "曲周县",
  "value": "130435" },

{
  "label": "邯郸经济技术开发区",
  "value": "130471" },

{
  "label": "邯郸冀南新区",
  "value": "130473" },

{
  "label": "武安市",
  "value": "130481" }],


[{
  "label": "桥东区",
  "value": "130502" },

{
  "label": "桥西区",
  "value": "130503" },

{
  "label": "邢台县",
  "value": "130521" },

{
  "label": "临城县",
  "value": "130522" },

{
  "label": "内丘县",
  "value": "130523" },

{
  "label": "柏乡县",
  "value": "130524" },

{
  "label": "隆尧县",
  "value": "130525" },

{
  "label": "任县",
  "value": "130526" },

{
  "label": "南和县",
  "value": "130527" },

{
  "label": "宁晋县",
  "value": "130528" },

{
  "label": "巨鹿县",
  "value": "130529" },

{
  "label": "新河县",
  "value": "130530" },

{
  "label": "广宗县",
  "value": "130531" },

{
  "label": "平乡县",
  "value": "130532" },

{
  "label": "威县",
  "value": "130533" },

{
  "label": "清河县",
  "value": "130534" },

{
  "label": "临西县",
  "value": "130535" },

{
  "label": "河北邢台经济开发区",
  "value": "130571" },

{
  "label": "南宫市",
  "value": "130581" },

{
  "label": "沙河市",
  "value": "130582" }],


[{
  "label": "竞秀区",
  "value": "130602" },

{
  "label": "莲池区",
  "value": "130606" },

{
  "label": "满城区",
  "value": "130607" },

{
  "label": "清苑区",
  "value": "130608" },

{
  "label": "徐水区",
  "value": "130609" },

{
  "label": "涞水县",
  "value": "130623" },

{
  "label": "阜平县",
  "value": "130624" },

{
  "label": "定兴县",
  "value": "130626" },

{
  "label": "唐县",
  "value": "130627" },

{
  "label": "高阳县",
  "value": "130628" },

{
  "label": "容城县",
  "value": "130629" },

{
  "label": "涞源县",
  "value": "130630" },

{
  "label": "望都县",
  "value": "130631" },

{
  "label": "安新县",
  "value": "130632" },

{
  "label": "易县",
  "value": "130633" },

{
  "label": "曲阳县",
  "value": "130634" },

{
  "label": "蠡县",
  "value": "130635" },

{
  "label": "顺平县",
  "value": "130636" },

{
  "label": "博野县",
  "value": "130637" },

{
  "label": "雄县",
  "value": "130638" },

{
  "label": "保定高新技术产业开发区",
  "value": "130671" },

{
  "label": "保定白沟新城",
  "value": "130672" },

{
  "label": "涿州市",
  "value": "130681" },

{
  "label": "定州市",
  "value": "130682" },

{
  "label": "安国市",
  "value": "130683" },

{
  "label": "高碑店市",
  "value": "130684" }],


[{
  "label": "桥东区",
  "value": "130702" },

{
  "label": "桥西区",
  "value": "130703" },

{
  "label": "宣化区",
  "value": "130705" },

{
  "label": "下花园区",
  "value": "130706" },

{
  "label": "万全区",
  "value": "130708" },

{
  "label": "崇礼区",
  "value": "130709" },

{
  "label": "张北县",
  "value": "130722" },

{
  "label": "康保县",
  "value": "130723" },

{
  "label": "沽源县",
  "value": "130724" },

{
  "label": "尚义县",
  "value": "130725" },

{
  "label": "蔚县",
  "value": "130726" },

{
  "label": "阳原县",
  "value": "130727" },

{
  "label": "怀安县",
  "value": "130728" },

{
  "label": "怀来县",
  "value": "130730" },

{
  "label": "涿鹿县",
  "value": "130731" },

{
  "label": "赤城县",
  "value": "130732" },

{
  "label": "张家口市高新技术产业开发区",
  "value": "130771" },

{
  "label": "张家口市察北管理区",
  "value": "130772" },

{
  "label": "张家口市塞北管理区",
  "value": "130773" }],


[{
  "label": "双桥区",
  "value": "130802" },

{
  "label": "双滦区",
  "value": "130803" },

{
  "label": "鹰手营子矿区",
  "value": "130804" },

{
  "label": "承德县",
  "value": "130821" },

{
  "label": "兴隆县",
  "value": "130822" },

{
  "label": "滦平县",
  "value": "130824" },

{
  "label": "隆化县",
  "value": "130825" },

{
  "label": "丰宁满族自治县",
  "value": "130826" },

{
  "label": "宽城满族自治县",
  "value": "130827" },

{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },

{
  "label": "承德高新技术产业开发区",
  "value": "130871" },

{
  "label": "平泉市",
  "value": "130881" }],


[{
  "label": "新华区",
  "value": "130902" },

{
  "label": "运河区",
  "value": "130903" },

{
  "label": "沧县",
  "value": "130921" },

{
  "label": "青县",
  "value": "130922" },

{
  "label": "东光县",
  "value": "130923" },

{
  "label": "海兴县",
  "value": "130924" },

{
  "label": "盐山县",
  "value": "130925" },

{
  "label": "肃宁县",
  "value": "130926" },

{
  "label": "南皮县",
  "value": "130927" },

{
  "label": "吴桥县",
  "value": "130928" },

{
  "label": "献县",
  "value": "130929" },

{
  "label": "孟村回族自治县",
  "value": "130930" },

{
  "label": "河北沧州经济开发区",
  "value": "130971" },

{
  "label": "沧州高新技术产业开发区",
  "value": "130972" },

{
  "label": "沧州渤海新区",
  "value": "130973" },

{
  "label": "泊头市",
  "value": "130981" },

{
  "label": "任丘市",
  "value": "130982" },

{
  "label": "黄骅市",
  "value": "130983" },

{
  "label": "河间市",
  "value": "130984" }],


[{
  "label": "安次区",
  "value": "131002" },

{
  "label": "广阳区",
  "value": "131003" },

{
  "label": "固安县",
  "value": "131022" },

{
  "label": "永清县",
  "value": "131023" },

{
  "label": "香河县",
  "value": "131024" },

{
  "label": "大城县",
  "value": "131025" },

{
  "label": "文安县",
  "value": "131026" },

{
  "label": "大厂回族自治县",
  "value": "131028" },

{
  "label": "廊坊经济技术开发区",
  "value": "131071" },

{
  "label": "霸州市",
  "value": "131081" },

{
  "label": "三河市",
  "value": "131082" }],


[{
  "label": "桃城区",
  "value": "131102" },

{
  "label": "冀州区",
  "value": "131103" },

{
  "label": "枣强县",
  "value": "131121" },

{
  "label": "武邑县",
  "value": "131122" },

{
  "label": "武强县",
  "value": "131123" },

{
  "label": "饶阳县",
  "value": "131124" },

{
  "label": "安平县",
  "value": "131125" },

{
  "label": "故城县",
  "value": "131126" },

{
  "label": "景县",
  "value": "131127" },

{
  "label": "阜城县",
  "value": "131128" },

{
  "label": "河北衡水经济开发区",
  "value": "131171" },

{
  "label": "衡水滨湖新区",
  "value": "131172" },

{
  "label": "深州市",
  "value": "131182" }]],



[
[{
  "label": "小店区",
  "value": "140105" },

{
  "label": "迎泽区",
  "value": "140106" },

{
  "label": "杏花岭区",
  "value": "140107" },

{
  "label": "尖草坪区",
  "value": "140108" },

{
  "label": "万柏林区",
  "value": "140109" },

{
  "label": "晋源区",
  "value": "140110" },

{
  "label": "清徐县",
  "value": "140121" },

{
  "label": "阳曲县",
  "value": "140122" },

{
  "label": "娄烦县",
  "value": "140123" },

{
  "label": "山西转型综合改革示范区",
  "value": "140171" },

{
  "label": "古交市",
  "value": "140181" }],


[{
  "label": "城区",
  "value": "140202" },

{
  "label": "矿区",
  "value": "140203" },

{
  "label": "南郊区",
  "value": "140211" },

{
  "label": "新荣区",
  "value": "140212" },

{
  "label": "阳高县",
  "value": "140221" },

{
  "label": "天镇县",
  "value": "140222" },

{
  "label": "广灵县",
  "value": "140223" },

{
  "label": "灵丘县",
  "value": "140224" },

{
  "label": "浑源县",
  "value": "140225" },

{
  "label": "左云县",
  "value": "140226" },

{
  "label": "大同县",
  "value": "140227" },

{
  "label": "山西大同经济开发区",
  "value": "140271" }],


[{
  "label": "城区",
  "value": "140302" },

{
  "label": "矿区",
  "value": "140303" },

{
  "label": "郊区",
  "value": "140311" },

{
  "label": "平定县",
  "value": "140321" },

{
  "label": "盂县",
  "value": "140322" },

{
  "label": "山西阳泉经济开发区",
  "value": "140371" }],


[{
  "label": "城区",
  "value": "140402" },

{
  "label": "郊区",
  "value": "140411" },

{
  "label": "长治县",
  "value": "140421" },

{
  "label": "襄垣县",
  "value": "140423" },

{
  "label": "屯留县",
  "value": "140424" },

{
  "label": "平顺县",
  "value": "140425" },

{
  "label": "黎城县",
  "value": "140426" },

{
  "label": "壶关县",
  "value": "140427" },

{
  "label": "长子县",
  "value": "140428" },

{
  "label": "武乡县",
  "value": "140429" },

{
  "label": "沁县",
  "value": "140430" },

{
  "label": "沁源县",
  "value": "140431" },

{
  "label": "山西长治高新技术产业园区",
  "value": "140471" },

{
  "label": "潞城市",
  "value": "140481" }],


[{
  "label": "城区",
  "value": "140502" },

{
  "label": "沁水县",
  "value": "140521" },

{
  "label": "阳城县",
  "value": "140522" },

{
  "label": "陵川县",
  "value": "140524" },

{
  "label": "泽州县",
  "value": "140525" },

{
  "label": "高平市",
  "value": "140581" }],


[{
  "label": "朔城区",
  "value": "140602" },

{
  "label": "平鲁区",
  "value": "140603" },

{
  "label": "山阴县",
  "value": "140621" },

{
  "label": "应县",
  "value": "140622" },

{
  "label": "右玉县",
  "value": "140623" },

{
  "label": "怀仁县",
  "value": "140624" },

{
  "label": "山西朔州经济开发区",
  "value": "140671" }],


[{
  "label": "榆次区",
  "value": "140702" },

{
  "label": "榆社县",
  "value": "140721" },

{
  "label": "左权县",
  "value": "140722" },

{
  "label": "和顺县",
  "value": "140723" },

{
  "label": "昔阳县",
  "value": "140724" },

{
  "label": "寿阳县",
  "value": "140725" },

{
  "label": "太谷县",
  "value": "140726" },

{
  "label": "祁县",
  "value": "140727" },

{
  "label": "平遥县",
  "value": "140728" },

{
  "label": "灵石县",
  "value": "140729" },

{
  "label": "介休市",
  "value": "140781" }],


[{
  "label": "盐湖区",
  "value": "140802" },

{
  "label": "临猗县",
  "value": "140821" },

{
  "label": "万荣县",
  "value": "140822" },

{
  "label": "闻喜县",
  "value": "140823" },

{
  "label": "稷山县",
  "value": "140824" },

{
  "label": "新绛县",
  "value": "140825" },

{
  "label": "绛县",
  "value": "140826" },

{
  "label": "垣曲县",
  "value": "140827" },

{
  "label": "夏县",
  "value": "140828" },

{
  "label": "平陆县",
  "value": "140829" },

{
  "label": "芮城县",
  "value": "140830" },

{
  "label": "永济市",
  "value": "140881" },

{
  "label": "河津市",
  "value": "140882" }],


[{
  "label": "忻府区",
  "value": "140902" },

{
  "label": "定襄县",
  "value": "140921" },

{
  "label": "五台县",
  "value": "140922" },

{
  "label": "代县",
  "value": "140923" },

{
  "label": "繁峙县",
  "value": "140924" },

{
  "label": "宁武县",
  "value": "140925" },

{
  "label": "静乐县",
  "value": "140926" },

{
  "label": "神池县",
  "value": "140927" },

{
  "label": "五寨县",
  "value": "140928" },

{
  "label": "岢岚县",
  "value": "140929" },

{
  "label": "河曲县",
  "value": "140930" },

{
  "label": "保德县",
  "value": "140931" },

{
  "label": "偏关县",
  "value": "140932" },

{
  "label": "五台山风景名胜区",
  "value": "140971" },

{
  "label": "原平市",
  "value": "140981" }],


[{
  "label": "尧都区",
  "value": "141002" },

{
  "label": "曲沃县",
  "value": "141021" },

{
  "label": "翼城县",
  "value": "141022" },

{
  "label": "襄汾县",
  "value": "141023" },

{
  "label": "洪洞县",
  "value": "141024" },

{
  "label": "古县",
  "value": "141025" },

{
  "label": "安泽县",
  "value": "141026" },

{
  "label": "浮山县",
  "value": "141027" },

{
  "label": "吉县",
  "value": "141028" },

{
  "label": "乡宁县",
  "value": "141029" },

{
  "label": "大宁县",
  "value": "141030" },

{
  "label": "隰县",
  "value": "141031" },

{
  "label": "永和县",
  "value": "141032" },

{
  "label": "蒲县",
  "value": "141033" },

{
  "label": "汾西县",
  "value": "141034" },

{
  "label": "侯马市",
  "value": "141081" },

{
  "label": "霍州市",
  "value": "141082" }],


[{
  "label": "离石区",
  "value": "141102" },

{
  "label": "文水县",
  "value": "141121" },

{
  "label": "交城县",
  "value": "141122" },

{
  "label": "兴县",
  "value": "141123" },

{
  "label": "临县",
  "value": "141124" },

{
  "label": "柳林县",
  "value": "141125" },

{
  "label": "石楼县",
  "value": "141126" },

{
  "label": "岚县",
  "value": "141127" },

{
  "label": "方山县",
  "value": "141128" },

{
  "label": "中阳县",
  "value": "141129" },

{
  "label": "交口县",
  "value": "141130" },

{
  "label": "孝义市",
  "value": "141181" },

{
  "label": "汾阳市",
  "value": "141182" }]],



[
[{
  "label": "新城区",
  "value": "150102" },

{
  "label": "回民区",
  "value": "150103" },

{
  "label": "玉泉区",
  "value": "150104" },

{
  "label": "赛罕区",
  "value": "150105" },

{
  "label": "土默特左旗",
  "value": "150121" },

{
  "label": "托克托县",
  "value": "150122" },

{
  "label": "和林格尔县",
  "value": "150123" },

{
  "label": "清水河县",
  "value": "150124" },

{
  "label": "武川县",
  "value": "150125" },

{
  "label": "呼和浩特金海工业园区",
  "value": "150171" },

{
  "label": "呼和浩特经济技术开发区",
  "value": "150172" }],


[{
  "label": "东河区",
  "value": "150202" },

{
  "label": "昆都仑区",
  "value": "150203" },

{
  "label": "青山区",
  "value": "150204" },

{
  "label": "石拐区",
  "value": "150205" },

{
  "label": "白云鄂博矿区",
  "value": "150206" },

{
  "label": "九原区",
  "value": "150207" },

{
  "label": "土默特右旗",
  "value": "150221" },

{
  "label": "固阳县",
  "value": "150222" },

{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },

{
  "label": "包头稀土高新技术产业开发区",
  "value": "150271" }],


[{
  "label": "海勃湾区",
  "value": "150302" },

{
  "label": "海南区",
  "value": "150303" },

{
  "label": "乌达区",
  "value": "150304" }],


[{
  "label": "红山区",
  "value": "150402" },

{
  "label": "元宝山区",
  "value": "150403" },

{
  "label": "松山区",
  "value": "150404" },

{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },

{
  "label": "巴林左旗",
  "value": "150422" },

{
  "label": "巴林右旗",
  "value": "150423" },

{
  "label": "林西县",
  "value": "150424" },

{
  "label": "克什克腾旗",
  "value": "150425" },

{
  "label": "翁牛特旗",
  "value": "150426" },

{
  "label": "喀喇沁旗",
  "value": "150428" },

{
  "label": "宁城县",
  "value": "150429" },

{
  "label": "敖汉旗",
  "value": "150430" }],


[{
  "label": "科尔沁区",
  "value": "150502" },

{
  "label": "科尔沁左翼中旗",
  "value": "150521" },

{
  "label": "科尔沁左翼后旗",
  "value": "150522" },

{
  "label": "开鲁县",
  "value": "150523" },

{
  "label": "库伦旗",
  "value": "150524" },

{
  "label": "奈曼旗",
  "value": "150525" },

{
  "label": "扎鲁特旗",
  "value": "150526" },

{
  "label": "通辽经济技术开发区",
  "value": "150571" },

{
  "label": "霍林郭勒市",
  "value": "150581" }],


[{
  "label": "东胜区",
  "value": "150602" },

{
  "label": "康巴什区",
  "value": "150603" },

{
  "label": "达拉特旗",
  "value": "150621" },

{
  "label": "准格尔旗",
  "value": "150622" },

{
  "label": "鄂托克前旗",
  "value": "150623" },

{
  "label": "鄂托克旗",
  "value": "150624" },

{
  "label": "杭锦旗",
  "value": "150625" },

{
  "label": "乌审旗",
  "value": "150626" },

{
  "label": "伊金霍洛旗",
  "value": "150627" }],


[{
  "label": "海拉尔区",
  "value": "150702" },

{
  "label": "扎赉诺尔区",
  "value": "150703" },

{
  "label": "阿荣旗",
  "value": "150721" },

{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },

{
  "label": "鄂伦春自治旗",
  "value": "150723" },

{
  "label": "鄂温克族自治旗",
  "value": "150724" },

{
  "label": "陈巴尔虎旗",
  "value": "150725" },

{
  "label": "新巴尔虎左旗",
  "value": "150726" },

{
  "label": "新巴尔虎右旗",
  "value": "150727" },

{
  "label": "满洲里市",
  "value": "150781" },

{
  "label": "牙克石市",
  "value": "150782" },

{
  "label": "扎兰屯市",
  "value": "150783" },

{
  "label": "额尔古纳市",
  "value": "150784" },

{
  "label": "根河市",
  "value": "150785" }],


[{
  "label": "临河区",
  "value": "150802" },

{
  "label": "五原县",
  "value": "150821" },

{
  "label": "磴口县",
  "value": "150822" },

{
  "label": "乌拉特前旗",
  "value": "150823" },

{
  "label": "乌拉特中旗",
  "value": "150824" },

{
  "label": "乌拉特后旗",
  "value": "150825" },

{
  "label": "杭锦后旗",
  "value": "150826" }],


[{
  "label": "集宁区",
  "value": "150902" },

{
  "label": "卓资县",
  "value": "150921" },

{
  "label": "化德县",
  "value": "150922" },

{
  "label": "商都县",
  "value": "150923" },

{
  "label": "兴和县",
  "value": "150924" },

{
  "label": "凉城县",
  "value": "150925" },

{
  "label": "察哈尔右翼前旗",
  "value": "150926" },

{
  "label": "察哈尔右翼中旗",
  "value": "150927" },

{
  "label": "察哈尔右翼后旗",
  "value": "150928" },

{
  "label": "四子王旗",
  "value": "150929" },

{
  "label": "丰镇市",
  "value": "150981" }],


[{
  "label": "乌兰浩特市",
  "value": "152201" },

{
  "label": "阿尔山市",
  "value": "152202" },

{
  "label": "科尔沁右翼前旗",
  "value": "152221" },

{
  "label": "科尔沁右翼中旗",
  "value": "152222" },

{
  "label": "扎赉特旗",
  "value": "152223" },

{
  "label": "突泉县",
  "value": "152224" }],


[{
  "label": "二连浩特市",
  "value": "152501" },

{
  "label": "锡林浩特市",
  "value": "152502" },

{
  "label": "阿巴嘎旗",
  "value": "152522" },

{
  "label": "苏尼特左旗",
  "value": "152523" },

{
  "label": "苏尼特右旗",
  "value": "152524" },

{
  "label": "东乌珠穆沁旗",
  "value": "152525" },

{
  "label": "西乌珠穆沁旗",
  "value": "152526" },

{
  "label": "太仆寺旗",
  "value": "152527" },

{
  "label": "镶黄旗",
  "value": "152528" },

{
  "label": "正镶白旗",
  "value": "152529" },

{
  "label": "正蓝旗",
  "value": "152530" },

{
  "label": "多伦县",
  "value": "152531" },

{
  "label": "乌拉盖管委会",
  "value": "152571" }],


[{
  "label": "阿拉善左旗",
  "value": "152921" },

{
  "label": "阿拉善右旗",
  "value": "152922" },

{
  "label": "额济纳旗",
  "value": "152923" },

{
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971" }]],



[
[{
  "label": "和平区",
  "value": "210102" },

{
  "label": "沈河区",
  "value": "210103" },

{
  "label": "大东区",
  "value": "210104" },

{
  "label": "皇姑区",
  "value": "210105" },

{
  "label": "铁西区",
  "value": "210106" },

{
  "label": "苏家屯区",
  "value": "210111" },

{
  "label": "浑南区",
  "value": "210112" },

{
  "label": "沈北新区",
  "value": "210113" },

{
  "label": "于洪区",
  "value": "210114" },

{
  "label": "辽中区",
  "value": "210115" },

{
  "label": "康平县",
  "value": "210123" },

{
  "label": "法库县",
  "value": "210124" },

{
  "label": "新民市",
  "value": "210181" }],


[{
  "label": "中山区",
  "value": "210202" },

{
  "label": "西岗区",
  "value": "210203" },

{
  "label": "沙河口区",
  "value": "210204" },

{
  "label": "甘井子区",
  "value": "210211" },

{
  "label": "旅顺口区",
  "value": "210212" },

{
  "label": "金州区",
  "value": "210213" },

{
  "label": "普兰店区",
  "value": "210214" },

{
  "label": "长海县",
  "value": "210224" },

{
  "label": "瓦房店市",
  "value": "210281" },

{
  "label": "庄河市",
  "value": "210283" }],


[{
  "label": "铁东区",
  "value": "210302" },

{
  "label": "铁西区",
  "value": "210303" },

{
  "label": "立山区",
  "value": "210304" },

{
  "label": "千山区",
  "value": "210311" },

{
  "label": "台安县",
  "value": "210321" },

{
  "label": "岫岩满族自治县",
  "value": "210323" },

{
  "label": "海城市",
  "value": "210381" }],


[{
  "label": "新抚区",
  "value": "210402" },

{
  "label": "东洲区",
  "value": "210403" },

{
  "label": "望花区",
  "value": "210404" },

{
  "label": "顺城区",
  "value": "210411" },

{
  "label": "抚顺县",
  "value": "210421" },

{
  "label": "新宾满族自治县",
  "value": "210422" },

{
  "label": "清原满族自治县",
  "value": "210423" }],


[{
  "label": "平山区",
  "value": "210502" },

{
  "label": "溪湖区",
  "value": "210503" },

{
  "label": "明山区",
  "value": "210504" },

{
  "label": "南芬区",
  "value": "210505" },

{
  "label": "本溪满族自治县",
  "value": "210521" },

{
  "label": "桓仁满族自治县",
  "value": "210522" }],


[{
  "label": "元宝区",
  "value": "210602" },

{
  "label": "振兴区",
  "value": "210603" },

{
  "label": "振安区",
  "value": "210604" },

{
  "label": "宽甸满族自治县",
  "value": "210624" },

{
  "label": "东港市",
  "value": "210681" },

{
  "label": "凤城市",
  "value": "210682" }],


[{
  "label": "古塔区",
  "value": "210702" },

{
  "label": "凌河区",
  "value": "210703" },

{
  "label": "太和区",
  "value": "210711" },

{
  "label": "黑山县",
  "value": "210726" },

{
  "label": "义县",
  "value": "210727" },

{
  "label": "凌海市",
  "value": "210781" },

{
  "label": "北镇市",
  "value": "210782" }],


[{
  "label": "站前区",
  "value": "210802" },

{
  "label": "西市区",
  "value": "210803" },

{
  "label": "鲅鱼圈区",
  "value": "210804" },

{
  "label": "老边区",
  "value": "210811" },

{
  "label": "盖州市",
  "value": "210881" },

{
  "label": "大石桥市",
  "value": "210882" }],


[{
  "label": "海州区",
  "value": "210902" },

{
  "label": "新邱区",
  "value": "210903" },

{
  "label": "太平区",
  "value": "210904" },

{
  "label": "清河门区",
  "value": "210905" },

{
  "label": "细河区",
  "value": "210911" },

{
  "label": "阜新蒙古族自治县",
  "value": "210921" },

{
  "label": "彰武县",
  "value": "210922" }],


[{
  "label": "白塔区",
  "value": "211002" },

{
  "label": "文圣区",
  "value": "211003" },

{
  "label": "宏伟区",
  "value": "211004" },

{
  "label": "弓长岭区",
  "value": "211005" },

{
  "label": "太子河区",
  "value": "211011" },

{
  "label": "辽阳县",
  "value": "211021" },

{
  "label": "灯塔市",
  "value": "211081" }],


[{
  "label": "双台子区",
  "value": "211102" },

{
  "label": "兴隆台区",
  "value": "211103" },

{
  "label": "大洼区",
  "value": "211104" },

{
  "label": "盘山县",
  "value": "211122" }],


[{
  "label": "银州区",
  "value": "211202" },

{
  "label": "清河区",
  "value": "211204" },

{
  "label": "铁岭县",
  "value": "211221" },

{
  "label": "西丰县",
  "value": "211223" },

{
  "label": "昌图县",
  "value": "211224" },

{
  "label": "调兵山市",
  "value": "211281" },

{
  "label": "开原市",
  "value": "211282" }],


[{
  "label": "双塔区",
  "value": "211302" },

{
  "label": "龙城区",
  "value": "211303" },

{
  "label": "朝阳县",
  "value": "211321" },

{
  "label": "建平县",
  "value": "211322" },

{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" },

{
  "label": "北票市",
  "value": "211381" },

{
  "label": "凌源市",
  "value": "211382" }],


[{
  "label": "连山区",
  "value": "211402" },

{
  "label": "龙港区",
  "value": "211403" },

{
  "label": "南票区",
  "value": "211404" },

{
  "label": "绥中县",
  "value": "211421" },

{
  "label": "建昌县",
  "value": "211422" },

{
  "label": "兴城市",
  "value": "211481" }]],



[
[{
  "label": "南关区",
  "value": "220102" },

{
  "label": "宽城区",
  "value": "220103" },

{
  "label": "朝阳区",
  "value": "220104" },

{
  "label": "二道区",
  "value": "220105" },

{
  "label": "绿园区",
  "value": "220106" },

{
  "label": "双阳区",
  "value": "220112" },

{
  "label": "九台区",
  "value": "220113" },

{
  "label": "农安县",
  "value": "220122" },

{
  "label": "长春经济技术开发区",
  "value": "220171" },

{
  "label": "长春净月高新技术产业开发区",
  "value": "220172" },

{
  "label": "长春高新技术产业开发区",
  "value": "220173" },

{
  "label": "长春汽车经济技术开发区",
  "value": "220174" },

{
  "label": "榆树市",
  "value": "220182" },

{
  "label": "德惠市",
  "value": "220183" }],


[{
  "label": "昌邑区",
  "value": "220202" },

{
  "label": "龙潭区",
  "value": "220203" },

{
  "label": "船营区",
  "value": "220204" },

{
  "label": "丰满区",
  "value": "220211" },

{
  "label": "永吉县",
  "value": "220221" },

{
  "label": "吉林经济开发区",
  "value": "220271" },

{
  "label": "吉林高新技术产业开发区",
  "value": "220272" },

{
  "label": "吉林中国新加坡食品区",
  "value": "220273" },

{
  "label": "蛟河市",
  "value": "220281" },

{
  "label": "桦甸市",
  "value": "220282" },

{
  "label": "舒兰市",
  "value": "220283" },

{
  "label": "磐石市",
  "value": "220284" }],


[{
  "label": "铁西区",
  "value": "220302" },

{
  "label": "铁东区",
  "value": "220303" },

{
  "label": "梨树县",
  "value": "220322" },

{
  "label": "伊通满族自治县",
  "value": "220323" },

{
  "label": "公主岭市",
  "value": "220381" },

{
  "label": "双辽市",
  "value": "220382" }],


[{
  "label": "龙山区",
  "value": "220402" },

{
  "label": "西安区",
  "value": "220403" },

{
  "label": "东丰县",
  "value": "220421" },

{
  "label": "东辽县",
  "value": "220422" }],


[{
  "label": "东昌区",
  "value": "220502" },

{
  "label": "二道江区",
  "value": "220503" },

{
  "label": "通化县",
  "value": "220521" },

{
  "label": "辉南县",
  "value": "220523" },

{
  "label": "柳河县",
  "value": "220524" },

{
  "label": "梅河口市",
  "value": "220581" },

{
  "label": "集安市",
  "value": "220582" }],


[{
  "label": "浑江区",
  "value": "220602" },

{
  "label": "江源区",
  "value": "220605" },

{
  "label": "抚松县",
  "value": "220621" },

{
  "label": "靖宇县",
  "value": "220622" },

{
  "label": "长白朝鲜族自治县",
  "value": "220623" },

{
  "label": "临江市",
  "value": "220681" }],


[{
  "label": "宁江区",
  "value": "220702" },

{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },

{
  "label": "长岭县",
  "value": "220722" },

{
  "label": "乾安县",
  "value": "220723" },

{
  "label": "吉林松原经济开发区",
  "value": "220771" },

{
  "label": "扶余市",
  "value": "220781" }],


[{
  "label": "洮北区",
  "value": "220802" },

{
  "label": "镇赉县",
  "value": "220821" },

{
  "label": "通榆县",
  "value": "220822" },

{
  "label": "吉林白城经济开发区",
  "value": "220871" },

{
  "label": "洮南市",
  "value": "220881" },

{
  "label": "大安市",
  "value": "220882" }],


[{
  "label": "延吉市",
  "value": "222401" },

{
  "label": "图们市",
  "value": "222402" },

{
  "label": "敦化市",
  "value": "222403" },

{
  "label": "珲春市",
  "value": "222404" },

{
  "label": "龙井市",
  "value": "222405" },

{
  "label": "和龙市",
  "value": "222406" },

{
  "label": "汪清县",
  "value": "222424" },

{
  "label": "安图县",
  "value": "222426" }]],



[
[{
  "label": "道里区",
  "value": "230102" },

{
  "label": "南岗区",
  "value": "230103" },

{
  "label": "道外区",
  "value": "230104" },

{
  "label": "平房区",
  "value": "230108" },

{
  "label": "松北区",
  "value": "230109" },

{
  "label": "香坊区",
  "value": "230110" },

{
  "label": "呼兰区",
  "value": "230111" },

{
  "label": "阿城区",
  "value": "230112" },

{
  "label": "双城区",
  "value": "230113" },

{
  "label": "依兰县",
  "value": "230123" },

{
  "label": "方正县",
  "value": "230124" },

{
  "label": "宾县",
  "value": "230125" },

{
  "label": "巴彦县",
  "value": "230126" },

{
  "label": "木兰县",
  "value": "230127" },

{
  "label": "通河县",
  "value": "230128" },

{
  "label": "延寿县",
  "value": "230129" },

{
  "label": "尚志市",
  "value": "230183" },

{
  "label": "五常市",
  "value": "230184" }],


[{
  "label": "龙沙区",
  "value": "230202" },

{
  "label": "建华区",
  "value": "230203" },

{
  "label": "铁锋区",
  "value": "230204" },

{
  "label": "昂昂溪区",
  "value": "230205" },

{
  "label": "富拉尔基区",
  "value": "230206" },

{
  "label": "碾子山区",
  "value": "230207" },

{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },

{
  "label": "龙江县",
  "value": "230221" },

{
  "label": "依安县",
  "value": "230223" },

{
  "label": "泰来县",
  "value": "230224" },

{
  "label": "甘南县",
  "value": "230225" },

{
  "label": "富裕县",
  "value": "230227" },

{
  "label": "克山县",
  "value": "230229" },

{
  "label": "克东县",
  "value": "230230" },

{
  "label": "拜泉县",
  "value": "230231" },

{
  "label": "讷河市",
  "value": "230281" }],


[{
  "label": "鸡冠区",
  "value": "230302" },

{
  "label": "恒山区",
  "value": "230303" },

{
  "label": "滴道区",
  "value": "230304" },

{
  "label": "梨树区",
  "value": "230305" },

{
  "label": "城子河区",
  "value": "230306" },

{
  "label": "麻山区",
  "value": "230307" },

{
  "label": "鸡东县",
  "value": "230321" },

{
  "label": "虎林市",
  "value": "230381" },

{
  "label": "密山市",
  "value": "230382" }],


[{
  "label": "向阳区",
  "value": "230402" },

{
  "label": "工农区",
  "value": "230403" },

{
  "label": "南山区",
  "value": "230404" },

{
  "label": "兴安区",
  "value": "230405" },

{
  "label": "东山区",
  "value": "230406" },

{
  "label": "兴山区",
  "value": "230407" },

{
  "label": "萝北县",
  "value": "230421" },

{
  "label": "绥滨县",
  "value": "230422" }],


[{
  "label": "尖山区",
  "value": "230502" },

{
  "label": "岭东区",
  "value": "230503" },

{
  "label": "四方台区",
  "value": "230505" },

{
  "label": "宝山区",
  "value": "230506" },

{
  "label": "集贤县",
  "value": "230521" },

{
  "label": "友谊县",
  "value": "230522" },

{
  "label": "宝清县",
  "value": "230523" },

{
  "label": "饶河县",
  "value": "230524" }],


[{
  "label": "萨尔图区",
  "value": "230602" },

{
  "label": "龙凤区",
  "value": "230603" },

{
  "label": "让胡路区",
  "value": "230604" },

{
  "label": "红岗区",
  "value": "230605" },

{
  "label": "大同区",
  "value": "230606" },

{
  "label": "肇州县",
  "value": "230621" },

{
  "label": "肇源县",
  "value": "230622" },

{
  "label": "林甸县",
  "value": "230623" },

{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },

{
  "label": "大庆高新技术产业开发区",
  "value": "230671" }],


[{
  "label": "伊春区",
  "value": "230702" },

{
  "label": "南岔区",
  "value": "230703" },

{
  "label": "友好区",
  "value": "230704" },

{
  "label": "西林区",
  "value": "230705" },

{
  "label": "翠峦区",
  "value": "230706" },

{
  "label": "新青区",
  "value": "230707" },

{
  "label": "美溪区",
  "value": "230708" },

{
  "label": "金山屯区",
  "value": "230709" },

{
  "label": "五营区",
  "value": "230710" },

{
  "label": "乌马河区",
  "value": "230711" },

{
  "label": "汤旺河区",
  "value": "230712" },

{
  "label": "带岭区",
  "value": "230713" },

{
  "label": "乌伊岭区",
  "value": "230714" },

{
  "label": "红星区",
  "value": "230715" },

{
  "label": "上甘岭区",
  "value": "230716" },

{
  "label": "嘉荫县",
  "value": "230722" },

{
  "label": "铁力市",
  "value": "230781" }],


[{
  "label": "向阳区",
  "value": "230803" },

{
  "label": "前进区",
  "value": "230804" },

{
  "label": "东风区",
  "value": "230805" },

{
  "label": "郊区",
  "value": "230811" },

{
  "label": "桦南县",
  "value": "230822" },

{
  "label": "桦川县",
  "value": "230826" },

{
  "label": "汤原县",
  "value": "230828" },

{
  "label": "同江市",
  "value": "230881" },

{
  "label": "富锦市",
  "value": "230882" },

{
  "label": "抚远市",
  "value": "230883" }],


[{
  "label": "新兴区",
  "value": "230902" },

{
  "label": "桃山区",
  "value": "230903" },

{
  "label": "茄子河区",
  "value": "230904" },

{
  "label": "勃利县",
  "value": "230921" }],


[{
  "label": "东安区",
  "value": "231002" },

{
  "label": "阳明区",
  "value": "231003" },

{
  "label": "爱民区",
  "value": "231004" },

{
  "label": "西安区",
  "value": "231005" },

{
  "label": "林口县",
  "value": "231025" },

{
  "label": "牡丹江经济技术开发区",
  "value": "231071" },

{
  "label": "绥芬河市",
  "value": "231081" },

{
  "label": "海林市",
  "value": "231083" },

{
  "label": "宁安市",
  "value": "231084" },

{
  "label": "穆棱市",
  "value": "231085" },

{
  "label": "东宁市",
  "value": "231086" }],


[{
  "label": "爱辉区",
  "value": "231102" },

{
  "label": "嫩江县",
  "value": "231121" },

{
  "label": "逊克县",
  "value": "231123" },

{
  "label": "孙吴县",
  "value": "231124" },

{
  "label": "北安市",
  "value": "231181" },

{
  "label": "五大连池市",
  "value": "231182" }],


[{
  "label": "北林区",
  "value": "231202" },

{
  "label": "望奎县",
  "value": "231221" },

{
  "label": "兰西县",
  "value": "231222" },

{
  "label": "青冈县",
  "value": "231223" },

{
  "label": "庆安县",
  "value": "231224" },

{
  "label": "明水县",
  "value": "231225" },

{
  "label": "绥棱县",
  "value": "231226" },

{
  "label": "安达市",
  "value": "231281" },

{
  "label": "肇东市",
  "value": "231282" },

{
  "label": "海伦市",
  "value": "231283" }],


[{
  "label": "加格达奇区",
  "value": "232701" },

{
  "label": "松岭区",
  "value": "232702" },

{
  "label": "新林区",
  "value": "232703" },

{
  "label": "呼中区",
  "value": "232704" },

{
  "label": "呼玛县",
  "value": "232721" },

{
  "label": "塔河县",
  "value": "232722" },

{
  "label": "漠河县",
  "value": "232723" }]],



[
[{
  "label": "黄浦区",
  "value": "310101" },

{
  "label": "徐汇区",
  "value": "310104" },

{
  "label": "长宁区",
  "value": "310105" },

{
  "label": "静安区",
  "value": "310106" },

{
  "label": "普陀区",
  "value": "310107" },

{
  "label": "虹口区",
  "value": "310109" },

{
  "label": "杨浦区",
  "value": "310110" },

{
  "label": "闵行区",
  "value": "310112" },

{
  "label": "宝山区",
  "value": "310113" },

{
  "label": "嘉定区",
  "value": "310114" },

{
  "label": "浦东新区",
  "value": "310115" },

{
  "label": "金山区",
  "value": "310116" },

{
  "label": "松江区",
  "value": "310117" },

{
  "label": "青浦区",
  "value": "310118" },

{
  "label": "奉贤区",
  "value": "310120" },

{
  "label": "崇明区",
  "value": "310151" }]],



[
[{
  "label": "玄武区",
  "value": "320102" },

{
  "label": "秦淮区",
  "value": "320104" },

{
  "label": "建邺区",
  "value": "320105" },

{
  "label": "鼓楼区",
  "value": "320106" },

{
  "label": "浦口区",
  "value": "320111" },

{
  "label": "栖霞区",
  "value": "320113" },

{
  "label": "雨花台区",
  "value": "320114" },

{
  "label": "江宁区",
  "value": "320115" },

{
  "label": "六合区",
  "value": "320116" },

{
  "label": "溧水区",
  "value": "320117" },

{
  "label": "高淳区",
  "value": "320118" }],


[{
  "label": "锡山区",
  "value": "320205" },

{
  "label": "惠山区",
  "value": "320206" },

{
  "label": "滨湖区",
  "value": "320211" },

{
  "label": "梁溪区",
  "value": "320213" },

{
  "label": "新吴区",
  "value": "320214" },

{
  "label": "江阴市",
  "value": "320281" },

{
  "label": "宜兴市",
  "value": "320282" }],


[{
  "label": "鼓楼区",
  "value": "320302" },

{
  "label": "云龙区",
  "value": "320303" },

{
  "label": "贾汪区",
  "value": "320305" },

{
  "label": "泉山区",
  "value": "320311" },

{
  "label": "铜山区",
  "value": "320312" },

{
  "label": "丰县",
  "value": "320321" },

{
  "label": "沛县",
  "value": "320322" },

{
  "label": "睢宁县",
  "value": "320324" },

{
  "label": "徐州经济技术开发区",
  "value": "320371" },

{
  "label": "新沂市",
  "value": "320381" },

{
  "label": "邳州市",
  "value": "320382" }],


[{
  "label": "天宁区",
  "value": "320402" },

{
  "label": "钟楼区",
  "value": "320404" },

{
  "label": "新北区",
  "value": "320411" },

{
  "label": "武进区",
  "value": "320412" },

{
  "label": "金坛区",
  "value": "320413" },

{
  "label": "溧阳市",
  "value": "320481" }],


[{
  "label": "虎丘区",
  "value": "320505" },

{
  "label": "吴中区",
  "value": "320506" },

{
  "label": "相城区",
  "value": "320507" },

{
  "label": "姑苏区",
  "value": "320508" },

{
  "label": "吴江区",
  "value": "320509" },

{
  "label": "苏州工业园区",
  "value": "320571" },

{
  "label": "常熟市",
  "value": "320581" },

{
  "label": "张家港市",
  "value": "320582" },

{
  "label": "昆山市",
  "value": "320583" },

{
  "label": "太仓市",
  "value": "320585" }],


[{
  "label": "崇川区",
  "value": "320602" },

{
  "label": "港闸区",
  "value": "320611" },

{
  "label": "通州区",
  "value": "320612" },

{
  "label": "海安县",
  "value": "320621" },

{
  "label": "如东县",
  "value": "320623" },

{
  "label": "南通经济技术开发区",
  "value": "320671" },

{
  "label": "启东市",
  "value": "320681" },

{
  "label": "如皋市",
  "value": "320682" },

{
  "label": "海门市",
  "value": "320684" }],


[{
  "label": "连云区",
  "value": "320703" },

{
  "label": "海州区",
  "value": "320706" },

{
  "label": "赣榆区",
  "value": "320707" },

{
  "label": "东海县",
  "value": "320722" },

{
  "label": "灌云县",
  "value": "320723" },

{
  "label": "灌南县",
  "value": "320724" },

{
  "label": "连云港经济技术开发区",
  "value": "320771" },

{
  "label": "连云港高新技术产业开发区",
  "value": "320772" }],


[{
  "label": "淮安区",
  "value": "320803" },

{
  "label": "淮阴区",
  "value": "320804" },

{
  "label": "清江浦区",
  "value": "320812" },

{
  "label": "洪泽区",
  "value": "320813" },

{
  "label": "涟水县",
  "value": "320826" },

{
  "label": "盱眙县",
  "value": "320830" },

{
  "label": "金湖县",
  "value": "320831" },

{
  "label": "淮安经济技术开发区",
  "value": "320871" }],


[{
  "label": "亭湖区",
  "value": "320902" },

{
  "label": "盐都区",
  "value": "320903" },

{
  "label": "大丰区",
  "value": "320904" },

{
  "label": "响水县",
  "value": "320921" },

{
  "label": "滨海县",
  "value": "320922" },

{
  "label": "阜宁县",
  "value": "320923" },

{
  "label": "射阳县",
  "value": "320924" },

{
  "label": "建湖县",
  "value": "320925" },

{
  "label": "盐城经济技术开发区",
  "value": "320971" },

{
  "label": "东台市",
  "value": "320981" }],


[{
  "label": "广陵区",
  "value": "321002" },

{
  "label": "邗江区",
  "value": "321003" },

{
  "label": "江都区",
  "value": "321012" },

{
  "label": "宝应县",
  "value": "321023" },

{
  "label": "扬州经济技术开发区",
  "value": "321071" },

{
  "label": "仪征市",
  "value": "321081" },

{
  "label": "高邮市",
  "value": "321084" }],


[{
  "label": "京口区",
  "value": "321102" },

{
  "label": "润州区",
  "value": "321111" },

{
  "label": "丹徒区",
  "value": "321112" },

{
  "label": "镇江新区",
  "value": "321171" },

{
  "label": "丹阳市",
  "value": "321181" },

{
  "label": "扬中市",
  "value": "321182" },

{
  "label": "句容市",
  "value": "321183" }],


[{
  "label": "海陵区",
  "value": "321202" },

{
  "label": "高港区",
  "value": "321203" },

{
  "label": "姜堰区",
  "value": "321204" },

{
  "label": "泰州医药高新技术产业开发区",
  "value": "321271" },

{
  "label": "兴化市",
  "value": "321281" },

{
  "label": "靖江市",
  "value": "321282" },

{
  "label": "泰兴市",
  "value": "321283" }],


[{
  "label": "宿城区",
  "value": "321302" },

{
  "label": "宿豫区",
  "value": "321311" },

{
  "label": "沭阳县",
  "value": "321322" },

{
  "label": "泗阳县",
  "value": "321323" },

{
  "label": "泗洪县",
  "value": "321324" },

{
  "label": "宿迁经济技术开发区",
  "value": "321371" }]],



[
[{
  "label": "上城区",
  "value": "330102" },

{
  "label": "下城区",
  "value": "330103" },

{
  "label": "江干区",
  "value": "330104" },

{
  "label": "拱墅区",
  "value": "330105" },

{
  "label": "西湖区",
  "value": "330106" },

{
  "label": "滨江区",
  "value": "330108" },

{
  "label": "萧山区",
  "value": "330109" },

{
  "label": "余杭区",
  "value": "330110" },

{
  "label": "富阳区",
  "value": "330111" },

{
  "label": "临安区",
  "value": "330112" },

{
  "label": "桐庐县",
  "value": "330122" },

{
  "label": "淳安县",
  "value": "330127" },

{
  "label": "建德市",
  "value": "330182" }],


[{
  "label": "海曙区",
  "value": "330203" },

{
  "label": "江北区",
  "value": "330205" },

{
  "label": "北仑区",
  "value": "330206" },

{
  "label": "镇海区",
  "value": "330211" },

{
  "label": "鄞州区",
  "value": "330212" },

{
  "label": "奉化区",
  "value": "330213" },

{
  "label": "象山县",
  "value": "330225" },

{
  "label": "宁海县",
  "value": "330226" },

{
  "label": "余姚市",
  "value": "330281" },

{
  "label": "慈溪市",
  "value": "330282" }],


[{
  "label": "鹿城区",
  "value": "330302" },

{
  "label": "龙湾区",
  "value": "330303" },

{
  "label": "瓯海区",
  "value": "330304" },

{
  "label": "洞头区",
  "value": "330305" },

{
  "label": "永嘉县",
  "value": "330324" },

{
  "label": "平阳县",
  "value": "330326" },

{
  "label": "苍南县",
  "value": "330327" },

{
  "label": "文成县",
  "value": "330328" },

{
  "label": "泰顺县",
  "value": "330329" },

{
  "label": "温州经济技术开发区",
  "value": "330371" },

{
  "label": "瑞安市",
  "value": "330381" },

{
  "label": "乐清市",
  "value": "330382" }],


[{
  "label": "南湖区",
  "value": "330402" },

{
  "label": "秀洲区",
  "value": "330411" },

{
  "label": "嘉善县",
  "value": "330421" },

{
  "label": "海盐县",
  "value": "330424" },

{
  "label": "海宁市",
  "value": "330481" },

{
  "label": "平湖市",
  "value": "330482" },

{
  "label": "桐乡市",
  "value": "330483" }],


[{
  "label": "吴兴区",
  "value": "330502" },

{
  "label": "南浔区",
  "value": "330503" },

{
  "label": "德清县",
  "value": "330521" },

{
  "label": "长兴县",
  "value": "330522" },

{
  "label": "安吉县",
  "value": "330523" }],


[{
  "label": "越城区",
  "value": "330602" },

{
  "label": "柯桥区",
  "value": "330603" },

{
  "label": "上虞区",
  "value": "330604" },

{
  "label": "新昌县",
  "value": "330624" },

{
  "label": "诸暨市",
  "value": "330681" },

{
  "label": "嵊州市",
  "value": "330683" }],


[{
  "label": "婺城区",
  "value": "330702" },

{
  "label": "金东区",
  "value": "330703" },

{
  "label": "武义县",
  "value": "330723" },

{
  "label": "浦江县",
  "value": "330726" },

{
  "label": "磐安县",
  "value": "330727" },

{
  "label": "兰溪市",
  "value": "330781" },

{
  "label": "义乌市",
  "value": "330782" },

{
  "label": "东阳市",
  "value": "330783" },

{
  "label": "永康市",
  "value": "330784" }],


[{
  "label": "柯城区",
  "value": "330802" },

{
  "label": "衢江区",
  "value": "330803" },

{
  "label": "常山县",
  "value": "330822" },

{
  "label": "开化县",
  "value": "330824" },

{
  "label": "龙游县",
  "value": "330825" },

{
  "label": "江山市",
  "value": "330881" }],


[{
  "label": "定海区",
  "value": "330902" },

{
  "label": "普陀区",
  "value": "330903" },

{
  "label": "岱山县",
  "value": "330921" },

{
  "label": "嵊泗县",
  "value": "330922" }],


[{
  "label": "椒江区",
  "value": "331002" },

{
  "label": "黄岩区",
  "value": "331003" },

{
  "label": "路桥区",
  "value": "331004" },

{
  "label": "三门县",
  "value": "331022" },

{
  "label": "天台县",
  "value": "331023" },

{
  "label": "仙居县",
  "value": "331024" },

{
  "label": "温岭市",
  "value": "331081" },

{
  "label": "临海市",
  "value": "331082" },

{
  "label": "玉环市",
  "value": "331083" }],


[{
  "label": "莲都区",
  "value": "331102" },

{
  "label": "青田县",
  "value": "331121" },

{
  "label": "缙云县",
  "value": "331122" },

{
  "label": "遂昌县",
  "value": "331123" },

{
  "label": "松阳县",
  "value": "331124" },

{
  "label": "云和县",
  "value": "331125" },

{
  "label": "庆元县",
  "value": "331126" },

{
  "label": "景宁畲族自治县",
  "value": "331127" },

{
  "label": "龙泉市",
  "value": "331181" }]],



[
[{
  "label": "瑶海区",
  "value": "340102" },

{
  "label": "庐阳区",
  "value": "340103" },

{
  "label": "蜀山区",
  "value": "340104" },

{
  "label": "包河区",
  "value": "340111" },

{
  "label": "长丰县",
  "value": "340121" },

{
  "label": "肥东县",
  "value": "340122" },

{
  "label": "肥西县",
  "value": "340123" },

{
  "label": "庐江县",
  "value": "340124" },

{
  "label": "合肥高新技术产业开发区",
  "value": "340171" },

{
  "label": "合肥经济技术开发区",
  "value": "340172" },

{
  "label": "合肥新站高新技术产业开发区",
  "value": "340173" },

{
  "label": "巢湖市",
  "value": "340181" }],


[{
  "label": "镜湖区",
  "value": "340202" },

{
  "label": "弋江区",
  "value": "340203" },

{
  "label": "鸠江区",
  "value": "340207" },

{
  "label": "三山区",
  "value": "340208" },

{
  "label": "芜湖县",
  "value": "340221" },

{
  "label": "繁昌县",
  "value": "340222" },

{
  "label": "南陵县",
  "value": "340223" },

{
  "label": "无为县",
  "value": "340225" },

{
  "label": "芜湖经济技术开发区",
  "value": "340271" },

{
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272" }],


[{
  "label": "龙子湖区",
  "value": "340302" },

{
  "label": "蚌山区",
  "value": "340303" },

{
  "label": "禹会区",
  "value": "340304" },

{
  "label": "淮上区",
  "value": "340311" },

{
  "label": "怀远县",
  "value": "340321" },

{
  "label": "五河县",
  "value": "340322" },

{
  "label": "固镇县",
  "value": "340323" },

{
  "label": "蚌埠市高新技术开发区",
  "value": "340371" },

{
  "label": "蚌埠市经济开发区",
  "value": "340372" }],


[{
  "label": "大通区",
  "value": "340402" },

{
  "label": "田家庵区",
  "value": "340403" },

{
  "label": "谢家集区",
  "value": "340404" },

{
  "label": "八公山区",
  "value": "340405" },

{
  "label": "潘集区",
  "value": "340406" },

{
  "label": "凤台县",
  "value": "340421" },

{
  "label": "寿县",
  "value": "340422" }],


[{
  "label": "花山区",
  "value": "340503" },

{
  "label": "雨山区",
  "value": "340504" },

{
  "label": "博望区",
  "value": "340506" },

{
  "label": "当涂县",
  "value": "340521" },

{
  "label": "含山县",
  "value": "340522" },

{
  "label": "和县",
  "value": "340523" }],


[{
  "label": "杜集区",
  "value": "340602" },

{
  "label": "相山区",
  "value": "340603" },

{
  "label": "烈山区",
  "value": "340604" },

{
  "label": "濉溪县",
  "value": "340621" }],


[{
  "label": "铜官区",
  "value": "340705" },

{
  "label": "义安区",
  "value": "340706" },

{
  "label": "郊区",
  "value": "340711" },

{
  "label": "枞阳县",
  "value": "340722" }],


[{
  "label": "迎江区",
  "value": "340802" },

{
  "label": "大观区",
  "value": "340803" },

{
  "label": "宜秀区",
  "value": "340811" },

{
  "label": "怀宁县",
  "value": "340822" },

{
  "label": "潜山县",
  "value": "340824" },

{
  "label": "太湖县",
  "value": "340825" },

{
  "label": "宿松县",
  "value": "340826" },

{
  "label": "望江县",
  "value": "340827" },

{
  "label": "岳西县",
  "value": "340828" },

{
  "label": "安徽安庆经济开发区",
  "value": "340871" },

{
  "label": "桐城市",
  "value": "340881" }],


[{
  "label": "屯溪区",
  "value": "341002" },

{
  "label": "黄山区",
  "value": "341003" },

{
  "label": "徽州区",
  "value": "341004" },

{
  "label": "歙县",
  "value": "341021" },

{
  "label": "休宁县",
  "value": "341022" },

{
  "label": "黟县",
  "value": "341023" },

{
  "label": "祁门县",
  "value": "341024" }],


[{
  "label": "琅琊区",
  "value": "341102" },

{
  "label": "南谯区",
  "value": "341103" },

{
  "label": "来安县",
  "value": "341122" },

{
  "label": "全椒县",
  "value": "341124" },

{
  "label": "定远县",
  "value": "341125" },

{
  "label": "凤阳县",
  "value": "341126" },

{
  "label": "苏滁现代产业园",
  "value": "341171" },

{
  "label": "滁州经济技术开发区",
  "value": "341172" },

{
  "label": "天长市",
  "value": "341181" },

{
  "label": "明光市",
  "value": "341182" }],


[{
  "label": "颍州区",
  "value": "341202" },

{
  "label": "颍东区",
  "value": "341203" },

{
  "label": "颍泉区",
  "value": "341204" },

{
  "label": "临泉县",
  "value": "341221" },

{
  "label": "太和县",
  "value": "341222" },

{
  "label": "阜南县",
  "value": "341225" },

{
  "label": "颍上县",
  "value": "341226" },

{
  "label": "阜阳合肥现代产业园区",
  "value": "341271" },

{
  "label": "阜阳经济技术开发区",
  "value": "341272" },

{
  "label": "界首市",
  "value": "341282" }],


[{
  "label": "埇桥区",
  "value": "341302" },

{
  "label": "砀山县",
  "value": "341321" },

{
  "label": "萧县",
  "value": "341322" },

{
  "label": "灵璧县",
  "value": "341323" },

{
  "label": "泗县",
  "value": "341324" },

{
  "label": "宿州马鞍山现代产业园区",
  "value": "341371" },

{
  "label": "宿州经济技术开发区",
  "value": "341372" }],


[{
  "label": "金安区",
  "value": "341502" },

{
  "label": "裕安区",
  "value": "341503" },

{
  "label": "叶集区",
  "value": "341504" },

{
  "label": "霍邱县",
  "value": "341522" },

{
  "label": "舒城县",
  "value": "341523" },

{
  "label": "金寨县",
  "value": "341524" },

{
  "label": "霍山县",
  "value": "341525" }],


[{
  "label": "谯城区",
  "value": "341602" },

{
  "label": "涡阳县",
  "value": "341621" },

{
  "label": "蒙城县",
  "value": "341622" },

{
  "label": "利辛县",
  "value": "341623" }],


[{
  "label": "贵池区",
  "value": "341702" },

{
  "label": "东至县",
  "value": "341721" },

{
  "label": "石台县",
  "value": "341722" },

{
  "label": "青阳县",
  "value": "341723" }],


[{
  "label": "宣州区",
  "value": "341802" },

{
  "label": "郎溪县",
  "value": "341821" },

{
  "label": "广德县",
  "value": "341822" },

{
  "label": "泾县",
  "value": "341823" },

{
  "label": "绩溪县",
  "value": "341824" },

{
  "label": "旌德县",
  "value": "341825" },

{
  "label": "宣城市经济开发区",
  "value": "341871" },

{
  "label": "宁国市",
  "value": "341881" }]],



[
[{
  "label": "鼓楼区",
  "value": "350102" },

{
  "label": "台江区",
  "value": "350103" },

{
  "label": "仓山区",
  "value": "350104" },

{
  "label": "马尾区",
  "value": "350105" },

{
  "label": "晋安区",
  "value": "350111" },

{
  "label": "闽侯县",
  "value": "350121" },

{
  "label": "连江县",
  "value": "350122" },

{
  "label": "罗源县",
  "value": "350123" },

{
  "label": "闽清县",
  "value": "350124" },

{
  "label": "永泰县",
  "value": "350125" },

{
  "label": "平潭县",
  "value": "350128" },

{
  "label": "福清市",
  "value": "350181" },

{
  "label": "长乐市",
  "value": "350182" }],


[{
  "label": "思明区",
  "value": "350203" },

{
  "label": "海沧区",
  "value": "350205" },

{
  "label": "湖里区",
  "value": "350206" },

{
  "label": "集美区",
  "value": "350211" },

{
  "label": "同安区",
  "value": "350212" },

{
  "label": "翔安区",
  "value": "350213" }],


[{
  "label": "城厢区",
  "value": "350302" },

{
  "label": "涵江区",
  "value": "350303" },

{
  "label": "荔城区",
  "value": "350304" },

{
  "label": "秀屿区",
  "value": "350305" },

{
  "label": "仙游县",
  "value": "350322" }],


[{
  "label": "梅列区",
  "value": "350402" },

{
  "label": "三元区",
  "value": "350403" },

{
  "label": "明溪县",
  "value": "350421" },

{
  "label": "清流县",
  "value": "350423" },

{
  "label": "宁化县",
  "value": "350424" },

{
  "label": "大田县",
  "value": "350425" },

{
  "label": "尤溪县",
  "value": "350426" },

{
  "label": "沙县",
  "value": "350427" },

{
  "label": "将乐县",
  "value": "350428" },

{
  "label": "泰宁县",
  "value": "350429" },

{
  "label": "建宁县",
  "value": "350430" },

{
  "label": "永安市",
  "value": "350481" }],


[{
  "label": "鲤城区",
  "value": "350502" },

{
  "label": "丰泽区",
  "value": "350503" },

{
  "label": "洛江区",
  "value": "350504" },

{
  "label": "泉港区",
  "value": "350505" },

{
  "label": "惠安县",
  "value": "350521" },

{
  "label": "安溪县",
  "value": "350524" },

{
  "label": "永春县",
  "value": "350525" },

{
  "label": "德化县",
  "value": "350526" },

{
  "label": "金门县",
  "value": "350527" },

{
  "label": "石狮市",
  "value": "350581" },

{
  "label": "晋江市",
  "value": "350582" },

{
  "label": "南安市",
  "value": "350583" }],


[{
  "label": "芗城区",
  "value": "350602" },

{
  "label": "龙文区",
  "value": "350603" },

{
  "label": "云霄县",
  "value": "350622" },

{
  "label": "漳浦县",
  "value": "350623" },

{
  "label": "诏安县",
  "value": "350624" },

{
  "label": "长泰县",
  "value": "350625" },

{
  "label": "东山县",
  "value": "350626" },

{
  "label": "南靖县",
  "value": "350627" },

{
  "label": "平和县",
  "value": "350628" },

{
  "label": "华安县",
  "value": "350629" },

{
  "label": "龙海市",
  "value": "350681" }],


[{
  "label": "延平区",
  "value": "350702" },

{
  "label": "建阳区",
  "value": "350703" },

{
  "label": "顺昌县",
  "value": "350721" },

{
  "label": "浦城县",
  "value": "350722" },

{
  "label": "光泽县",
  "value": "350723" },

{
  "label": "松溪县",
  "value": "350724" },

{
  "label": "政和县",
  "value": "350725" },

{
  "label": "邵武市",
  "value": "350781" },

{
  "label": "武夷山市",
  "value": "350782" },

{
  "label": "建瓯市",
  "value": "350783" }],


[{
  "label": "新罗区",
  "value": "350802" },

{
  "label": "永定区",
  "value": "350803" },

{
  "label": "长汀县",
  "value": "350821" },

{
  "label": "上杭县",
  "value": "350823" },

{
  "label": "武平县",
  "value": "350824" },

{
  "label": "连城县",
  "value": "350825" },

{
  "label": "漳平市",
  "value": "350881" }],


[{
  "label": "蕉城区",
  "value": "350902" },

{
  "label": "霞浦县",
  "value": "350921" },

{
  "label": "古田县",
  "value": "350922" },

{
  "label": "屏南县",
  "value": "350923" },

{
  "label": "寿宁县",
  "value": "350924" },

{
  "label": "周宁县",
  "value": "350925" },

{
  "label": "柘荣县",
  "value": "350926" },

{
  "label": "福安市",
  "value": "350981" },

{
  "label": "福鼎市",
  "value": "350982" }]],



[
[{
  "label": "东湖区",
  "value": "360102" },

{
  "label": "西湖区",
  "value": "360103" },

{
  "label": "青云谱区",
  "value": "360104" },

{
  "label": "湾里区",
  "value": "360105" },

{
  "label": "青山湖区",
  "value": "360111" },

{
  "label": "新建区",
  "value": "360112" },

{
  "label": "南昌县",
  "value": "360121" },

{
  "label": "安义县",
  "value": "360123" },

{
  "label": "进贤县",
  "value": "360124" }],


[{
  "label": "昌江区",
  "value": "360202" },

{
  "label": "珠山区",
  "value": "360203" },

{
  "label": "浮梁县",
  "value": "360222" },

{
  "label": "乐平市",
  "value": "360281" }],


[{
  "label": "安源区",
  "value": "360302" },

{
  "label": "湘东区",
  "value": "360313" },

{
  "label": "莲花县",
  "value": "360321" },

{
  "label": "上栗县",
  "value": "360322" },

{
  "label": "芦溪县",
  "value": "360323" }],


[{
  "label": "濂溪区",
  "value": "360402" },

{
  "label": "浔阳区",
  "value": "360403" },

{
  "label": "柴桑区",
  "value": "360404" },

{
  "label": "武宁县",
  "value": "360423" },

{
  "label": "修水县",
  "value": "360424" },

{
  "label": "永修县",
  "value": "360425" },

{
  "label": "德安县",
  "value": "360426" },

{
  "label": "都昌县",
  "value": "360428" },

{
  "label": "湖口县",
  "value": "360429" },

{
  "label": "彭泽县",
  "value": "360430" },

{
  "label": "瑞昌市",
  "value": "360481" },

{
  "label": "共青城市",
  "value": "360482" },

{
  "label": "庐山市",
  "value": "360483" }],


[{
  "label": "渝水区",
  "value": "360502" },

{
  "label": "分宜县",
  "value": "360521" }],


[{
  "label": "月湖区",
  "value": "360602" },

{
  "label": "余江县",
  "value": "360622" },

{
  "label": "贵溪市",
  "value": "360681" }],


[{
  "label": "章贡区",
  "value": "360702" },

{
  "label": "南康区",
  "value": "360703" },

{
  "label": "赣县区",
  "value": "360704" },

{
  "label": "信丰县",
  "value": "360722" },

{
  "label": "大余县",
  "value": "360723" },

{
  "label": "上犹县",
  "value": "360724" },

{
  "label": "崇义县",
  "value": "360725" },

{
  "label": "安远县",
  "value": "360726" },

{
  "label": "龙南县",
  "value": "360727" },

{
  "label": "定南县",
  "value": "360728" },

{
  "label": "全南县",
  "value": "360729" },

{
  "label": "宁都县",
  "value": "360730" },

{
  "label": "于都县",
  "value": "360731" },

{
  "label": "兴国县",
  "value": "360732" },

{
  "label": "会昌县",
  "value": "360733" },

{
  "label": "寻乌县",
  "value": "360734" },

{
  "label": "石城县",
  "value": "360735" },

{
  "label": "瑞金市",
  "value": "360781" }],


[{
  "label": "吉州区",
  "value": "360802" },

{
  "label": "青原区",
  "value": "360803" },

{
  "label": "吉安县",
  "value": "360821" },

{
  "label": "吉水县",
  "value": "360822" },

{
  "label": "峡江县",
  "value": "360823" },

{
  "label": "新干县",
  "value": "360824" },

{
  "label": "永丰县",
  "value": "360825" },

{
  "label": "泰和县",
  "value": "360826" },

{
  "label": "遂川县",
  "value": "360827" },

{
  "label": "万安县",
  "value": "360828" },

{
  "label": "安福县",
  "value": "360829" },

{
  "label": "永新县",
  "value": "360830" },

{
  "label": "井冈山市",
  "value": "360881" }],


[{
  "label": "袁州区",
  "value": "360902" },

{
  "label": "奉新县",
  "value": "360921" },

{
  "label": "万载县",
  "value": "360922" },

{
  "label": "上高县",
  "value": "360923" },

{
  "label": "宜丰县",
  "value": "360924" },

{
  "label": "靖安县",
  "value": "360925" },

{
  "label": "铜鼓县",
  "value": "360926" },

{
  "label": "丰城市",
  "value": "360981" },

{
  "label": "樟树市",
  "value": "360982" },

{
  "label": "高安市",
  "value": "360983" }],


[{
  "label": "临川区",
  "value": "361002" },

{
  "label": "东乡区",
  "value": "361003" },

{
  "label": "南城县",
  "value": "361021" },

{
  "label": "黎川县",
  "value": "361022" },

{
  "label": "南丰县",
  "value": "361023" },

{
  "label": "崇仁县",
  "value": "361024" },

{
  "label": "乐安县",
  "value": "361025" },

{
  "label": "宜黄县",
  "value": "361026" },

{
  "label": "金溪县",
  "value": "361027" },

{
  "label": "资溪县",
  "value": "361028" },

{
  "label": "广昌县",
  "value": "361030" }],


[{
  "label": "信州区",
  "value": "361102" },

{
  "label": "广丰区",
  "value": "361103" },

{
  "label": "上饶县",
  "value": "361121" },

{
  "label": "玉山县",
  "value": "361123" },

{
  "label": "铅山县",
  "value": "361124" },

{
  "label": "横峰县",
  "value": "361125" },

{
  "label": "弋阳县",
  "value": "361126" },

{
  "label": "余干县",
  "value": "361127" },

{
  "label": "鄱阳县",
  "value": "361128" },

{
  "label": "万年县",
  "value": "361129" },

{
  "label": "婺源县",
  "value": "361130" },

{
  "label": "德兴市",
  "value": "361181" }]],



[
[{
  "label": "历下区",
  "value": "370102" },

{
  "label": "市中区",
  "value": "370103" },

{
  "label": "槐荫区",
  "value": "370104" },

{
  "label": "天桥区",
  "value": "370105" },

{
  "label": "历城区",
  "value": "370112" },

{
  "label": "长清区",
  "value": "370113" },

{
  "label": "章丘区",
  "value": "370114" },

{
  "label": "平阴县",
  "value": "370124" },

{
  "label": "济阳县",
  "value": "370125" },

{
  "label": "商河县",
  "value": "370126" },

{
  "label": "济南高新技术产业开发区",
  "value": "370171" }],


[{
  "label": "市南区",
  "value": "370202" },

{
  "label": "市北区",
  "value": "370203" },

{
  "label": "黄岛区",
  "value": "370211" },

{
  "label": "崂山区",
  "value": "370212" },

{
  "label": "李沧区",
  "value": "370213" },

{
  "label": "城阳区",
  "value": "370214" },

{
  "label": "即墨区",
  "value": "370215" },

{
  "label": "青岛高新技术产业开发区",
  "value": "370271" },

{
  "label": "胶州市",
  "value": "370281" },

{
  "label": "平度市",
  "value": "370283" },

{
  "label": "莱西市",
  "value": "370285" }],


[{
  "label": "淄川区",
  "value": "370302" },

{
  "label": "张店区",
  "value": "370303" },

{
  "label": "博山区",
  "value": "370304" },

{
  "label": "临淄区",
  "value": "370305" },

{
  "label": "周村区",
  "value": "370306" },

{
  "label": "桓台县",
  "value": "370321" },

{
  "label": "高青县",
  "value": "370322" },

{
  "label": "沂源县",
  "value": "370323" }],


[{
  "label": "市中区",
  "value": "370402" },

{
  "label": "薛城区",
  "value": "370403" },

{
  "label": "峄城区",
  "value": "370404" },

{
  "label": "台儿庄区",
  "value": "370405" },

{
  "label": "山亭区",
  "value": "370406" },

{
  "label": "滕州市",
  "value": "370481" }],


[{
  "label": "东营区",
  "value": "370502" },

{
  "label": "河口区",
  "value": "370503" },

{
  "label": "垦利区",
  "value": "370505" },

{
  "label": "利津县",
  "value": "370522" },

{
  "label": "广饶县",
  "value": "370523" },

{
  "label": "东营经济技术开发区",
  "value": "370571" },

{
  "label": "东营港经济开发区",
  "value": "370572" }],


[{
  "label": "芝罘区",
  "value": "370602" },

{
  "label": "福山区",
  "value": "370611" },

{
  "label": "牟平区",
  "value": "370612" },

{
  "label": "莱山区",
  "value": "370613" },

{
  "label": "长岛县",
  "value": "370634" },

{
  "label": "烟台高新技术产业开发区",
  "value": "370671" },

{
  "label": "烟台经济技术开发区",
  "value": "370672" },

{
  "label": "龙口市",
  "value": "370681" },

{
  "label": "莱阳市",
  "value": "370682" },

{
  "label": "莱州市",
  "value": "370683" },

{
  "label": "蓬莱市",
  "value": "370684" },

{
  "label": "招远市",
  "value": "370685" },

{
  "label": "栖霞市",
  "value": "370686" },

{
  "label": "海阳市",
  "value": "370687" }],


[{
  "label": "潍城区",
  "value": "370702" },

{
  "label": "寒亭区",
  "value": "370703" },

{
  "label": "坊子区",
  "value": "370704" },

{
  "label": "奎文区",
  "value": "370705" },

{
  "label": "临朐县",
  "value": "370724" },

{
  "label": "昌乐县",
  "value": "370725" },

{
  "label": "潍坊滨海经济技术开发区",
  "value": "370772" },

{
  "label": "青州市",
  "value": "370781" },

{
  "label": "诸城市",
  "value": "370782" },

{
  "label": "寿光市",
  "value": "370783" },

{
  "label": "安丘市",
  "value": "370784" },

{
  "label": "高密市",
  "value": "370785" },

{
  "label": "昌邑市",
  "value": "370786" }],


[{
  "label": "任城区",
  "value": "370811" },

{
  "label": "兖州区",
  "value": "370812" },

{
  "label": "微山县",
  "value": "370826" },

{
  "label": "鱼台县",
  "value": "370827" },

{
  "label": "金乡县",
  "value": "370828" },

{
  "label": "嘉祥县",
  "value": "370829" },

{
  "label": "汶上县",
  "value": "370830" },

{
  "label": "泗水县",
  "value": "370831" },

{
  "label": "梁山县",
  "value": "370832" },

{
  "label": "济宁高新技术产业开发区",
  "value": "370871" },

{
  "label": "曲阜市",
  "value": "370881" },

{
  "label": "邹城市",
  "value": "370883" }],


[{
  "label": "泰山区",
  "value": "370902" },

{
  "label": "岱岳区",
  "value": "370911" },

{
  "label": "宁阳县",
  "value": "370921" },

{
  "label": "东平县",
  "value": "370923" },

{
  "label": "新泰市",
  "value": "370982" },

{
  "label": "肥城市",
  "value": "370983" }],


[{
  "label": "环翠区",
  "value": "371002" },

{
  "label": "文登区",
  "value": "371003" },

{
  "label": "威海火炬高技术产业开发区",
  "value": "371071" },

{
  "label": "威海经济技术开发区",
  "value": "371072" },

{
  "label": "威海临港经济技术开发区",
  "value": "371073" },

{
  "label": "荣成市",
  "value": "371082" },

{
  "label": "乳山市",
  "value": "371083" }],


[{
  "label": "东港区",
  "value": "371102" },

{
  "label": "岚山区",
  "value": "371103" },

{
  "label": "五莲县",
  "value": "371121" },

{
  "label": "莒县",
  "value": "371122" },

{
  "label": "日照经济技术开发区",
  "value": "371171" },

{
  "label": "日照国际海洋城",
  "value": "371172" }],


[{
  "label": "莱城区",
  "value": "371202" },

{
  "label": "钢城区",
  "value": "371203" }],


[{
  "label": "兰山区",
  "value": "371302" },

{
  "label": "罗庄区",
  "value": "371311" },

{
  "label": "河东区",
  "value": "371312" },

{
  "label": "沂南县",
  "value": "371321" },

{
  "label": "郯城县",
  "value": "371322" },

{
  "label": "沂水县",
  "value": "371323" },

{
  "label": "兰陵县",
  "value": "371324" },

{
  "label": "费县",
  "value": "371325" },

{
  "label": "平邑县",
  "value": "371326" },

{
  "label": "莒南县",
  "value": "371327" },

{
  "label": "蒙阴县",
  "value": "371328" },

{
  "label": "临沭县",
  "value": "371329" },

{
  "label": "临沂高新技术产业开发区",
  "value": "371371" },

{
  "label": "临沂经济技术开发区",
  "value": "371372" },

{
  "label": "临沂临港经济开发区",
  "value": "371373" }],


[{
  "label": "德城区",
  "value": "371402" },

{
  "label": "陵城区",
  "value": "371403" },

{
  "label": "宁津县",
  "value": "371422" },

{
  "label": "庆云县",
  "value": "371423" },

{
  "label": "临邑县",
  "value": "371424" },

{
  "label": "齐河县",
  "value": "371425" },

{
  "label": "平原县",
  "value": "371426" },

{
  "label": "夏津县",
  "value": "371427" },

{
  "label": "武城县",
  "value": "371428" },

{
  "label": "德州经济技术开发区",
  "value": "371471" },

{
  "label": "德州运河经济开发区",
  "value": "371472" },

{
  "label": "乐陵市",
  "value": "371481" },

{
  "label": "禹城市",
  "value": "371482" }],


[{
  "label": "东昌府区",
  "value": "371502" },

{
  "label": "阳谷县",
  "value": "371521" },

{
  "label": "莘县",
  "value": "371522" },

{
  "label": "茌平县",
  "value": "371523" },

{
  "label": "东阿县",
  "value": "371524" },

{
  "label": "冠县",
  "value": "371525" },

{
  "label": "高唐县",
  "value": "371526" },

{
  "label": "临清市",
  "value": "371581" }],


[{
  "label": "滨城区",
  "value": "371602" },

{
  "label": "沾化区",
  "value": "371603" },

{
  "label": "惠民县",
  "value": "371621" },

{
  "label": "阳信县",
  "value": "371622" },

{
  "label": "无棣县",
  "value": "371623" },

{
  "label": "博兴县",
  "value": "371625" },

{
  "label": "邹平县",
  "value": "371626" }],


[{
  "label": "牡丹区",
  "value": "371702" },

{
  "label": "定陶区",
  "value": "371703" },

{
  "label": "曹县",
  "value": "371721" },

{
  "label": "单县",
  "value": "371722" },

{
  "label": "成武县",
  "value": "371723" },

{
  "label": "巨野县",
  "value": "371724" },

{
  "label": "郓城县",
  "value": "371725" },

{
  "label": "鄄城县",
  "value": "371726" },

{
  "label": "东明县",
  "value": "371728" },

{
  "label": "菏泽经济技术开发区",
  "value": "371771" },

{
  "label": "菏泽高新技术开发区",
  "value": "371772" }]],



[
[{
  "label": "中原区",
  "value": "410102" },

{
  "label": "二七区",
  "value": "410103" },

{
  "label": "管城回族区",
  "value": "410104" },

{
  "label": "金水区",
  "value": "410105" },

{
  "label": "上街区",
  "value": "410106" },

{
  "label": "惠济区",
  "value": "410108" },

{
  "label": "中牟县",
  "value": "410122" },

{
  "label": "郑州经济技术开发区",
  "value": "410171" },

{
  "label": "郑州高新技术产业开发区",
  "value": "410172" },

{
  "label": "郑州航空港经济综合实验区",
  "value": "410173" },

{
  "label": "巩义市",
  "value": "410181" },

{
  "label": "荥阳市",
  "value": "410182" },

{
  "label": "新密市",
  "value": "410183" },

{
  "label": "新郑市",
  "value": "410184" },

{
  "label": "登封市",
  "value": "410185" }],


[{
  "label": "龙亭区",
  "value": "410202" },

{
  "label": "顺河回族区",
  "value": "410203" },

{
  "label": "鼓楼区",
  "value": "410204" },

{
  "label": "禹王台区",
  "value": "410205" },

{
  "label": "祥符区",
  "value": "410212" },

{
  "label": "杞县",
  "value": "410221" },

{
  "label": "通许县",
  "value": "410222" },

{
  "label": "尉氏县",
  "value": "410223" },

{
  "label": "兰考县",
  "value": "410225" }],


[{
  "label": "老城区",
  "value": "410302" },

{
  "label": "西工区",
  "value": "410303" },

{
  "label": "瀍河回族区",
  "value": "410304" },

{
  "label": "涧西区",
  "value": "410305" },

{
  "label": "吉利区",
  "value": "410306" },

{
  "label": "洛龙区",
  "value": "410311" },

{
  "label": "孟津县",
  "value": "410322" },

{
  "label": "新安县",
  "value": "410323" },

{
  "label": "栾川县",
  "value": "410324" },

{
  "label": "嵩县",
  "value": "410325" },

{
  "label": "汝阳县",
  "value": "410326" },

{
  "label": "宜阳县",
  "value": "410327" },

{
  "label": "洛宁县",
  "value": "410328" },

{
  "label": "伊川县",
  "value": "410329" },

{
  "label": "洛阳高新技术产业开发区",
  "value": "410371" },

{
  "label": "偃师市",
  "value": "410381" }],


[{
  "label": "新华区",
  "value": "410402" },

{
  "label": "卫东区",
  "value": "410403" },

{
  "label": "石龙区",
  "value": "410404" },

{
  "label": "湛河区",
  "value": "410411" },

{
  "label": "宝丰县",
  "value": "410421" },

{
  "label": "叶县",
  "value": "410422" },

{
  "label": "鲁山县",
  "value": "410423" },

{
  "label": "郏县",
  "value": "410425" },

{
  "label": "平顶山高新技术产业开发区",
  "value": "410471" },

{
  "label": "平顶山市新城区",
  "value": "410472" },

{
  "label": "舞钢市",
  "value": "410481" },

{
  "label": "汝州市",
  "value": "410482" }],


[{
  "label": "文峰区",
  "value": "410502" },

{
  "label": "北关区",
  "value": "410503" },

{
  "label": "殷都区",
  "value": "410505" },

{
  "label": "龙安区",
  "value": "410506" },

{
  "label": "安阳县",
  "value": "410522" },

{
  "label": "汤阴县",
  "value": "410523" },

{
  "label": "滑县",
  "value": "410526" },

{
  "label": "内黄县",
  "value": "410527" },

{
  "label": "安阳高新技术产业开发区",
  "value": "410571" },

{
  "label": "林州市",
  "value": "410581" }],


[{
  "label": "鹤山区",
  "value": "410602" },

{
  "label": "山城区",
  "value": "410603" },

{
  "label": "淇滨区",
  "value": "410611" },

{
  "label": "浚县",
  "value": "410621" },

{
  "label": "淇县",
  "value": "410622" },

{
  "label": "鹤壁经济技术开发区",
  "value": "410671" }],


[{
  "label": "红旗区",
  "value": "410702" },

{
  "label": "卫滨区",
  "value": "410703" },

{
  "label": "凤泉区",
  "value": "410704" },

{
  "label": "牧野区",
  "value": "410711" },

{
  "label": "新乡县",
  "value": "410721" },

{
  "label": "获嘉县",
  "value": "410724" },

{
  "label": "原阳县",
  "value": "410725" },

{
  "label": "延津县",
  "value": "410726" },

{
  "label": "封丘县",
  "value": "410727" },

{
  "label": "长垣县",
  "value": "410728" },

{
  "label": "新乡高新技术产业开发区",
  "value": "410771" },

{
  "label": "新乡经济技术开发区",
  "value": "410772" },

{
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773" },

{
  "label": "卫辉市",
  "value": "410781" },

{
  "label": "辉县市",
  "value": "410782" }],


[{
  "label": "解放区",
  "value": "410802" },

{
  "label": "中站区",
  "value": "410803" },

{
  "label": "马村区",
  "value": "410804" },

{
  "label": "山阳区",
  "value": "410811" },

{
  "label": "修武县",
  "value": "410821" },

{
  "label": "博爱县",
  "value": "410822" },

{
  "label": "武陟县",
  "value": "410823" },

{
  "label": "温县",
  "value": "410825" },

{
  "label": "焦作城乡一体化示范区",
  "value": "410871" },

{
  "label": "沁阳市",
  "value": "410882" },

{
  "label": "孟州市",
  "value": "410883" }],


[{
  "label": "华龙区",
  "value": "410902" },

{
  "label": "清丰县",
  "value": "410922" },

{
  "label": "南乐县",
  "value": "410923" },

{
  "label": "范县",
  "value": "410926" },

{
  "label": "台前县",
  "value": "410927" },

{
  "label": "濮阳县",
  "value": "410928" },

{
  "label": "河南濮阳工业园区",
  "value": "410971" },

{
  "label": "濮阳经济技术开发区",
  "value": "410972" }],


[{
  "label": "魏都区",
  "value": "411002" },

{
  "label": "建安区",
  "value": "411003" },

{
  "label": "鄢陵县",
  "value": "411024" },

{
  "label": "襄城县",
  "value": "411025" },

{
  "label": "许昌经济技术开发区",
  "value": "411071" },

{
  "label": "禹州市",
  "value": "411081" },

{
  "label": "长葛市",
  "value": "411082" }],


[{
  "label": "源汇区",
  "value": "411102" },

{
  "label": "郾城区",
  "value": "411103" },

{
  "label": "召陵区",
  "value": "411104" },

{
  "label": "舞阳县",
  "value": "411121" },

{
  "label": "临颍县",
  "value": "411122" },

{
  "label": "漯河经济技术开发区",
  "value": "411171" }],


[{
  "label": "湖滨区",
  "value": "411202" },

{
  "label": "陕州区",
  "value": "411203" },

{
  "label": "渑池县",
  "value": "411221" },

{
  "label": "卢氏县",
  "value": "411224" },

{
  "label": "河南三门峡经济开发区",
  "value": "411271" },

{
  "label": "义马市",
  "value": "411281" },

{
  "label": "灵宝市",
  "value": "411282" }],


[{
  "label": "宛城区",
  "value": "411302" },

{
  "label": "卧龙区",
  "value": "411303" },

{
  "label": "南召县",
  "value": "411321" },

{
  "label": "方城县",
  "value": "411322" },

{
  "label": "西峡县",
  "value": "411323" },

{
  "label": "镇平县",
  "value": "411324" },

{
  "label": "内乡县",
  "value": "411325" },

{
  "label": "淅川县",
  "value": "411326" },

{
  "label": "社旗县",
  "value": "411327" },

{
  "label": "唐河县",
  "value": "411328" },

{
  "label": "新野县",
  "value": "411329" },

{
  "label": "桐柏县",
  "value": "411330" },

{
  "label": "南阳高新技术产业开发区",
  "value": "411371" },

{
  "label": "南阳市城乡一体化示范区",
  "value": "411372" },

{
  "label": "邓州市",
  "value": "411381" }],


[{
  "label": "梁园区",
  "value": "411402" },

{
  "label": "睢阳区",
  "value": "411403" },

{
  "label": "民权县",
  "value": "411421" },

{
  "label": "睢县",
  "value": "411422" },

{
  "label": "宁陵县",
  "value": "411423" },

{
  "label": "柘城县",
  "value": "411424" },

{
  "label": "虞城县",
  "value": "411425" },

{
  "label": "夏邑县",
  "value": "411426" },

{
  "label": "豫东综合物流产业聚集区",
  "value": "411471" },

{
  "label": "河南商丘经济开发区",
  "value": "411472" },

{
  "label": "永城市",
  "value": "411481" }],


[{
  "label": "浉河区",
  "value": "411502" },

{
  "label": "平桥区",
  "value": "411503" },

{
  "label": "罗山县",
  "value": "411521" },

{
  "label": "光山县",
  "value": "411522" },

{
  "label": "新县",
  "value": "411523" },

{
  "label": "商城县",
  "value": "411524" },

{
  "label": "固始县",
  "value": "411525" },

{
  "label": "潢川县",
  "value": "411526" },

{
  "label": "淮滨县",
  "value": "411527" },

{
  "label": "息县",
  "value": "411528" },

{
  "label": "信阳高新技术产业开发区",
  "value": "411571" }],


[{
  "label": "川汇区",
  "value": "411602" },

{
  "label": "扶沟县",
  "value": "411621" },

{
  "label": "西华县",
  "value": "411622" },

{
  "label": "商水县",
  "value": "411623" },

{
  "label": "沈丘县",
  "value": "411624" },

{
  "label": "郸城县",
  "value": "411625" },

{
  "label": "淮阳县",
  "value": "411626" },

{
  "label": "太康县",
  "value": "411627" },

{
  "label": "鹿邑县",
  "value": "411628" },

{
  "label": "河南周口经济开发区",
  "value": "411671" },

{
  "label": "项城市",
  "value": "411681" }],


[{
  "label": "驿城区",
  "value": "411702" },

{
  "label": "西平县",
  "value": "411721" },

{
  "label": "上蔡县",
  "value": "411722" },

{
  "label": "平舆县",
  "value": "411723" },

{
  "label": "正阳县",
  "value": "411724" },

{
  "label": "确山县",
  "value": "411725" },

{
  "label": "泌阳县",
  "value": "411726" },

{
  "label": "汝南县",
  "value": "411727" },

{
  "label": "遂平县",
  "value": "411728" },

{
  "label": "新蔡县",
  "value": "411729" },

{
  "label": "河南驻马店经济开发区",
  "value": "411771" }],


[{
  "label": "济源市",
  "value": "419001" }]],


[
[{
  "label": "江岸区",
  "value": "420102" },

{
  "label": "江汉区",
  "value": "420103" },

{
  "label": "硚口区",
  "value": "420104" },

{
  "label": "汉阳区",
  "value": "420105" },

{
  "label": "武昌区",
  "value": "420106" },

{
  "label": "青山区",
  "value": "420107" },

{
  "label": "洪山区",
  "value": "420111" },

{
  "label": "东西湖区",
  "value": "420112" },

{
  "label": "汉南区",
  "value": "420113" },

{
  "label": "蔡甸区",
  "value": "420114" },

{
  "label": "江夏区",
  "value": "420115" },

{
  "label": "黄陂区",
  "value": "420116" },

{
  "label": "新洲区",
  "value": "420117" }],


[{
  "label": "黄石港区",
  "value": "420202" },

{
  "label": "西塞山区",
  "value": "420203" },

{
  "label": "下陆区",
  "value": "420204" },

{
  "label": "铁山区",
  "value": "420205" },

{
  "label": "阳新县",
  "value": "420222" },

{
  "label": "大冶市",
  "value": "420281" }],


[{
  "label": "茅箭区",
  "value": "420302" },

{
  "label": "张湾区",
  "value": "420303" },

{
  "label": "郧阳区",
  "value": "420304" },

{
  "label": "郧西县",
  "value": "420322" },

{
  "label": "竹山县",
  "value": "420323" },

{
  "label": "竹溪县",
  "value": "420324" },

{
  "label": "房县",
  "value": "420325" },

{
  "label": "丹江口市",
  "value": "420381" }],


[{
  "label": "西陵区",
  "value": "420502" },

{
  "label": "伍家岗区",
  "value": "420503" },

{
  "label": "点军区",
  "value": "420504" },

{
  "label": "猇亭区",
  "value": "420505" },

{
  "label": "夷陵区",
  "value": "420506" },

{
  "label": "远安县",
  "value": "420525" },

{
  "label": "兴山县",
  "value": "420526" },

{
  "label": "秭归县",
  "value": "420527" },

{
  "label": "长阳土家族自治县",
  "value": "420528" },

{
  "label": "五峰土家族自治县",
  "value": "420529" },

{
  "label": "宜都市",
  "value": "420581" },

{
  "label": "当阳市",
  "value": "420582" },

{
  "label": "枝江市",
  "value": "420583" }],


[{
  "label": "襄城区",
  "value": "420602" },

{
  "label": "樊城区",
  "value": "420606" },

{
  "label": "襄州区",
  "value": "420607" },

{
  "label": "南漳县",
  "value": "420624" },

{
  "label": "谷城县",
  "value": "420625" },

{
  "label": "保康县",
  "value": "420626" },

{
  "label": "老河口市",
  "value": "420682" },

{
  "label": "枣阳市",
  "value": "420683" },

{
  "label": "宜城市",
  "value": "420684" }],


[{
  "label": "梁子湖区",
  "value": "420702" },

{
  "label": "华容区",
  "value": "420703" },

{
  "label": "鄂城区",
  "value": "420704" }],


[{
  "label": "东宝区",
  "value": "420802" },

{
  "label": "掇刀区",
  "value": "420804" },

{
  "label": "京山县",
  "value": "420821" },

{
  "label": "沙洋县",
  "value": "420822" },

{
  "label": "钟祥市",
  "value": "420881" }],


[{
  "label": "孝南区",
  "value": "420902" },

{
  "label": "孝昌县",
  "value": "420921" },

{
  "label": "大悟县",
  "value": "420922" },

{
  "label": "云梦县",
  "value": "420923" },

{
  "label": "应城市",
  "value": "420981" },

{
  "label": "安陆市",
  "value": "420982" },

{
  "label": "汉川市",
  "value": "420984" }],


[{
  "label": "沙市区",
  "value": "421002" },

{
  "label": "荆州区",
  "value": "421003" },

{
  "label": "公安县",
  "value": "421022" },

{
  "label": "监利县",
  "value": "421023" },

{
  "label": "江陵县",
  "value": "421024" },

{
  "label": "荆州经济技术开发区",
  "value": "421071" },

{
  "label": "石首市",
  "value": "421081" },

{
  "label": "洪湖市",
  "value": "421083" },

{
  "label": "松滋市",
  "value": "421087" }],


[{
  "label": "黄州区",
  "value": "421102" },

{
  "label": "团风县",
  "value": "421121" },

{
  "label": "红安县",
  "value": "421122" },

{
  "label": "罗田县",
  "value": "421123" },

{
  "label": "英山县",
  "value": "421124" },

{
  "label": "浠水县",
  "value": "421125" },

{
  "label": "蕲春县",
  "value": "421126" },

{
  "label": "黄梅县",
  "value": "421127" },

{
  "label": "龙感湖管理区",
  "value": "421171" },

{
  "label": "麻城市",
  "value": "421181" },

{
  "label": "武穴市",
  "value": "421182" }],


[{
  "label": "咸安区",
  "value": "421202" },

{
  "label": "嘉鱼县",
  "value": "421221" },

{
  "label": "通城县",
  "value": "421222" },

{
  "label": "崇阳县",
  "value": "421223" },

{
  "label": "通山县",
  "value": "421224" },

{
  "label": "赤壁市",
  "value": "421281" }],


[{
  "label": "曾都区",
  "value": "421303" },

{
  "label": "随县",
  "value": "421321" },

{
  "label": "广水市",
  "value": "421381" }],


[{
  "label": "恩施市",
  "value": "422801" },

{
  "label": "利川市",
  "value": "422802" },

{
  "label": "建始县",
  "value": "422822" },

{
  "label": "巴东县",
  "value": "422823" },

{
  "label": "宣恩县",
  "value": "422825" },

{
  "label": "咸丰县",
  "value": "422826" },

{
  "label": "来凤县",
  "value": "422827" },

{
  "label": "鹤峰县",
  "value": "422828" }],


[{
  "label": "仙桃市",
  "value": "429004" },

{
  "label": "潜江市",
  "value": "429005" },

{
  "label": "天门市",
  "value": "429006" },

{
  "label": "神农架林区",
  "value": "429021" }]],



[
[{
  "label": "芙蓉区",
  "value": "430102" },

{
  "label": "天心区",
  "value": "430103" },

{
  "label": "岳麓区",
  "value": "430104" },

{
  "label": "开福区",
  "value": "430105" },

{
  "label": "雨花区",
  "value": "430111" },

{
  "label": "望城区",
  "value": "430112" },

{
  "label": "长沙县",
  "value": "430121" },

{
  "label": "浏阳市",
  "value": "430181" },

{
  "label": "宁乡市",
  "value": "430182" }],


[{
  "label": "荷塘区",
  "value": "430202" },

{
  "label": "芦淞区",
  "value": "430203" },

{
  "label": "石峰区",
  "value": "430204" },

{
  "label": "天元区",
  "value": "430211" },

{
  "label": "株洲县",
  "value": "430221" },

{
  "label": "攸县",
  "value": "430223" },

{
  "label": "茶陵县",
  "value": "430224" },

{
  "label": "炎陵县",
  "value": "430225" },

{
  "label": "云龙示范区",
  "value": "430271" },

{
  "label": "醴陵市",
  "value": "430281" }],


[{
  "label": "雨湖区",
  "value": "430302" },

{
  "label": "岳塘区",
  "value": "430304" },

{
  "label": "湘潭县",
  "value": "430321" },

{
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371" },

{
  "label": "湘潭昭山示范区",
  "value": "430372" },

{
  "label": "湘潭九华示范区",
  "value": "430373" },

{
  "label": "湘乡市",
  "value": "430381" },

{
  "label": "韶山市",
  "value": "430382" }],


[{
  "label": "珠晖区",
  "value": "430405" },

{
  "label": "雁峰区",
  "value": "430406" },

{
  "label": "石鼓区",
  "value": "430407" },

{
  "label": "蒸湘区",
  "value": "430408" },

{
  "label": "南岳区",
  "value": "430412" },

{
  "label": "衡阳县",
  "value": "430421" },

{
  "label": "衡南县",
  "value": "430422" },

{
  "label": "衡山县",
  "value": "430423" },

{
  "label": "衡东县",
  "value": "430424" },

{
  "label": "祁东县",
  "value": "430426" },

{
  "label": "衡阳综合保税区",
  "value": "430471" },

{
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472" },

{
  "label": "湖南衡阳松木经济开发区",
  "value": "430473" },

{
  "label": "耒阳市",
  "value": "430481" },

{
  "label": "常宁市",
  "value": "430482" }],


[{
  "label": "双清区",
  "value": "430502" },

{
  "label": "大祥区",
  "value": "430503" },

{
  "label": "北塔区",
  "value": "430511" },

{
  "label": "邵东县",
  "value": "430521" },

{
  "label": "新邵县",
  "value": "430522" },

{
  "label": "邵阳县",
  "value": "430523" },

{
  "label": "隆回县",
  "value": "430524" },

{
  "label": "洞口县",
  "value": "430525" },

{
  "label": "绥宁县",
  "value": "430527" },

{
  "label": "新宁县",
  "value": "430528" },

{
  "label": "城步苗族自治县",
  "value": "430529" },

{
  "label": "武冈市",
  "value": "430581" }],


[{
  "label": "岳阳楼区",
  "value": "430602" },

{
  "label": "云溪区",
  "value": "430603" },

{
  "label": "君山区",
  "value": "430611" },

{
  "label": "岳阳县",
  "value": "430621" },

{
  "label": "华容县",
  "value": "430623" },

{
  "label": "湘阴县",
  "value": "430624" },

{
  "label": "平江县",
  "value": "430626" },

{
  "label": "岳阳市屈原管理区",
  "value": "430671" },

{
  "label": "汨罗市",
  "value": "430681" },

{
  "label": "临湘市",
  "value": "430682" }],


[{
  "label": "武陵区",
  "value": "430702" },

{
  "label": "鼎城区",
  "value": "430703" },

{
  "label": "安乡县",
  "value": "430721" },

{
  "label": "汉寿县",
  "value": "430722" },

{
  "label": "澧县",
  "value": "430723" },

{
  "label": "临澧县",
  "value": "430724" },

{
  "label": "桃源县",
  "value": "430725" },

{
  "label": "石门县",
  "value": "430726" },

{
  "label": "常德市西洞庭管理区",
  "value": "430771" },

{
  "label": "津市市",
  "value": "430781" }],


[{
  "label": "永定区",
  "value": "430802" },

{
  "label": "武陵源区",
  "value": "430811" },

{
  "label": "慈利县",
  "value": "430821" },

{
  "label": "桑植县",
  "value": "430822" }],


[{
  "label": "资阳区",
  "value": "430902" },

{
  "label": "赫山区",
  "value": "430903" },

{
  "label": "南县",
  "value": "430921" },

{
  "label": "桃江县",
  "value": "430922" },

{
  "label": "安化县",
  "value": "430923" },

{
  "label": "益阳市大通湖管理区",
  "value": "430971" },

{
  "label": "湖南益阳高新技术产业园区",
  "value": "430972" },

{
  "label": "沅江市",
  "value": "430981" }],


[{
  "label": "北湖区",
  "value": "431002" },

{
  "label": "苏仙区",
  "value": "431003" },

{
  "label": "桂阳县",
  "value": "431021" },

{
  "label": "宜章县",
  "value": "431022" },

{
  "label": "永兴县",
  "value": "431023" },

{
  "label": "嘉禾县",
  "value": "431024" },

{
  "label": "临武县",
  "value": "431025" },

{
  "label": "汝城县",
  "value": "431026" },

{
  "label": "桂东县",
  "value": "431027" },

{
  "label": "安仁县",
  "value": "431028" },

{
  "label": "资兴市",
  "value": "431081" }],


[{
  "label": "零陵区",
  "value": "431102" },

{
  "label": "冷水滩区",
  "value": "431103" },

{
  "label": "祁阳县",
  "value": "431121" },

{
  "label": "东安县",
  "value": "431122" },

{
  "label": "双牌县",
  "value": "431123" },

{
  "label": "道县",
  "value": "431124" },

{
  "label": "江永县",
  "value": "431125" },

{
  "label": "宁远县",
  "value": "431126" },

{
  "label": "蓝山县",
  "value": "431127" },

{
  "label": "新田县",
  "value": "431128" },

{
  "label": "江华瑶族自治县",
  "value": "431129" },

{
  "label": "永州经济技术开发区",
  "value": "431171" },

{
  "label": "永州市金洞管理区",
  "value": "431172" },

{
  "label": "永州市回龙圩管理区",
  "value": "431173" }],


[{
  "label": "鹤城区",
  "value": "431202" },

{
  "label": "中方县",
  "value": "431221" },

{
  "label": "沅陵县",
  "value": "431222" },

{
  "label": "辰溪县",
  "value": "431223" },

{
  "label": "溆浦县",
  "value": "431224" },

{
  "label": "会同县",
  "value": "431225" },

{
  "label": "麻阳苗族自治县",
  "value": "431226" },

{
  "label": "新晃侗族自治县",
  "value": "431227" },

{
  "label": "芷江侗族自治县",
  "value": "431228" },

{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },

{
  "label": "通道侗族自治县",
  "value": "431230" },

{
  "label": "怀化市洪江管理区",
  "value": "431271" },

{
  "label": "洪江市",
  "value": "431281" }],


[{
  "label": "娄星区",
  "value": "431302" },

{
  "label": "双峰县",
  "value": "431321" },

{
  "label": "新化县",
  "value": "431322" },

{
  "label": "冷水江市",
  "value": "431381" },

{
  "label": "涟源市",
  "value": "431382" }],


[{
  "label": "吉首市",
  "value": "433101" },

{
  "label": "泸溪县",
  "value": "433122" },

{
  "label": "凤凰县",
  "value": "433123" },

{
  "label": "花垣县",
  "value": "433124" },

{
  "label": "保靖县",
  "value": "433125" },

{
  "label": "古丈县",
  "value": "433126" },

{
  "label": "永顺县",
  "value": "433127" },

{
  "label": "龙山县",
  "value": "433130" },

{
  "label": "湖南吉首经济开发区",
  "value": "433172" },

{
  "label": "湖南永顺经济开发区",
  "value": "433173" }]],



[
[{
  "label": "荔湾区",
  "value": "440103" },

{
  "label": "越秀区",
  "value": "440104" },

{
  "label": "海珠区",
  "value": "440105" },

{
  "label": "天河区",
  "value": "440106" },

{
  "label": "白云区",
  "value": "440111" },

{
  "label": "黄埔区",
  "value": "440112" },

{
  "label": "番禺区",
  "value": "440113" },

{
  "label": "花都区",
  "value": "440114" },

{
  "label": "南沙区",
  "value": "440115" },

{
  "label": "从化区",
  "value": "440117" },

{
  "label": "增城区",
  "value": "440118" }],


[{
  "label": "武江区",
  "value": "440203" },

{
  "label": "浈江区",
  "value": "440204" },

{
  "label": "曲江区",
  "value": "440205" },

{
  "label": "始兴县",
  "value": "440222" },

{
  "label": "仁化县",
  "value": "440224" },

{
  "label": "翁源县",
  "value": "440229" },

{
  "label": "乳源瑶族自治县",
  "value": "440232" },

{
  "label": "新丰县",
  "value": "440233" },

{
  "label": "乐昌市",
  "value": "440281" },

{
  "label": "南雄市",
  "value": "440282" }],


[{
  "label": "罗湖区",
  "value": "440303" },

{
  "label": "福田区",
  "value": "440304" },

{
  "label": "南山区",
  "value": "440305" },

{
  "label": "宝安区",
  "value": "440306" },

{
  "label": "龙岗区",
  "value": "440307" },

{
  "label": "盐田区",
  "value": "440308" },

{
  "label": "龙华区",
  "value": "440309" },

{
  "label": "坪山区",
  "value": "440310" }],


[{
  "label": "香洲区",
  "value": "440402" },

{
  "label": "斗门区",
  "value": "440403" },

{
  "label": "金湾区",
  "value": "440404" }],


[{
  "label": "龙湖区",
  "value": "440507" },

{
  "label": "金平区",
  "value": "440511" },

{
  "label": "濠江区",
  "value": "440512" },

{
  "label": "潮阳区",
  "value": "440513" },

{
  "label": "潮南区",
  "value": "440514" },

{
  "label": "澄海区",
  "value": "440515" },

{
  "label": "南澳县",
  "value": "440523" }],


[{
  "label": "禅城区",
  "value": "440604" },

{
  "label": "南海区",
  "value": "440605" },

{
  "label": "顺德区",
  "value": "440606" },

{
  "label": "三水区",
  "value": "440607" },

{
  "label": "高明区",
  "value": "440608" }],


[{
  "label": "蓬江区",
  "value": "440703" },

{
  "label": "江海区",
  "value": "440704" },

{
  "label": "新会区",
  "value": "440705" },

{
  "label": "台山市",
  "value": "440781" },

{
  "label": "开平市",
  "value": "440783" },

{
  "label": "鹤山市",
  "value": "440784" },

{
  "label": "恩平市",
  "value": "440785" }],


[{
  "label": "赤坎区",
  "value": "440802" },

{
  "label": "霞山区",
  "value": "440803" },

{
  "label": "坡头区",
  "value": "440804" },

{
  "label": "麻章区",
  "value": "440811" },

{
  "label": "遂溪县",
  "value": "440823" },

{
  "label": "徐闻县",
  "value": "440825" },

{
  "label": "廉江市",
  "value": "440881" },

{
  "label": "雷州市",
  "value": "440882" },

{
  "label": "吴川市",
  "value": "440883" }],


[{
  "label": "茂南区",
  "value": "440902" },

{
  "label": "电白区",
  "value": "440904" },

{
  "label": "高州市",
  "value": "440981" },

{
  "label": "化州市",
  "value": "440982" },

{
  "label": "信宜市",
  "value": "440983" }],


[{
  "label": "端州区",
  "value": "441202" },

{
  "label": "鼎湖区",
  "value": "441203" },

{
  "label": "高要区",
  "value": "441204" },

{
  "label": "广宁县",
  "value": "441223" },

{
  "label": "怀集县",
  "value": "441224" },

{
  "label": "封开县",
  "value": "441225" },

{
  "label": "德庆县",
  "value": "441226" },

{
  "label": "四会市",
  "value": "441284" }],


[{
  "label": "惠城区",
  "value": "441302" },

{
  "label": "惠阳区",
  "value": "441303" },

{
  "label": "博罗县",
  "value": "441322" },

{
  "label": "惠东县",
  "value": "441323" },

{
  "label": "龙门县",
  "value": "441324" }],


[{
  "label": "梅江区",
  "value": "441402" },

{
  "label": "梅县区",
  "value": "441403" },

{
  "label": "大埔县",
  "value": "441422" },

{
  "label": "丰顺县",
  "value": "441423" },

{
  "label": "五华县",
  "value": "441424" },

{
  "label": "平远县",
  "value": "441426" },

{
  "label": "蕉岭县",
  "value": "441427" },

{
  "label": "兴宁市",
  "value": "441481" }],


[{
  "label": "城区",
  "value": "441502" },

{
  "label": "海丰县",
  "value": "441521" },

{
  "label": "陆河县",
  "value": "441523" },

{
  "label": "陆丰市",
  "value": "441581" }],


[{
  "label": "源城区",
  "value": "441602" },

{
  "label": "紫金县",
  "value": "441621" },

{
  "label": "龙川县",
  "value": "441622" },

{
  "label": "连平县",
  "value": "441623" },

{
  "label": "和平县",
  "value": "441624" },

{
  "label": "东源县",
  "value": "441625" }],


[{
  "label": "江城区",
  "value": "441702" },

{
  "label": "阳东区",
  "value": "441704" },

{
  "label": "阳西县",
  "value": "441721" },

{
  "label": "阳春市",
  "value": "441781" }],


[{
  "label": "清城区",
  "value": "441802" },

{
  "label": "清新区",
  "value": "441803" },

{
  "label": "佛冈县",
  "value": "441821" },

{
  "label": "阳山县",
  "value": "441823" },

{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },

{
  "label": "连南瑶族自治县",
  "value": "441826" },

{
  "label": "英德市",
  "value": "441881" },

{
  "label": "连州市",
  "value": "441882" }],


[{
  "label": "东莞市",
  "value": "441900" }],

[{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "湘桥区",
  "value": "445102" },

{
  "label": "潮安区",
  "value": "445103" },

{
  "label": "饶平县",
  "value": "445122" }],


[{
  "label": "榕城区",
  "value": "445202" },

{
  "label": "揭东区",
  "value": "445203" },

{
  "label": "揭西县",
  "value": "445222" },

{
  "label": "惠来县",
  "value": "445224" },

{
  "label": "普宁市",
  "value": "445281" }],


[{
  "label": "云城区",
  "value": "445302" },

{
  "label": "云安区",
  "value": "445303" },

{
  "label": "新兴县",
  "value": "445321" },

{
  "label": "郁南县",
  "value": "445322" },

{
  "label": "罗定市",
  "value": "445381" }]],



[
[{
  "label": "兴宁区",
  "value": "450102" },

{
  "label": "青秀区",
  "value": "450103" },

{
  "label": "江南区",
  "value": "450105" },

{
  "label": "西乡塘区",
  "value": "450107" },

{
  "label": "良庆区",
  "value": "450108" },

{
  "label": "邕宁区",
  "value": "450109" },

{
  "label": "武鸣区",
  "value": "450110" },

{
  "label": "隆安县",
  "value": "450123" },

{
  "label": "马山县",
  "value": "450124" },

{
  "label": "上林县",
  "value": "450125" },

{
  "label": "宾阳县",
  "value": "450126" },

{
  "label": "横县",
  "value": "450127" }],


[{
  "label": "城中区",
  "value": "450202" },

{
  "label": "鱼峰区",
  "value": "450203" },

{
  "label": "柳南区",
  "value": "450204" },

{
  "label": "柳北区",
  "value": "450205" },

{
  "label": "柳江区",
  "value": "450206" },

{
  "label": "柳城县",
  "value": "450222" },

{
  "label": "鹿寨县",
  "value": "450223" },

{
  "label": "融安县",
  "value": "450224" },

{
  "label": "融水苗族自治县",
  "value": "450225" },

{
  "label": "三江侗族自治县",
  "value": "450226" }],


[{
  "label": "秀峰区",
  "value": "450302" },

{
  "label": "叠彩区",
  "value": "450303" },

{
  "label": "象山区",
  "value": "450304" },

{
  "label": "七星区",
  "value": "450305" },

{
  "label": "雁山区",
  "value": "450311" },

{
  "label": "临桂区",
  "value": "450312" },

{
  "label": "阳朔县",
  "value": "450321" },

{
  "label": "灵川县",
  "value": "450323" },

{
  "label": "全州县",
  "value": "450324" },

{
  "label": "兴安县",
  "value": "450325" },

{
  "label": "永福县",
  "value": "450326" },

{
  "label": "灌阳县",
  "value": "450327" },

{
  "label": "龙胜各族自治县",
  "value": "450328" },

{
  "label": "资源县",
  "value": "450329" },

{
  "label": "平乐县",
  "value": "450330" },

{
  "label": "荔浦县",
  "value": "450331" },

{
  "label": "恭城瑶族自治县",
  "value": "450332" }],


[{
  "label": "万秀区",
  "value": "450403" },

{
  "label": "长洲区",
  "value": "450405" },

{
  "label": "龙圩区",
  "value": "450406" },

{
  "label": "苍梧县",
  "value": "450421" },

{
  "label": "藤县",
  "value": "450422" },

{
  "label": "蒙山县",
  "value": "450423" },

{
  "label": "岑溪市",
  "value": "450481" }],


[{
  "label": "海城区",
  "value": "450502" },

{
  "label": "银海区",
  "value": "450503" },

{
  "label": "铁山港区",
  "value": "450512" },

{
  "label": "合浦县",
  "value": "450521" }],


[{
  "label": "港口区",
  "value": "450602" },

{
  "label": "防城区",
  "value": "450603" },

{
  "label": "上思县",
  "value": "450621" },

{
  "label": "东兴市",
  "value": "450681" }],


[{
  "label": "钦南区",
  "value": "450702" },

{
  "label": "钦北区",
  "value": "450703" },

{
  "label": "灵山县",
  "value": "450721" },

{
  "label": "浦北县",
  "value": "450722" }],


[{
  "label": "港北区",
  "value": "450802" },

{
  "label": "港南区",
  "value": "450803" },

{
  "label": "覃塘区",
  "value": "450804" },

{
  "label": "平南县",
  "value": "450821" },

{
  "label": "桂平市",
  "value": "450881" }],


[{
  "label": "玉州区",
  "value": "450902" },

{
  "label": "福绵区",
  "value": "450903" },

{
  "label": "容县",
  "value": "450921" },

{
  "label": "陆川县",
  "value": "450922" },

{
  "label": "博白县",
  "value": "450923" },

{
  "label": "兴业县",
  "value": "450924" },

{
  "label": "北流市",
  "value": "450981" }],


[{
  "label": "右江区",
  "value": "451002" },

{
  "label": "田阳县",
  "value": "451021" },

{
  "label": "田东县",
  "value": "451022" },

{
  "label": "平果县",
  "value": "451023" },

{
  "label": "德保县",
  "value": "451024" },

{
  "label": "那坡县",
  "value": "451026" },

{
  "label": "凌云县",
  "value": "451027" },

{
  "label": "乐业县",
  "value": "451028" },

{
  "label": "田林县",
  "value": "451029" },

{
  "label": "西林县",
  "value": "451030" },

{
  "label": "隆林各族自治县",
  "value": "451031" },

{
  "label": "靖西市",
  "value": "451081" }],


[{
  "label": "八步区",
  "value": "451102" },

{
  "label": "平桂区",
  "value": "451103" },

{
  "label": "昭平县",
  "value": "451121" },

{
  "label": "钟山县",
  "value": "451122" },

{
  "label": "富川瑶族自治县",
  "value": "451123" }],


[{
  "label": "金城江区",
  "value": "451202" },

{
  "label": "宜州区",
  "value": "451203" },

{
  "label": "南丹县",
  "value": "451221" },

{
  "label": "天峨县",
  "value": "451222" },

{
  "label": "凤山县",
  "value": "451223" },

{
  "label": "东兰县",
  "value": "451224" },

{
  "label": "罗城仫佬族自治县",
  "value": "451225" },

{
  "label": "环江毛南族自治县",
  "value": "451226" },

{
  "label": "巴马瑶族自治县",
  "value": "451227" },

{
  "label": "都安瑶族自治县",
  "value": "451228" },

{
  "label": "大化瑶族自治县",
  "value": "451229" }],


[{
  "label": "兴宾区",
  "value": "451302" },

{
  "label": "忻城县",
  "value": "451321" },

{
  "label": "象州县",
  "value": "451322" },

{
  "label": "武宣县",
  "value": "451323" },

{
  "label": "金秀瑶族自治县",
  "value": "451324" },

{
  "label": "合山市",
  "value": "451381" }],


[{
  "label": "江州区",
  "value": "451402" },

{
  "label": "扶绥县",
  "value": "451421" },

{
  "label": "宁明县",
  "value": "451422" },

{
  "label": "龙州县",
  "value": "451423" },

{
  "label": "大新县",
  "value": "451424" },

{
  "label": "天等县",
  "value": "451425" },

{
  "label": "凭祥市",
  "value": "451481" }]],



[
[{
  "label": "秀英区",
  "value": "460105" },

{
  "label": "龙华区",
  "value": "460106" },

{
  "label": "琼山区",
  "value": "460107" },

{
  "label": "美兰区",
  "value": "460108" }],


[{
  "label": "海棠区",
  "value": "460202" },

{
  "label": "吉阳区",
  "value": "460203" },

{
  "label": "天涯区",
  "value": "460204" },

{
  "label": "崖州区",
  "value": "460205" }],


[{
  "label": "西沙群岛",
  "value": "460321" },

{
  "label": "南沙群岛",
  "value": "460322" },

{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" }],


[{
  "label": "儋州市",
  "value": "460400" }],

[{
  "label": "五指山市",
  "value": "469001" },

{
  "label": "琼海市",
  "value": "469002" },

{
  "label": "文昌市",
  "value": "469005" },

{
  "label": "万宁市",
  "value": "469006" },

{
  "label": "东方市",
  "value": "469007" },

{
  "label": "定安县",
  "value": "469021" },

{
  "label": "屯昌县",
  "value": "469022" },

{
  "label": "澄迈县",
  "value": "469023" },

{
  "label": "临高县",
  "value": "469024" },

{
  "label": "白沙黎族自治县",
  "value": "469025" },

{
  "label": "昌江黎族自治县",
  "value": "469026" },

{
  "label": "乐东黎族自治县",
  "value": "469027" },

{
  "label": "陵水黎族自治县",
  "value": "469028" },

{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },

{
  "label": "琼中黎族苗族自治县",
  "value": "469030" }]],



[
[{
  "label": "万州区",
  "value": "500101" },

{
  "label": "涪陵区",
  "value": "500102" },

{
  "label": "渝中区",
  "value": "500103" },

{
  "label": "大渡口区",
  "value": "500104" },

{
  "label": "江北区",
  "value": "500105" },

{
  "label": "沙坪坝区",
  "value": "500106" },

{
  "label": "九龙坡区",
  "value": "500107" },

{
  "label": "南岸区",
  "value": "500108" },

{
  "label": "北碚区",
  "value": "500109" },

{
  "label": "綦江区",
  "value": "500110" },

{
  "label": "大足区",
  "value": "500111" },

{
  "label": "渝北区",
  "value": "500112" },

{
  "label": "巴南区",
  "value": "500113" },

{
  "label": "黔江区",
  "value": "500114" },

{
  "label": "长寿区",
  "value": "500115" },

{
  "label": "江津区",
  "value": "500116" },

{
  "label": "合川区",
  "value": "500117" },

{
  "label": "永川区",
  "value": "500118" },

{
  "label": "南川区",
  "value": "500119" },

{
  "label": "璧山区",
  "value": "500120" },

{
  "label": "铜梁区",
  "value": "500151" },

{
  "label": "潼南区",
  "value": "500152" },

{
  "label": "荣昌区",
  "value": "500153" },

{
  "label": "开州区",
  "value": "500154" },

{
  "label": "梁平区",
  "value": "500155" },

{
  "label": "武隆区",
  "value": "500156" }],


[{
  "label": "城口县",
  "value": "500229" },

{
  "label": "丰都县",
  "value": "500230" },

{
  "label": "垫江县",
  "value": "500231" },

{
  "label": "忠县",
  "value": "500233" },

{
  "label": "云阳县",
  "value": "500235" },

{
  "label": "奉节县",
  "value": "500236" },

{
  "label": "巫山县",
  "value": "500237" },

{
  "label": "巫溪县",
  "value": "500238" },

{
  "label": "石柱土家族自治县",
  "value": "500240" },

{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },

{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },

{
  "label": "彭水苗族土家族自治县",
  "value": "500243" }]],



[
[{
  "label": "锦江区",
  "value": "510104" },

{
  "label": "青羊区",
  "value": "510105" },

{
  "label": "金牛区",
  "value": "510106" },

{
  "label": "武侯区",
  "value": "510107" },

{
  "label": "成华区",
  "value": "510108" },

{
  "label": "龙泉驿区",
  "value": "510112" },

{
  "label": "青白江区",
  "value": "510113" },

{
  "label": "新都区",
  "value": "510114" },

{
  "label": "温江区",
  "value": "510115" },

{
  "label": "双流区",
  "value": "510116" },

{
  "label": "郫都区",
  "value": "510117" },

{
  "label": "金堂县",
  "value": "510121" },

{
  "label": "大邑县",
  "value": "510129" },

{
  "label": "蒲江县",
  "value": "510131" },

{
  "label": "新津县",
  "value": "510132" },

{
  "label": "都江堰市",
  "value": "510181" },

{
  "label": "彭州市",
  "value": "510182" },

{
  "label": "邛崃市",
  "value": "510183" },

{
  "label": "崇州市",
  "value": "510184" },

{
  "label": "简阳市",
  "value": "510185" }],


[{
  "label": "自流井区",
  "value": "510302" },

{
  "label": "贡井区",
  "value": "510303" },

{
  "label": "大安区",
  "value": "510304" },

{
  "label": "沿滩区",
  "value": "510311" },

{
  "label": "荣县",
  "value": "510321" },

{
  "label": "富顺县",
  "value": "510322" }],


[{
  "label": "东区",
  "value": "510402" },

{
  "label": "西区",
  "value": "510403" },

{
  "label": "仁和区",
  "value": "510411" },

{
  "label": "米易县",
  "value": "510421" },

{
  "label": "盐边县",
  "value": "510422" }],


[{
  "label": "江阳区",
  "value": "510502" },

{
  "label": "纳溪区",
  "value": "510503" },

{
  "label": "龙马潭区",
  "value": "510504" },

{
  "label": "泸县",
  "value": "510521" },

{
  "label": "合江县",
  "value": "510522" },

{
  "label": "叙永县",
  "value": "510524" },

{
  "label": "古蔺县",
  "value": "510525" }],


[{
  "label": "旌阳区",
  "value": "510603" },

{
  "label": "罗江区",
  "value": "510604" },

{
  "label": "中江县",
  "value": "510623" },

{
  "label": "广汉市",
  "value": "510681" },

{
  "label": "什邡市",
  "value": "510682" },

{
  "label": "绵竹市",
  "value": "510683" }],


[{
  "label": "涪城区",
  "value": "510703" },

{
  "label": "游仙区",
  "value": "510704" },

{
  "label": "安州区",
  "value": "510705" },

{
  "label": "三台县",
  "value": "510722" },

{
  "label": "盐亭县",
  "value": "510723" },

{
  "label": "梓潼县",
  "value": "510725" },

{
  "label": "北川羌族自治县",
  "value": "510726" },

{
  "label": "平武县",
  "value": "510727" },

{
  "label": "江油市",
  "value": "510781" }],


[{
  "label": "利州区",
  "value": "510802" },

{
  "label": "昭化区",
  "value": "510811" },

{
  "label": "朝天区",
  "value": "510812" },

{
  "label": "旺苍县",
  "value": "510821" },

{
  "label": "青川县",
  "value": "510822" },

{
  "label": "剑阁县",
  "value": "510823" },

{
  "label": "苍溪县",
  "value": "510824" }],


[{
  "label": "船山区",
  "value": "510903" },

{
  "label": "安居区",
  "value": "510904" },

{
  "label": "蓬溪县",
  "value": "510921" },

{
  "label": "射洪县",
  "value": "510922" },

{
  "label": "大英县",
  "value": "510923" }],


[{
  "label": "市中区",
  "value": "511002" },

{
  "label": "东兴区",
  "value": "511011" },

{
  "label": "威远县",
  "value": "511024" },

{
  "label": "资中县",
  "value": "511025" },

{
  "label": "内江经济开发区",
  "value": "511071" },

{
  "label": "隆昌市",
  "value": "511083" }],


[{
  "label": "市中区",
  "value": "511102" },

{
  "label": "沙湾区",
  "value": "511111" },

{
  "label": "五通桥区",
  "value": "511112" },

{
  "label": "金口河区",
  "value": "511113" },

{
  "label": "犍为县",
  "value": "511123" },

{
  "label": "井研县",
  "value": "511124" },

{
  "label": "夹江县",
  "value": "511126" },

{
  "label": "沐川县",
  "value": "511129" },

{
  "label": "峨边彝族自治县",
  "value": "511132" },

{
  "label": "马边彝族自治县",
  "value": "511133" },

{
  "label": "峨眉山市",
  "value": "511181" }],


[{
  "label": "顺庆区",
  "value": "511302" },

{
  "label": "高坪区",
  "value": "511303" },

{
  "label": "嘉陵区",
  "value": "511304" },

{
  "label": "南部县",
  "value": "511321" },

{
  "label": "营山县",
  "value": "511322" },

{
  "label": "蓬安县",
  "value": "511323" },

{
  "label": "仪陇县",
  "value": "511324" },

{
  "label": "西充县",
  "value": "511325" },

{
  "label": "阆中市",
  "value": "511381" }],


[{
  "label": "东坡区",
  "value": "511402" },

{
  "label": "彭山区",
  "value": "511403" },

{
  "label": "仁寿县",
  "value": "511421" },

{
  "label": "洪雅县",
  "value": "511423" },

{
  "label": "丹棱县",
  "value": "511424" },

{
  "label": "青神县",
  "value": "511425" }],


[{
  "label": "翠屏区",
  "value": "511502" },

{
  "label": "南溪区",
  "value": "511503" },

{
  "label": "宜宾县",
  "value": "511521" },

{
  "label": "江安县",
  "value": "511523" },

{
  "label": "长宁县",
  "value": "511524" },

{
  "label": "高县",
  "value": "511525" },

{
  "label": "珙县",
  "value": "511526" },

{
  "label": "筠连县",
  "value": "511527" },

{
  "label": "兴文县",
  "value": "511528" },

{
  "label": "屏山县",
  "value": "511529" }],


[{
  "label": "广安区",
  "value": "511602" },

{
  "label": "前锋区",
  "value": "511603" },

{
  "label": "岳池县",
  "value": "511621" },

{
  "label": "武胜县",
  "value": "511622" },

{
  "label": "邻水县",
  "value": "511623" },

{
  "label": "华蓥市",
  "value": "511681" }],


[{
  "label": "通川区",
  "value": "511702" },

{
  "label": "达川区",
  "value": "511703" },

{
  "label": "宣汉县",
  "value": "511722" },

{
  "label": "开江县",
  "value": "511723" },

{
  "label": "大竹县",
  "value": "511724" },

{
  "label": "渠县",
  "value": "511725" },

{
  "label": "达州经济开发区",
  "value": "511771" },

{
  "label": "万源市",
  "value": "511781" }],


[{
  "label": "雨城区",
  "value": "511802" },

{
  "label": "名山区",
  "value": "511803" },

{
  "label": "荥经县",
  "value": "511822" },

{
  "label": "汉源县",
  "value": "511823" },

{
  "label": "石棉县",
  "value": "511824" },

{
  "label": "天全县",
  "value": "511825" },

{
  "label": "芦山县",
  "value": "511826" },

{
  "label": "宝兴县",
  "value": "511827" }],


[{
  "label": "巴州区",
  "value": "511902" },

{
  "label": "恩阳区",
  "value": "511903" },

{
  "label": "通江县",
  "value": "511921" },

{
  "label": "南江县",
  "value": "511922" },

{
  "label": "平昌县",
  "value": "511923" },

{
  "label": "巴中经济开发区",
  "value": "511971" }],


[{
  "label": "雁江区",
  "value": "512002" },

{
  "label": "安岳县",
  "value": "512021" },

{
  "label": "乐至县",
  "value": "512022" }],


[{
  "label": "马尔康市",
  "value": "513201" },

{
  "label": "汶川县",
  "value": "513221" },

{
  "label": "理县",
  "value": "513222" },

{
  "label": "茂县",
  "value": "513223" },

{
  "label": "松潘县",
  "value": "513224" },

{
  "label": "九寨沟县",
  "value": "513225" },

{
  "label": "金川县",
  "value": "513226" },

{
  "label": "小金县",
  "value": "513227" },

{
  "label": "黑水县",
  "value": "513228" },

{
  "label": "壤塘县",
  "value": "513230" },

{
  "label": "阿坝县",
  "value": "513231" },

{
  "label": "若尔盖县",
  "value": "513232" },

{
  "label": "红原县",
  "value": "513233" }],


[{
  "label": "康定市",
  "value": "513301" },

{
  "label": "泸定县",
  "value": "513322" },

{
  "label": "丹巴县",
  "value": "513323" },

{
  "label": "九龙县",
  "value": "513324" },

{
  "label": "雅江县",
  "value": "513325" },

{
  "label": "道孚县",
  "value": "513326" },

{
  "label": "炉霍县",
  "value": "513327" },

{
  "label": "甘孜县",
  "value": "513328" },

{
  "label": "新龙县",
  "value": "513329" },

{
  "label": "德格县",
  "value": "513330" },

{
  "label": "白玉县",
  "value": "513331" },

{
  "label": "石渠县",
  "value": "513332" },

{
  "label": "色达县",
  "value": "513333" },

{
  "label": "理塘县",
  "value": "513334" },

{
  "label": "巴塘县",
  "value": "513335" },

{
  "label": "乡城县",
  "value": "513336" },

{
  "label": "稻城县",
  "value": "513337" },

{
  "label": "得荣县",
  "value": "513338" }],


[{
  "label": "西昌市",
  "value": "513401" },

{
  "label": "木里藏族自治县",
  "value": "513422" },

{
  "label": "盐源县",
  "value": "513423" },

{
  "label": "德昌县",
  "value": "513424" },

{
  "label": "会理县",
  "value": "513425" },

{
  "label": "会东县",
  "value": "513426" },

{
  "label": "宁南县",
  "value": "513427" },

{
  "label": "普格县",
  "value": "513428" },

{
  "label": "布拖县",
  "value": "513429" },

{
  "label": "金阳县",
  "value": "513430" },

{
  "label": "昭觉县",
  "value": "513431" },

{
  "label": "喜德县",
  "value": "513432" },

{
  "label": "冕宁县",
  "value": "513433" },

{
  "label": "越西县",
  "value": "513434" },

{
  "label": "甘洛县",
  "value": "513435" },

{
  "label": "美姑县",
  "value": "513436" },

{
  "label": "雷波县",
  "value": "513437" }]],



[
[{
  "label": "南明区",
  "value": "520102" },

{
  "label": "云岩区",
  "value": "520103" },

{
  "label": "花溪区",
  "value": "520111" },

{
  "label": "乌当区",
  "value": "520112" },

{
  "label": "白云区",
  "value": "520113" },

{
  "label": "观山湖区",
  "value": "520115" },

{
  "label": "开阳县",
  "value": "520121" },

{
  "label": "息烽县",
  "value": "520122" },

{
  "label": "修文县",
  "value": "520123" },

{
  "label": "清镇市",
  "value": "520181" }],


[{
  "label": "钟山区",
  "value": "520201" },

{
  "label": "六枝特区",
  "value": "520203" },

{
  "label": "水城县",
  "value": "520221" },

{
  "label": "盘州市",
  "value": "520281" }],


[{
  "label": "红花岗区",
  "value": "520302" },

{
  "label": "汇川区",
  "value": "520303" },

{
  "label": "播州区",
  "value": "520304" },

{
  "label": "桐梓县",
  "value": "520322" },

{
  "label": "绥阳县",
  "value": "520323" },

{
  "label": "正安县",
  "value": "520324" },

{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" },

{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },

{
  "label": "凤冈县",
  "value": "520327" },

{
  "label": "湄潭县",
  "value": "520328" },

{
  "label": "余庆县",
  "value": "520329" },

{
  "label": "习水县",
  "value": "520330" },

{
  "label": "赤水市",
  "value": "520381" },

{
  "label": "仁怀市",
  "value": "520382" }],


[{
  "label": "西秀区",
  "value": "520402" },

{
  "label": "平坝区",
  "value": "520403" },

{
  "label": "普定县",
  "value": "520422" },

{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },

{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },

{
  "label": "紫云苗族布依族自治县",
  "value": "520425" }],


[{
  "label": "七星关区",
  "value": "520502" },

{
  "label": "大方县",
  "value": "520521" },

{
  "label": "黔西县",
  "value": "520522" },

{
  "label": "金沙县",
  "value": "520523" },

{
  "label": "织金县",
  "value": "520524" },

{
  "label": "纳雍县",
  "value": "520525" },

{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" },

{
  "label": "赫章县",
  "value": "520527" }],


[{
  "label": "碧江区",
  "value": "520602" },

{
  "label": "万山区",
  "value": "520603" },

{
  "label": "江口县",
  "value": "520621" },

{
  "label": "玉屏侗族自治县",
  "value": "520622" },

{
  "label": "石阡县",
  "value": "520623" },

{
  "label": "思南县",
  "value": "520624" },

{
  "label": "印江土家族苗族自治县",
  "value": "520625" },

{
  "label": "德江县",
  "value": "520626" },

{
  "label": "沿河土家族自治县",
  "value": "520627" },

{
  "label": "松桃苗族自治县",
  "value": "520628" }],


[{
  "label": "兴义市",
  "value": "522301" },

{
  "label": "兴仁县",
  "value": "522322" },

{
  "label": "普安县",
  "value": "522323" },

{
  "label": "晴隆县",
  "value": "522324" },

{
  "label": "贞丰县",
  "value": "522325" },

{
  "label": "望谟县",
  "value": "522326" },

{
  "label": "册亨县",
  "value": "522327" },

{
  "label": "安龙县",
  "value": "522328" }],


[{
  "label": "凯里市",
  "value": "522601" },

{
  "label": "黄平县",
  "value": "522622" },

{
  "label": "施秉县",
  "value": "522623" },

{
  "label": "三穗县",
  "value": "522624" },

{
  "label": "镇远县",
  "value": "522625" },

{
  "label": "岑巩县",
  "value": "522626" },

{
  "label": "天柱县",
  "value": "522627" },

{
  "label": "锦屏县",
  "value": "522628" },

{
  "label": "剑河县",
  "value": "522629" },

{
  "label": "台江县",
  "value": "522630" },

{
  "label": "黎平县",
  "value": "522631" },

{
  "label": "榕江县",
  "value": "522632" },

{
  "label": "从江县",
  "value": "522633" },

{
  "label": "雷山县",
  "value": "522634" },

{
  "label": "麻江县",
  "value": "522635" },

{
  "label": "丹寨县",
  "value": "522636" }],


[{
  "label": "都匀市",
  "value": "522701" },

{
  "label": "福泉市",
  "value": "522702" },

{
  "label": "荔波县",
  "value": "522722" },

{
  "label": "贵定县",
  "value": "522723" },

{
  "label": "瓮安县",
  "value": "522725" },

{
  "label": "独山县",
  "value": "522726" },

{
  "label": "平塘县",
  "value": "522727" },

{
  "label": "罗甸县",
  "value": "522728" },

{
  "label": "长顺县",
  "value": "522729" },

{
  "label": "龙里县",
  "value": "522730" },

{
  "label": "惠水县",
  "value": "522731" },

{
  "label": "三都水族自治县",
  "value": "522732" }]],



[
[{
  "label": "五华区",
  "value": "530102" },

{
  "label": "盘龙区",
  "value": "530103" },

{
  "label": "官渡区",
  "value": "530111" },

{
  "label": "西山区",
  "value": "530112" },

{
  "label": "东川区",
  "value": "530113" },

{
  "label": "呈贡区",
  "value": "530114" },

{
  "label": "晋宁区",
  "value": "530115" },

{
  "label": "富民县",
  "value": "530124" },

{
  "label": "宜良县",
  "value": "530125" },

{
  "label": "石林彝族自治县",
  "value": "530126" },

{
  "label": "嵩明县",
  "value": "530127" },

{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },

{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },

{
  "label": "安宁市",
  "value": "530181" }],


[{
  "label": "麒麟区",
  "value": "530302" },

{
  "label": "沾益区",
  "value": "530303" },

{
  "label": "马龙县",
  "value": "530321" },

{
  "label": "陆良县",
  "value": "530322" },

{
  "label": "师宗县",
  "value": "530323" },

{
  "label": "罗平县",
  "value": "530324" },

{
  "label": "富源县",
  "value": "530325" },

{
  "label": "会泽县",
  "value": "530326" },

{
  "label": "宣威市",
  "value": "530381" }],


[{
  "label": "红塔区",
  "value": "530402" },

{
  "label": "江川区",
  "value": "530403" },

{
  "label": "澄江县",
  "value": "530422" },

{
  "label": "通海县",
  "value": "530423" },

{
  "label": "华宁县",
  "value": "530424" },

{
  "label": "易门县",
  "value": "530425" },

{
  "label": "峨山彝族自治县",
  "value": "530426" },

{
  "label": "新平彝族傣族自治县",
  "value": "530427" },

{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],


[{
  "label": "隆阳区",
  "value": "530502" },

{
  "label": "施甸县",
  "value": "530521" },

{
  "label": "龙陵县",
  "value": "530523" },

{
  "label": "昌宁县",
  "value": "530524" },

{
  "label": "腾冲市",
  "value": "530581" }],


[{
  "label": "昭阳区",
  "value": "530602" },

{
  "label": "鲁甸县",
  "value": "530621" },

{
  "label": "巧家县",
  "value": "530622" },

{
  "label": "盐津县",
  "value": "530623" },

{
  "label": "大关县",
  "value": "530624" },

{
  "label": "永善县",
  "value": "530625" },

{
  "label": "绥江县",
  "value": "530626" },

{
  "label": "镇雄县",
  "value": "530627" },

{
  "label": "彝良县",
  "value": "530628" },

{
  "label": "威信县",
  "value": "530629" },

{
  "label": "水富县",
  "value": "530630" }],


[{
  "label": "古城区",
  "value": "530702" },

{
  "label": "玉龙纳西族自治县",
  "value": "530721" },

{
  "label": "永胜县",
  "value": "530722" },

{
  "label": "华坪县",
  "value": "530723" },

{
  "label": "宁蒗彝族自治县",
  "value": "530724" }],


[{
  "label": "思茅区",
  "value": "530802" },

{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },

{
  "label": "墨江哈尼族自治县",
  "value": "530822" },

{
  "label": "景东彝族自治县",
  "value": "530823" },

{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },

{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },

{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" },

{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },

{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },

{
  "label": "西盟佤族自治县",
  "value": "530829" }],


[{
  "label": "临翔区",
  "value": "530902" },

{
  "label": "凤庆县",
  "value": "530921" },

{
  "label": "云县",
  "value": "530922" },

{
  "label": "永德县",
  "value": "530923" },

{
  "label": "镇康县",
  "value": "530924" },

{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },

{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },

{
  "label": "沧源佤族自治县",
  "value": "530927" }],


[{
  "label": "楚雄市",
  "value": "532301" },

{
  "label": "双柏县",
  "value": "532322" },

{
  "label": "牟定县",
  "value": "532323" },

{
  "label": "南华县",
  "value": "532324" },

{
  "label": "姚安县",
  "value": "532325" },

{
  "label": "大姚县",
  "value": "532326" },

{
  "label": "永仁县",
  "value": "532327" },

{
  "label": "元谋县",
  "value": "532328" },

{
  "label": "武定县",
  "value": "532329" },

{
  "label": "禄丰县",
  "value": "532331" }],


[{
  "label": "个旧市",
  "value": "532501" },

{
  "label": "开远市",
  "value": "532502" },

{
  "label": "蒙自市",
  "value": "532503" },

{
  "label": "弥勒市",
  "value": "532504" },

{
  "label": "屏边苗族自治县",
  "value": "532523" },

{
  "label": "建水县",
  "value": "532524" },

{
  "label": "石屏县",
  "value": "532525" },

{
  "label": "泸西县",
  "value": "532527" },

{
  "label": "元阳县",
  "value": "532528" },

{
  "label": "红河县",
  "value": "532529" },

{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },

{
  "label": "绿春县",
  "value": "532531" },

{
  "label": "河口瑶族自治县",
  "value": "532532" }],


[{
  "label": "文山市",
  "value": "532601" },

{
  "label": "砚山县",
  "value": "532622" },

{
  "label": "西畴县",
  "value": "532623" },

{
  "label": "麻栗坡县",
  "value": "532624" },

{
  "label": "马关县",
  "value": "532625" },

{
  "label": "丘北县",
  "value": "532626" },

{
  "label": "广南县",
  "value": "532627" },

{
  "label": "富宁县",
  "value": "532628" }],


[{
  "label": "景洪市",
  "value": "532801" },

{
  "label": "勐海县",
  "value": "532822" },

{
  "label": "勐腊县",
  "value": "532823" }],


[{
  "label": "大理市",
  "value": "532901" },

{
  "label": "漾濞彝族自治县",
  "value": "532922" },

{
  "label": "祥云县",
  "value": "532923" },

{
  "label": "宾川县",
  "value": "532924" },

{
  "label": "弥渡县",
  "value": "532925" },

{
  "label": "南涧彝族自治县",
  "value": "532926" },

{
  "label": "巍山彝族回族自治县",
  "value": "532927" },

{
  "label": "永平县",
  "value": "532928" },

{
  "label": "云龙县",
  "value": "532929" },

{
  "label": "洱源县",
  "value": "532930" },

{
  "label": "剑川县",
  "value": "532931" },

{
  "label": "鹤庆县",
  "value": "532932" }],


[{
  "label": "瑞丽市",
  "value": "533102" },

{
  "label": "芒市",
  "value": "533103" },

{
  "label": "梁河县",
  "value": "533122" },

{
  "label": "盈江县",
  "value": "533123" },

{
  "label": "陇川县",
  "value": "533124" }],


[{
  "label": "泸水市",
  "value": "533301" },

{
  "label": "福贡县",
  "value": "533323" },

{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },

{
  "label": "兰坪白族普米族自治县",
  "value": "533325" }],


[{
  "label": "香格里拉市",
  "value": "533401" },

{
  "label": "德钦县",
  "value": "533422" },

{
  "label": "维西傈僳族自治县",
  "value": "533423" }]],



[
[{
  "label": "城关区",
  "value": "540102" },

{
  "label": "堆龙德庆区",
  "value": "540103" },

{
  "label": "林周县",
  "value": "540121" },

{
  "label": "当雄县",
  "value": "540122" },

{
  "label": "尼木县",
  "value": "540123" },

{
  "label": "曲水县",
  "value": "540124" },

{
  "label": "达孜县",
  "value": "540126" },

{
  "label": "墨竹工卡县",
  "value": "540127" },

{
  "label": "格尔木藏青工业园区",
  "value": "540171" },

{
  "label": "拉萨经济技术开发区",
  "value": "540172" },

{
  "label": "西藏文化旅游创意园区",
  "value": "540173" },

{
  "label": "达孜工业园区",
  "value": "540174" }],


[{
  "label": "桑珠孜区",
  "value": "540202" },

{
  "label": "南木林县",
  "value": "540221" },

{
  "label": "江孜县",
  "value": "540222" },

{
  "label": "定日县",
  "value": "540223" },

{
  "label": "萨迦县",
  "value": "540224" },

{
  "label": "拉孜县",
  "value": "540225" },

{
  "label": "昂仁县",
  "value": "540226" },

{
  "label": "谢通门县",
  "value": "540227" },

{
  "label": "白朗县",
  "value": "540228" },

{
  "label": "仁布县",
  "value": "540229" },

{
  "label": "康马县",
  "value": "540230" },

{
  "label": "定结县",
  "value": "540231" },

{
  "label": "仲巴县",
  "value": "540232" },

{
  "label": "亚东县",
  "value": "540233" },

{
  "label": "吉隆县",
  "value": "540234" },

{
  "label": "聂拉木县",
  "value": "540235" },

{
  "label": "萨嘎县",
  "value": "540236" },

{
  "label": "岗巴县",
  "value": "540237" }],


[{
  "label": "卡若区",
  "value": "540302" },

{
  "label": "江达县",
  "value": "540321" },

{
  "label": "贡觉县",
  "value": "540322" },

{
  "label": "类乌齐县",
  "value": "540323" },

{
  "label": "丁青县",
  "value": "540324" },

{
  "label": "察雅县",
  "value": "540325" },

{
  "label": "八宿县",
  "value": "540326" },

{
  "label": "左贡县",
  "value": "540327" },

{
  "label": "芒康县",
  "value": "540328" },

{
  "label": "洛隆县",
  "value": "540329" },

{
  "label": "边坝县",
  "value": "540330" }],


[{
  "label": "巴宜区",
  "value": "540402" },

{
  "label": "工布江达县",
  "value": "540421" },

{
  "label": "米林县",
  "value": "540422" },

{
  "label": "墨脱县",
  "value": "540423" },

{
  "label": "波密县",
  "value": "540424" },

{
  "label": "察隅县",
  "value": "540425" },

{
  "label": "朗县",
  "value": "540426" }],


[{
  "label": "乃东区",
  "value": "540502" },

{
  "label": "扎囊县",
  "value": "540521" },

{
  "label": "贡嘎县",
  "value": "540522" },

{
  "label": "桑日县",
  "value": "540523" },

{
  "label": "琼结县",
  "value": "540524" },

{
  "label": "曲松县",
  "value": "540525" },

{
  "label": "措美县",
  "value": "540526" },

{
  "label": "洛扎县",
  "value": "540527" },

{
  "label": "加查县",
  "value": "540528" },

{
  "label": "隆子县",
  "value": "540529" },

{
  "label": "错那县",
  "value": "540530" },

{
  "label": "浪卡子县",
  "value": "540531" }],


[{
  "label": "那曲县",
  "value": "542421" },

{
  "label": "嘉黎县",
  "value": "542422" },

{
  "label": "比如县",
  "value": "542423" },

{
  "label": "聂荣县",
  "value": "542424" },

{
  "label": "安多县",
  "value": "542425" },

{
  "label": "申扎县",
  "value": "542426" },

{
  "label": "索县",
  "value": "542427" },

{
  "label": "班戈县",
  "value": "542428" },

{
  "label": "巴青县",
  "value": "542429" },

{
  "label": "尼玛县",
  "value": "542430" },

{
  "label": "双湖县",
  "value": "542431" }],


[{
  "label": "普兰县",
  "value": "542521" },

{
  "label": "札达县",
  "value": "542522" },

{
  "label": "噶尔县",
  "value": "542523" },

{
  "label": "日土县",
  "value": "542524" },

{
  "label": "革吉县",
  "value": "542525" },

{
  "label": "改则县",
  "value": "542526" },

{
  "label": "措勤县",
  "value": "542527" }]],



[
[{
  "label": "新城区",
  "value": "610102" },

{
  "label": "碑林区",
  "value": "610103" },

{
  "label": "莲湖区",
  "value": "610104" },

{
  "label": "灞桥区",
  "value": "610111" },

{
  "label": "未央区",
  "value": "610112" },

{
  "label": "雁塔区",
  "value": "610113" },

{
  "label": "阎良区",
  "value": "610114" },

{
  "label": "临潼区",
  "value": "610115" },

{
  "label": "长安区",
  "value": "610116" },

{
  "label": "高陵区",
  "value": "610117" },

{
  "label": "鄠邑区",
  "value": "610118" },

{
  "label": "蓝田县",
  "value": "610122" },

{
  "label": "周至县",
  "value": "610124" }],


[{
  "label": "王益区",
  "value": "610202" },

{
  "label": "印台区",
  "value": "610203" },

{
  "label": "耀州区",
  "value": "610204" },

{
  "label": "宜君县",
  "value": "610222" }],


[{
  "label": "渭滨区",
  "value": "610302" },

{
  "label": "金台区",
  "value": "610303" },

{
  "label": "陈仓区",
  "value": "610304" },

{
  "label": "凤翔县",
  "value": "610322" },

{
  "label": "岐山县",
  "value": "610323" },

{
  "label": "扶风县",
  "value": "610324" },

{
  "label": "眉县",
  "value": "610326" },

{
  "label": "陇县",
  "value": "610327" },

{
  "label": "千阳县",
  "value": "610328" },

{
  "label": "麟游县",
  "value": "610329" },

{
  "label": "凤县",
  "value": "610330" },

{
  "label": "太白县",
  "value": "610331" }],


[{
  "label": "秦都区",
  "value": "610402" },

{
  "label": "杨陵区",
  "value": "610403" },

{
  "label": "渭城区",
  "value": "610404" },

{
  "label": "三原县",
  "value": "610422" },

{
  "label": "泾阳县",
  "value": "610423" },

{
  "label": "乾县",
  "value": "610424" },

{
  "label": "礼泉县",
  "value": "610425" },

{
  "label": "永寿县",
  "value": "610426" },

{
  "label": "彬县",
  "value": "610427" },

{
  "label": "长武县",
  "value": "610428" },

{
  "label": "旬邑县",
  "value": "610429" },

{
  "label": "淳化县",
  "value": "610430" },

{
  "label": "武功县",
  "value": "610431" },

{
  "label": "兴平市",
  "value": "610481" }],


[{
  "label": "临渭区",
  "value": "610502" },

{
  "label": "华州区",
  "value": "610503" },

{
  "label": "潼关县",
  "value": "610522" },

{
  "label": "大荔县",
  "value": "610523" },

{
  "label": "合阳县",
  "value": "610524" },

{
  "label": "澄城县",
  "value": "610525" },

{
  "label": "蒲城县",
  "value": "610526" },

{
  "label": "白水县",
  "value": "610527" },

{
  "label": "富平县",
  "value": "610528" },

{
  "label": "韩城市",
  "value": "610581" },

{
  "label": "华阴市",
  "value": "610582" }],


[{
  "label": "宝塔区",
  "value": "610602" },

{
  "label": "安塞区",
  "value": "610603" },

{
  "label": "延长县",
  "value": "610621" },

{
  "label": "延川县",
  "value": "610622" },

{
  "label": "子长县",
  "value": "610623" },

{
  "label": "志丹县",
  "value": "610625" },

{
  "label": "吴起县",
  "value": "610626" },

{
  "label": "甘泉县",
  "value": "610627" },

{
  "label": "富县",
  "value": "610628" },

{
  "label": "洛川县",
  "value": "610629" },

{
  "label": "宜川县",
  "value": "610630" },

{
  "label": "黄龙县",
  "value": "610631" },

{
  "label": "黄陵县",
  "value": "610632" }],


[{
  "label": "汉台区",
  "value": "610702" },

{
  "label": "南郑区",
  "value": "610703" },

{
  "label": "城固县",
  "value": "610722" },

{
  "label": "洋县",
  "value": "610723" },

{
  "label": "西乡县",
  "value": "610724" },

{
  "label": "勉县",
  "value": "610725" },

{
  "label": "宁强县",
  "value": "610726" },

{
  "label": "略阳县",
  "value": "610727" },

{
  "label": "镇巴县",
  "value": "610728" },

{
  "label": "留坝县",
  "value": "610729" },

{
  "label": "佛坪县",
  "value": "610730" }],


[{
  "label": "榆阳区",
  "value": "610802" },

{
  "label": "横山区",
  "value": "610803" },

{
  "label": "府谷县",
  "value": "610822" },

{
  "label": "靖边县",
  "value": "610824" },

{
  "label": "定边县",
  "value": "610825" },

{
  "label": "绥德县",
  "value": "610826" },

{
  "label": "米脂县",
  "value": "610827" },

{
  "label": "佳县",
  "value": "610828" },

{
  "label": "吴堡县",
  "value": "610829" },

{
  "label": "清涧县",
  "value": "610830" },

{
  "label": "子洲县",
  "value": "610831" },

{
  "label": "神木市",
  "value": "610881" }],


[{
  "label": "汉滨区",
  "value": "610902" },

{
  "label": "汉阴县",
  "value": "610921" },

{
  "label": "石泉县",
  "value": "610922" },

{
  "label": "宁陕县",
  "value": "610923" },

{
  "label": "紫阳县",
  "value": "610924" },

{
  "label": "岚皋县",
  "value": "610925" },

{
  "label": "平利县",
  "value": "610926" },

{
  "label": "镇坪县",
  "value": "610927" },

{
  "label": "旬阳县",
  "value": "610928" },

{
  "label": "白河县",
  "value": "610929" }],


[{
  "label": "商州区",
  "value": "611002" },

{
  "label": "洛南县",
  "value": "611021" },

{
  "label": "丹凤县",
  "value": "611022" },

{
  "label": "商南县",
  "value": "611023" },

{
  "label": "山阳县",
  "value": "611024" },

{
  "label": "镇安县",
  "value": "611025" },

{
  "label": "柞水县",
  "value": "611026" }]],



[
[{
  "label": "城关区",
  "value": "620102" },

{
  "label": "七里河区",
  "value": "620103" },

{
  "label": "西固区",
  "value": "620104" },

{
  "label": "安宁区",
  "value": "620105" },

{
  "label": "红古区",
  "value": "620111" },

{
  "label": "永登县",
  "value": "620121" },

{
  "label": "皋兰县",
  "value": "620122" },

{
  "label": "榆中县",
  "value": "620123" },

{
  "label": "兰州新区",
  "value": "620171" }],


[{
  "label": "嘉峪关市",
  "value": "620201" }],

[{
  "label": "金川区",
  "value": "620302" },

{
  "label": "永昌县",
  "value": "620321" }],


[{
  "label": "白银区",
  "value": "620402" },

{
  "label": "平川区",
  "value": "620403" },

{
  "label": "靖远县",
  "value": "620421" },

{
  "label": "会宁县",
  "value": "620422" },

{
  "label": "景泰县",
  "value": "620423" }],


[{
  "label": "秦州区",
  "value": "620502" },

{
  "label": "麦积区",
  "value": "620503" },

{
  "label": "清水县",
  "value": "620521" },

{
  "label": "秦安县",
  "value": "620522" },

{
  "label": "甘谷县",
  "value": "620523" },

{
  "label": "武山县",
  "value": "620524" },

{
  "label": "张家川回族自治县",
  "value": "620525" }],


[{
  "label": "凉州区",
  "value": "620602" },

{
  "label": "民勤县",
  "value": "620621" },

{
  "label": "古浪县",
  "value": "620622" },

{
  "label": "天祝藏族自治县",
  "value": "620623" }],


[{
  "label": "甘州区",
  "value": "620702" },

{
  "label": "肃南裕固族自治县",
  "value": "620721" },

{
  "label": "民乐县",
  "value": "620722" },

{
  "label": "临泽县",
  "value": "620723" },

{
  "label": "高台县",
  "value": "620724" },

{
  "label": "山丹县",
  "value": "620725" }],


[{
  "label": "崆峒区",
  "value": "620802" },

{
  "label": "泾川县",
  "value": "620821" },

{
  "label": "灵台县",
  "value": "620822" },

{
  "label": "崇信县",
  "value": "620823" },

{
  "label": "华亭县",
  "value": "620824" },

{
  "label": "庄浪县",
  "value": "620825" },

{
  "label": "静宁县",
  "value": "620826" },

{
  "label": "平凉工业园区",
  "value": "620871" }],


[{
  "label": "肃州区",
  "value": "620902" },

{
  "label": "金塔县",
  "value": "620921" },

{
  "label": "瓜州县",
  "value": "620922" },

{
  "label": "肃北蒙古族自治县",
  "value": "620923" },

{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" },

{
  "label": "玉门市",
  "value": "620981" },

{
  "label": "敦煌市",
  "value": "620982" }],


[{
  "label": "西峰区",
  "value": "621002" },

{
  "label": "庆城县",
  "value": "621021" },

{
  "label": "环县",
  "value": "621022" },

{
  "label": "华池县",
  "value": "621023" },

{
  "label": "合水县",
  "value": "621024" },

{
  "label": "正宁县",
  "value": "621025" },

{
  "label": "宁县",
  "value": "621026" },

{
  "label": "镇原县",
  "value": "621027" }],


[{
  "label": "安定区",
  "value": "621102" },

{
  "label": "通渭县",
  "value": "621121" },

{
  "label": "陇西县",
  "value": "621122" },

{
  "label": "渭源县",
  "value": "621123" },

{
  "label": "临洮县",
  "value": "621124" },

{
  "label": "漳县",
  "value": "621125" },

{
  "label": "岷县",
  "value": "621126" }],


[{
  "label": "武都区",
  "value": "621202" },

{
  "label": "成县",
  "value": "621221" },

{
  "label": "文县",
  "value": "621222" },

{
  "label": "宕昌县",
  "value": "621223" },

{
  "label": "康县",
  "value": "621224" },

{
  "label": "西和县",
  "value": "621225" },

{
  "label": "礼县",
  "value": "621226" },

{
  "label": "徽县",
  "value": "621227" },

{
  "label": "两当县",
  "value": "621228" }],


[{
  "label": "临夏市",
  "value": "622901" },

{
  "label": "临夏县",
  "value": "622921" },

{
  "label": "康乐县",
  "value": "622922" },

{
  "label": "永靖县",
  "value": "622923" },

{
  "label": "广河县",
  "value": "622924" },

{
  "label": "和政县",
  "value": "622925" },

{
  "label": "东乡族自治县",
  "value": "622926" },

{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" }],


[{
  "label": "合作市",
  "value": "623001" },

{
  "label": "临潭县",
  "value": "623021" },

{
  "label": "卓尼县",
  "value": "623022" },

{
  "label": "舟曲县",
  "value": "623023" },

{
  "label": "迭部县",
  "value": "623024" },

{
  "label": "玛曲县",
  "value": "623025" },

{
  "label": "碌曲县",
  "value": "623026" },

{
  "label": "夏河县",
  "value": "623027" }]],



[
[{
  "label": "城东区",
  "value": "630102" },

{
  "label": "城中区",
  "value": "630103" },

{
  "label": "城西区",
  "value": "630104" },

{
  "label": "城北区",
  "value": "630105" },

{
  "label": "大通回族土族自治县",
  "value": "630121" },

{
  "label": "湟中县",
  "value": "630122" },

{
  "label": "湟源县",
  "value": "630123" }],


[{
  "label": "乐都区",
  "value": "630202" },

{
  "label": "平安区",
  "value": "630203" },

{
  "label": "民和回族土族自治县",
  "value": "630222" },

{
  "label": "互助土族自治县",
  "value": "630223" },

{
  "label": "化隆回族自治县",
  "value": "630224" },

{
  "label": "循化撒拉族自治县",
  "value": "630225" }],


[{
  "label": "门源回族自治县",
  "value": "632221" },

{
  "label": "祁连县",
  "value": "632222" },

{
  "label": "海晏县",
  "value": "632223" },

{
  "label": "刚察县",
  "value": "632224" }],


[{
  "label": "同仁县",
  "value": "632321" },

{
  "label": "尖扎县",
  "value": "632322" },

{
  "label": "泽库县",
  "value": "632323" },

{
  "label": "河南蒙古族自治县",
  "value": "632324" }],


[{
  "label": "共和县",
  "value": "632521" },

{
  "label": "同德县",
  "value": "632522" },

{
  "label": "贵德县",
  "value": "632523" },

{
  "label": "兴海县",
  "value": "632524" },

{
  "label": "贵南县",
  "value": "632525" }],


[{
  "label": "玛沁县",
  "value": "632621" },

{
  "label": "班玛县",
  "value": "632622" },

{
  "label": "甘德县",
  "value": "632623" },

{
  "label": "达日县",
  "value": "632624" },

{
  "label": "久治县",
  "value": "632625" },

{
  "label": "玛多县",
  "value": "632626" }],


[{
  "label": "玉树市",
  "value": "632701" },

{
  "label": "杂多县",
  "value": "632722" },

{
  "label": "称多县",
  "value": "632723" },

{
  "label": "治多县",
  "value": "632724" },

{
  "label": "囊谦县",
  "value": "632725" },

{
  "label": "曲麻莱县",
  "value": "632726" }],


[{
  "label": "格尔木市",
  "value": "632801" },

{
  "label": "德令哈市",
  "value": "632802" },

{
  "label": "乌兰县",
  "value": "632821" },

{
  "label": "都兰县",
  "value": "632822" },

{
  "label": "天峻县",
  "value": "632823" },

{
  "label": "大柴旦行政委员会",
  "value": "632857" },

{
  "label": "冷湖行政委员会",
  "value": "632858" },

{
  "label": "茫崖行政委员会",
  "value": "632859" }]],



[
[{
  "label": "兴庆区",
  "value": "640104" },

{
  "label": "西夏区",
  "value": "640105" },

{
  "label": "金凤区",
  "value": "640106" },

{
  "label": "永宁县",
  "value": "640121" },

{
  "label": "贺兰县",
  "value": "640122" },

{
  "label": "灵武市",
  "value": "640181" }],


[{
  "label": "大武口区",
  "value": "640202" },

{
  "label": "惠农区",
  "value": "640205" },

{
  "label": "平罗县",
  "value": "640221" }],


[{
  "label": "利通区",
  "value": "640302" },

{
  "label": "红寺堡区",
  "value": "640303" },

{
  "label": "盐池县",
  "value": "640323" },

{
  "label": "同心县",
  "value": "640324" },

{
  "label": "青铜峡市",
  "value": "640381" }],


[{
  "label": "原州区",
  "value": "640402" },

{
  "label": "西吉县",
  "value": "640422" },

{
  "label": "隆德县",
  "value": "640423" },

{
  "label": "泾源县",
  "value": "640424" },

{
  "label": "彭阳县",
  "value": "640425" }],


[{
  "label": "沙坡头区",
  "value": "640502" },

{
  "label": "中宁县",
  "value": "640521" },

{
  "label": "海原县",
  "value": "640522" }]],



[
[{
  "label": "天山区",
  "value": "650102" },

{
  "label": "沙依巴克区",
  "value": "650103" },

{
  "label": "新市区",
  "value": "650104" },

{
  "label": "水磨沟区",
  "value": "650105" },

{
  "label": "头屯河区",
  "value": "650106" },

{
  "label": "达坂城区",
  "value": "650107" },

{
  "label": "米东区",
  "value": "650109" },

{
  "label": "乌鲁木齐县",
  "value": "650121" },

{
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171" },

{
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172" }],


[{
  "label": "独山子区",
  "value": "650202" },

{
  "label": "克拉玛依区",
  "value": "650203" },

{
  "label": "白碱滩区",
  "value": "650204" },

{
  "label": "乌尔禾区",
  "value": "650205" }],


[{
  "label": "高昌区",
  "value": "650402" },

{
  "label": "鄯善县",
  "value": "650421" },

{
  "label": "托克逊县",
  "value": "650422" }],


[{
  "label": "伊州区",
  "value": "650502" },

{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },

{
  "label": "伊吾县",
  "value": "650522" }],


[{
  "label": "昌吉市",
  "value": "652301" },

{
  "label": "阜康市",
  "value": "652302" },

{
  "label": "呼图壁县",
  "value": "652323" },

{
  "label": "玛纳斯县",
  "value": "652324" },

{
  "label": "奇台县",
  "value": "652325" },

{
  "label": "吉木萨尔县",
  "value": "652327" },

{
  "label": "木垒哈萨克自治县",
  "value": "652328" }],


[{
  "label": "博乐市",
  "value": "652701" },

{
  "label": "阿拉山口市",
  "value": "652702" },

{
  "label": "精河县",
  "value": "652722" },

{
  "label": "温泉县",
  "value": "652723" }],


[{
  "label": "库尔勒市",
  "value": "652801" },

{
  "label": "轮台县",
  "value": "652822" },

{
  "label": "尉犁县",
  "value": "652823" },

{
  "label": "若羌县",
  "value": "652824" },

{
  "label": "且末县",
  "value": "652825" },

{
  "label": "焉耆回族自治县",
  "value": "652826" },

{
  "label": "和静县",
  "value": "652827" },

{
  "label": "和硕县",
  "value": "652828" },

{
  "label": "博湖县",
  "value": "652829" },

{
  "label": "库尔勒经济技术开发区",
  "value": "652871" }],


[{
  "label": "阿克苏市",
  "value": "652901" },

{
  "label": "温宿县",
  "value": "652922" },

{
  "label": "库车县",
  "value": "652923" },

{
  "label": "沙雅县",
  "value": "652924" },

{
  "label": "新和县",
  "value": "652925" },

{
  "label": "拜城县",
  "value": "652926" },

{
  "label": "乌什县",
  "value": "652927" },

{
  "label": "阿瓦提县",
  "value": "652928" },

{
  "label": "柯坪县",
  "value": "652929" }],


[{
  "label": "阿图什市",
  "value": "653001" },

{
  "label": "阿克陶县",
  "value": "653022" },

{
  "label": "阿合奇县",
  "value": "653023" },

{
  "label": "乌恰县",
  "value": "653024" }],


[{
  "label": "喀什市",
  "value": "653101" },

{
  "label": "疏附县",
  "value": "653121" },

{
  "label": "疏勒县",
  "value": "653122" },

{
  "label": "英吉沙县",
  "value": "653123" },

{
  "label": "泽普县",
  "value": "653124" },

{
  "label": "莎车县",
  "value": "653125" },

{
  "label": "叶城县",
  "value": "653126" },

{
  "label": "麦盖提县",
  "value": "653127" },

{
  "label": "岳普湖县",
  "value": "653128" },

{
  "label": "伽师县",
  "value": "653129" },

{
  "label": "巴楚县",
  "value": "653130" },

{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" }],


[{
  "label": "和田市",
  "value": "653201" },

{
  "label": "和田县",
  "value": "653221" },

{
  "label": "墨玉县",
  "value": "653222" },

{
  "label": "皮山县",
  "value": "653223" },

{
  "label": "洛浦县",
  "value": "653224" },

{
  "label": "策勒县",
  "value": "653225" },

{
  "label": "于田县",
  "value": "653226" },

{
  "label": "民丰县",
  "value": "653227" }],


[{
  "label": "伊宁市",
  "value": "654002" },

{
  "label": "奎屯市",
  "value": "654003" },

{
  "label": "霍尔果斯市",
  "value": "654004" },

{
  "label": "伊宁县",
  "value": "654021" },

{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },

{
  "label": "霍城县",
  "value": "654023" },

{
  "label": "巩留县",
  "value": "654024" },

{
  "label": "新源县",
  "value": "654025" },

{
  "label": "昭苏县",
  "value": "654026" },

{
  "label": "特克斯县",
  "value": "654027" },

{
  "label": "尼勒克县",
  "value": "654028" }],


[{
  "label": "塔城市",
  "value": "654201" },

{
  "label": "乌苏市",
  "value": "654202" },

{
  "label": "额敏县",
  "value": "654221" },

{
  "label": "沙湾县",
  "value": "654223" },

{
  "label": "托里县",
  "value": "654224" },

{
  "label": "裕民县",
  "value": "654225" },

{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" }],


[{
  "label": "阿勒泰市",
  "value": "654301" },

{
  "label": "布尔津县",
  "value": "654321" },

{
  "label": "富蕴县",
  "value": "654322" },

{
  "label": "福海县",
  "value": "654323" },

{
  "label": "哈巴河县",
  "value": "654324" },

{
  "label": "青河县",
  "value": "654325" },

{
  "label": "吉木乃县",
  "value": "654326" }],


[{
  "label": "石河子市",
  "value": "659001" },

{
  "label": "阿拉尔市",
  "value": "659002" },

{
  "label": "图木舒克市",
  "value": "659003" },

{
  "label": "五家渠市",
  "value": "659004" },

{
  "label": "铁门关市",
  "value": "659006" }]],



[
[{
  "label": "台北",
  "value": "660101" }],

[{
  "label": "高雄",
  "value": "660201" }],

[{
  "label": "基隆",
  "value": "660301" }],

[{
  "label": "台中",
  "value": "660401" }],

[{
  "label": "台南",
  "value": "660501" }],

[{
  "label": "新竹",
  "value": "660601" }],

[{
  "label": "嘉义",
  "value": "660701" }],

[{
  "label": "宜兰",
  "value": "660801" }],

[{
  "label": "桃园",
  "value": "660901" }],

[{
  "label": "苗栗",
  "value": "661001" }],

[{
  "label": "彰化",
  "value": "661101" }],

[{
  "label": "南投",
  "value": "661201" }],

[{
  "label": "云林",
  "value": "661301" }],

[{
  "label": "屏东",
  "value": "661401" }],

[{
  "label": "台东",
  "value": "661501" }],

[{
  "label": "花莲",
  "value": "661601" }],

[{
  "label": "澎湖",
  "value": "661701" }]],


[
[{
  "label": "香港岛",
  "value": "670101" }],

[{
  "label": "九龙",
  "value": "670201" }],

[{
  "label": "新界",
  "value": "670301" }]],


[
[{
  "label": "澳门半岛",
  "value": "680101" }],

[{
  "label": "氹仔岛",
  "value": "680201" }],

[{
  "label": "路环岛",
  "value": "680301" }],

[{
  "label": "路氹城",
  "value": "680401" }]],


[
[{
  "label": "钓鱼岛全岛",
  "value": "690101" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 269:
/*!************************************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/components/common/w-calendar/calendar.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                     * @1900-2100区间内的公历、农历互转
                                                                                                     * @charset UTF-8
                                                                                                     * @github  https://github.com/jjonline/calendar.js
                                                                                                     * @Author  Jea杨(JJonline@JJonline.Cn)
                                                                                                     * @Time    2014-7-21
                                                                                                     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
                                                                                                     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
                                                                                                     * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
                                                                                                     * @Version 1.0.3
                                                                                                     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
                                                                                                     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
                                                                                                     */
/* eslint-disable */
var calendar = {

  /**
                     * 农历1900-2100的润大小信息表
                     * @Array Of Property
                     * @return Hex
                     */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520], // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
                                                                    * 天干地支之天干速查表
                                                                    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
                                                                    * @return Cn string
                                                                    */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
                                                                                                                 * 天干地支之地支速查表
                                                                                                                 * @Array Of Property
                                                                                                                 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
                                                                                                                 * @return Cn string
                                                                                                                 */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
                                                                                                                                     * 天干地支之地支速查表<=>生肖
                                                                                                                                     * @Array Of Property
                                                                                                                                     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
                                                                                                                                     * @return Cn string
                                                                                                                                     */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
                                                                                                                                         * 24节气速查表
                                                                                                                                         * @Array Of Property
                                                                                                                                         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
                                                                                                                                         * @return Cn string
                                                                                                                                         */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                   * 1900-2100各年的24节气日期速查表
                                                                                                                                                                                                                                                                                                                                                                                                                   * @Array Of Property
                                                                                                                                                                                                                                                                                                                                                                                                                   * @return 0x string For splice
                                                                                                                                                                                                                                                                                                                                                                                                                   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
                                                                                                             * 数字转中文速查表
                                                                                                             * @Array Of Property
                                                                                                             * @trans ['日','一','二','三','四','五','六','七','八','九','十']
                                                                                                             * @return Cn string
                                                                                                             */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
                                                                                                                             * 日期转农历称呼速查表
                                                                                                                             * @Array Of Property
                                                                                                                             * @trans ['初','十','廿','卅']
                                                                                                                             * @return Cn string
                                                                                                                             */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
                                                       * 月份转农历称呼速查表
                                                       * @Array Of Property
                                                       * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
                                                       * @return Cn string
                                                       */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
                                                                                                                                       * 返回农历y年一整年的总天数
                                                                                                                                       * @param lunar Year
                                                                                                                                       * @return Number
                                                                                                                                       * @eg:var count = calendar.lYearDays(1987) ;//count=387
                                                                                                                                       */
  lYearDays: function lYearDays(y) {
    var i;var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += this.lunarInfo[y - 1900] & i ? 1 : 0;}
    return sum + this.leapDays(y);
  },

  /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
  leapMonth: function leapMonth(y) {// 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {// 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
        * 农历年份转换为干支纪年
        * @param  lYear 农历年的年份数
        * @return Cn string
        */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
        * 公历月、日判断所属星座
        * @param  cMonth [description]
        * @param  cDay [description]
        * @return Cn string
        */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {return -1;}
    if (n < 1 || n > 24) {return -1;}
    var _table = this.sTermInfo[y - 1900];
    var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()];

    var _calday = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)];

    return parseInt(_calday[n - 1]);
  },

  /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
  toChinaMonth: function toChinaMonth(m) {// 月 => \u6708
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字
    return s;
  },

  /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
  toChinaDay: function toChinaDay(d) {// 日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";break;
      case 20:
        s = "\u4E8C\u5341";break;
        break;
      case 30:
        s = "\u4E09\u5341";break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];}

    return s;
  },

  /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
  solar2lunar: function solar2lunar(y, m, d) {// 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    // 未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i;var leap = 0;var temp = 0;
    // 修正ymd参数
    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == leap + 1) {isLeap = false;}
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--i;
      }
    }
    if (offset < 0) {
      offset += temp;--i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = this.toAstro(m, d);

    return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': this.getAnimal(year), 'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month), 'IDayCn': this.toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661F\u671F" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
  },

  /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {// 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {return -1;} // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {return -1;} // 超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {return -1;} // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0;var isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {// 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {offset += day;}
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  } };var _default =


calendar;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_001.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVBQzdBOURCMzM3RjExRUFCOTEyQkIyNTM5RDU3MzA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVBQzdBOURDMzM3RjExRUFCOTEyQkIyNTM5RDU3MzA3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUFDN0E5RDkzMzdGMTFFQUI5MTJCQjI1MzlENTczMDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUFDN0E5REEzMzdGMTFFQUI5MTJCQjI1MzlENTczMDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ok8jaAAAJTUlEQVR42uxd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"

/***/ }),

/***/ 31:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_003.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc2RjU5N0VBMzM3RjExRUE5ODkzQzI3QUMzN0JCQUUwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc2RjU5N0VCMzM3RjExRUE5ODkzQzI3QUMzN0JCQUUwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzZGNTk3RTgzMzdGMTFFQTk4OTNDMjdBQzM3QkJBRTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzZGNTk3RTkzMzdGMTFFQTk4OTNDMjdBQzM3QkJBRTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4pRSCCAAAK/UlEQVR42uRd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"

/***/ }),

/***/ 32:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_004.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc4NERGMDUzMzM3RjExRUE4QUJGOTI0MzRERTJCQjhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc4NERGMDU0MzM3RjExRUE4QUJGOTI0MzRERTJCQjhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzg0REYwNTEzMzdGMTFFQThBQkY5MjQzNERFMkJCOEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg0REYwNTIzMzdGMTFFQThBQkY5MjQzNERFMkJCOEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bnmkUAAANBElEQVR42uRd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"

/***/ }),

/***/ 33:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_010.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5RjQyNTI2MzM3RjExRUFBQjY1OUVENDYyRjhDMkZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5RjQyNTI3MzM3RjExRUFBQjY1OUVENDYyRjhDMkZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzlGNDI1MjQzMzdGMTFFQUFCNjU5RUQ0NjJGOEMyRkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzlGNDI1MjUzMzdGMTFFQUFCNjU5RUQ0NjJGOEMyRkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ycOz+AAAM2ElEQVR42uRd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"

/***/ }),

/***/ 34:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_008.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdCNTNDRjgzMzM3RjExRUFCMjZCQTQ4NzJDMTUzQTZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdCNTNDRjg0MzM3RjExRUFCMjZCQTQ4NzJDMTUzQTZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0I1M0NGODEzMzdGMTFFQUIyNkJBNDg3MkMxNTNBNkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0I1M0NGODIzMzdGMTFFQUIyNkJBNDg3MkMxNTNBNkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6WbbsSAAAMYklEQVR42uRdfYwVVxU/c+ex7LIL7MICyxZYWKhQ/mjBVi2YtH6AVvqBTT+ASPEDBVJJQCNKY0JTmwqkiRGjIlhJqLV8WFNsLdrW2pLUClgraLFQYFlggWXLLh/7wX4wM54z7zyY9/bt3Duf+95ykpN98GbePfd3zz33nHPP3NG6HlgKOUIaciFyEf/tj1yAnGCm73VkC9lgNvlvJ3IHcjvyZf5r5UKnEr3c/gDkQcgDkYsZQJWBSEhkJ9BbkZuRLyG3XU8Ak2YORR7Cn6MgnQeO+AbW7ibkRv7c5wAmrStDHoZc0kuDOpK5Bfkj5PNxmJFEDMCStlZEqK1eqYS5ErmetdrKR4DLWWMKIDeJBryKZTyDfC5fAB7Agg+A/KAClpfM1/GwF8REyOaApt0I/pxvRAoxCbkB+VRYZiMR4nQbx65WEBLIE5FvRB6LPAZ5NPJgBiA1K9qYLyKfRD6BXIt8GPkQ+8d+lWQEu401YXgcYQBcymDoPu+nDn0W+ZPIU7lzKto2gO38+IzvyPf9N/Je5DfYY/CjzTfxoF0INK0DRnKVvEj4sXtfQL6PQY3KpJAm70HeyWB3+vgNWgBPxw2wxgvDUB8u0lzkhznQiJMo0NiOvJV9YS/UyAugZ7ssfIJb7RHcfsjzkV9CXtIL4AK3uYRlmM8yqdJQ7rMWNcApcEs93HMb8jbk5Ry69jYNYlm2sWxe1hrPIHsFeKwHcCkjthJ5PXsDuUZjWLaVLKuXBT0SgG/wMLVJ+M3ID+a4T6yxjM96UIIhjEWoAJdxPkGFbmeBx+dRkEFT/7csuwpVMCahAFzoYVrMQl4HvZMxC0rFLPs9HsxlYVCAU4uaykDcj/xEgIAjF4hkf5z7ooKddNGTAUe2pkihsRnIj+VpDiKbUlFfZipcWySzx0ISLg5XaOQTyE/69KlzlagvP+K+yWg4uGQO3UCpUtBIWnmf9ui05wv1476NUdD4Kq8Al4M8n1vIApRA36US7qNsMUslnrpRogfQKxUaXxanKyYWPgRaFYt1uR2Mn6En2Ho5jqbHc1/XSq6r5HyHKQN4mMKUn8IOenwrz41VoE3gmdjVhZLHuiFOfX0VeZ/EpBB2Z91MRCrhLHNlVsbuMXRdufa5AwG2Yq0r0bjPMhe0226OyBIGyrSX0o0T4PqjCdx32cI4xA3gYQpGf2Eo4hb1x7H2MAkKHOPev8DbvQOLwwJ5ocKiPqwngItAvqc2B8JIOZYOAv3J74D41sPKt1gfHAXrP4eS/N6BdJPhtjjOmA762hWgTRwXBsCDFLS42BmcOXc0RknsL21svgLecsHdaUgp6CsXgVY92v6nuXMXmJteiMbz+Pw0EEvmJbW9uQWMNRvBOnQs6M/SHt3d4L4hSgtdXaYGy7JDMwODKwTo3/7KVXDt/5p1J4jFc9NNQOAlSQNx1x3XwLXNRAnoK74ZhrkoVQijyzJNBKm0rAJnduCO48pv7njd1qY0PG5CV7NfuMGgNqk63U53dIKx+UWAllDqSr4sWzFSgVrKmRwsuaGCfd/AAFv//RCM1RtBf2yxrU1WbR0YP/4VBg09dFzXQRszEg1YBWhou0EXYF1oBqg/B9axkzZw2doxfvEc3ipAmzYVB7QVjJ9sstsOiW5hTOol9rotBbCsFuEzYfq91ofHwHj6GRD3zwRj/RaMfy5mXQjFjGmgTb8VtNEVWb0Gq6ERrHffB+v1v4N18kw3v5miPXGpBaxde7HN2rD9Yqrl2OLmu9AA0CKn8Yi4OdE/B/Vsf3DpP30r6AtwFg5VNPmoxebv/5I0P/HRbmS3mgcqAt+fYO9Al0RuU+KSWsy7B8QDX/R2E/rFYv59oI0bBcYvf5fdbIRPU9jEXnHBrVAoZM0mgfquazBw597tHdw0zf846Esf8RaE+CfCZKIsnBIK4E2MxSxMnQziwbuC/860KSDu/VxcE04JYFnlefQpycL+IL4RXnJOzJkFWkV5XPkJV3dNKPi/oyI3DbioaSOHhfeDaJO1L90ZB8CVKgDLEqsVkZuHO24Lf9A+dUsyKRQtybBJJBQA9h8eU/grRLcgADod+Vz0d52hc2hUXmbvgKT5vz3J49/rKFMBWLYbXOS3dX3ZV0GbWJ3en8bzYKxad7VTtq0sishJGTkcwAGwvmQeaDdPSpenBaO85U/5bUGGjaYCsP+HWQaVoIamB4maaaS7UYXRPd2llQ1OL+ilRE+mPAWBtp5k2OgErmzvpcu/IcwydiIjpjHMyAAGocnl0aMtREpwSOc2jG0KyaDsOYfaOh5DB1HewXSASpk1soNRBAfn03Mc1onTAMUZszrYzrQsNWcSsKbCj/gC2Pz1dvkgNDQBXGy2F7uwyTqZnuwyKV0ZLslGxxSswW7UHOkcarsM1uHa8MGlTFtmhi2COSL5/opwSVak6KOopTTf2hs+wG//K46kz1kVgGVS1EUtpZ3TPXI8vB9Eu27+eVcckdwpyfcdBHC75KKjkYtpGEl7rbhTLP25zTtw8l6KA+Ajku/bVQA+FIek1tETYG7cFtzcvPQGWG/tgZhIhk17QhFguibynLD55m702CzQF83xtcts/uFVMLf8KS5w21UB7mBPoiePm+YtFb3FsmVE2mecaQDxyGzQJqllSq26ejC3vgLW7n0QI+2TOAiEaYe+ajI9g21Xo7hpKDmp00MNY0dVgL78a7gOnwM4l+HtNF4A6809NnBaQQFoFHJnanR7h53IsXb8Fcxn0H4fz7LeUAXRd78OcKkl2U64RPbsfZfvaRFoSlX2UBm8W0qL0nIvQ0g7y9rHxoL+vYV2lQ913lizwX3Xt3QgaCPKr+UtcDEkP7fbwDhpaCnoP+AKIvS17aqe/x0JbaIh3wvu2/Z0zEKDUAwm6If2B0dWs+sU9B8+mgSXE0L69xfZlTc90oVmu+TJ2n8wyQSUG7h2BdH8a2nQAUVJsKdODisk3y8B9yqmwhHyyfzhHWEALG6fkp4PoGqf7Tt7LjzxpV+WveDZpiFF2CbVYXRLAPmjP0q+70yF0cJD2EdFB4EOp6AkD1XcWO+8dw2I9c+D+drb6QmgbERZLyqv6pdIspsmUgXRgcNgrN5wtUzLriCixw6CZ+8Ig9dUQ2hnFo3ORHCrruxgw744kHidXWCsexZ07Kh1sAbMv+1Wuk1fOh9gPD/wg9puPLVeWmdGOQ5jLVUQzQBjw9bsFUTeaTvIj5ppzAYwqXQruNcIU6nQPAhaI4yRm7Fus7d7KspBq+TH9ijHoJjHtQ4eRU0OLRglz+B5yTWtziyb8JjYofn2G+gNuuJI+lFIbfXK2Z+bQH5aShqGmQDTY0iyHYytCjF4X6Qj4F7sB4xdkxvAlkIKjlRpLcR9fKxzC97r8x3h+L1rQZ47P5uJS6IHFafFzi0ZQMdmUd3/Q7H1kMJgSqCTh3AZ15jOzjgBfoH7LNPebia2p1OnqO6oSvKDFFrTwRvVfdw00AF1CxSSYpTQ7haP97RlTxfKPH9qcAV4PyIrn6iF+ygDtw16OFxUSEbEUhi1FRBkaz93qYv7JttqsdyuEZJRaVAQ5J/Iq8D/eZG5SNSXx7lvMmpwm+2yqp5T7DjLiMLo1ZAjB9OH4DGsVgiHU0GF676cUGisRsE9IXqRR93IY3BJ9ie4LyrXHpMplcoxMOQP1SoKSIdwLlPU+lwjkplOBFTdc6pVyEkon7NDGaR6xWt3s1tTk4eu2D8Ur68Hxcyil4OMTmWGgRLvYgE76Llsly2WcYGCt+BMJ5xSbcDrSVG1oJ4TJt9xDfKjkDyhOtfoBMu2RsHPdc7kWi+NCB8jXgPeEu/k6tAxCD+FqOvc1KiZZZmj6IY5wa3xOiOFz2lFDTV6dNqfg+QD5Rs9mJowqYnbns2yeAmOGv2A65aLUKUgR4zTE4f01PrNEO0R4+9Ccke8V44YD3p002mOYsaCtzMrO7nTL/MA0YPVVHdB57kHfaaAXCfKfL3DAZDf6lADcuCQ/BSF9ZoHGnB6enI8pL/moRTSi2Pa2W+lzjtf80B7Q1TOFLSKsA1y6DUPKa2hjtFBmcMDTHkC5gBzb7ltOfmikpRwdbyY5NOrdpxam9Ov2nEK+gHk/suinB4OrSV587KoFJ1j9ybXXnfmNGt5/bqzlNlIAV3G9rm4l4FtZTvbJ17Y5wS6iTmOV05m09Y+/crJzM6eZvbz0lRVH/a6fWlq5oLYxrZQ9tpf4QjtTeYrzDn72t//CzAAp+CLEOeL1cgAAAAASUVORK5CYII="

/***/ }),

/***/ 35:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_013.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgxRTFDNDgzMzM3RjExRUE5MjQ5QUE2NTc4OUJFRDNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgxRTFDNDg0MzM3RjExRUE5MjQ5QUE2NTc4OUJFRDNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODFFMUM0ODEzMzdGMTFFQTkyNDlBQTY1Nzg5QkVEM0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODFFMUM0ODIzMzdGMTFFQTkyNDlBQTY1Nzg5QkVEM0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7PHQ2aAAAK0klEQVR42uxd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"

/***/ }),

/***/ 36:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_005.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgzQTQ2N0Q0MzM3RjExRUFCQ0IxODFGNjBEQjZDMjYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgzQTQ2N0Q1MzM3RjExRUFCQ0IxODFGNjBEQjZDMjYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODNBNDY3RDIzMzdGMTFFQUJDQjE4MUY2MERCNkMyNjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODNBNDY3RDMzMzdGMTFFQUJDQjE4MUY2MERCNkMyNjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4XWt/uAAAOLElEQVR42uRd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"

/***/ }),

/***/ 37:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_006.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0RDA4NkEwMzM3RjExRUE5RjM3QTZGQTY0MUQ3MkJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg0RDA4NkExMzM3RjExRUE5RjM3QTZGQTY0MUQ3MkJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODREMDg2OUUzMzdGMTFFQTlGMzdBNkZBNjQxRDcyQkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODREMDg2OUYzMzdGMTFFQTlGMzdBNkZBNjQxRDcyQkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xiIgfAAAMvUlEQVR42uRd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"

/***/ }),

/***/ 38:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_012.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2NjU0OTJFMzM3RjExRUFBQjQ2OTY0QjQ3MjI2M0RCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg2NjU0OTJGMzM3RjExRUFBQjQ2OTY0QjQ3MjI2M0RCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODY2NTQ5MkMzMzdGMTFFQUFCNDY5NjRCNDcyMjYzREIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODY2NTQ5MkQzMzdGMTFFQUFCNDY5NjRCNDcyMjYzREIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6kubEiAAAMKUlEQVR42uRd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"

/***/ }),

/***/ 39:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_014.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDRDJERjdCMzM3RjExRUFCNTYxREQ4QUJFMDBDOEQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDRDJERjdDMzM3RjExRUFCNTYxREQ4QUJFMDBDOEQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNEMkRGNzkzMzdGMTFFQUI1NjFERDhBQkUwMEM4RDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNEMkRGN0EzMzdGMTFFQUI1NjFERDhBQkUwMEM4RDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+SktvAAALCUlEQVR42uxd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"

/***/ }),

/***/ 4:
/*!******************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_007.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5NkM2OUI5MzM3RjExRUE4QjQ2RDI0Nzk3NEQ0MDQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg5NkM2OUJBMzM3RjExRUE4QjQ2RDI0Nzk3NEQ0MDQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2QzY5QjczMzdGMTFFQThCNDZEMjQ3OTc0RDQwNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODk2QzY5QjgzMzdGMTFFQThCNDZEMjQ3OTc0RDQwNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7RroCiAAALCklEQVR42uRd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"

/***/ }),

/***/ 41:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_011.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCMENDRUNGMzM3RjExRUE5OTBBRTdDNjk5QjM5MUZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCMENDRUQwMzM3RjExRUE5OTBBRTdDNjk5QjM5MUZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEIwQ0NFQ0QzMzdGMTFFQTk5MEFFN0M2OTlCMzkxRkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEIwQ0NFQ0UzMzdGMTFFQTk5MEFFN0M2OTlCMzkxRkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5p2dutAAAK70lEQVR42uxdeXBW1RU/38tH/BJCCIGEkAhEwyZuoJRabSsooHXDBQsdGWYcW6e1C9SWDu1MtbZ/FIuOMO573UZwcAPGcXDcUCtYZNFSy6AhAYIIBC1LVpKv5/SdR14+P75z733fcl/imTmT5Xvve+f+3rnn/s65990XOef2OFgiEdQYagH/PAE1HzXKSp/noZLBHayd/LMNtRW1BbWZf1rRsGiOr1+IWozaD7UvA6hyI6KC7QT6EdRDqAdRm3oTwOSZA1FL+fdMSB7fONIq9u4DqI38e48DmLxuAGoZalGObuoQ1sOo+1C/zEYYiWYBWPLWigx6q64UsVai7mGvjocR4EHsMflgp9ANH842fo66PywAF7LhhRAOyWd7KXzVp3tAjKY5HFC3G8y/h03IIcag7kVtSFfYiKaxu53EVCuIOKijUUeiVqMOQx2K2p8B8HpFE+t/UXei7kCtQ92GupX5samTDGbaWJsOxpEOgEsYjDzD86lBk1Enoo7nxql4WyHH+ZqEz4j7bkT9APV1Zgwm3nwK37SvAnXrgJlcJQ8SJnFvGuoVDGqmQgp58jrUVxjsNoPvoAFwd7Y9OMIDw0ADijQL9YecaGRaKOR8h/XXqM+hLmUurCoeE6o3icuOIbgna4LbB3U26grUn2YJ3EQp5WuvYFv6aJw7kNscyTTAHrglGudMQF2GOo9T11xLMduyjG3TGWu0QdYFuFoDXKqILUC9n9mAbTKMbVvAtuoM6BkBuEqja5PxT6DOsJwTR9jGJzWcoJSxSCvAA7ieoCLnsME1IUoyqOs/xbarSAVjkhaAYxrd4hLUJZCbillQ6cu2X6YRLmNBAfYGNZUbcRXqbQESDhuEbL+V26KCnTjoScBRrClQuNgU1N+HtAaRzKmoLVMVji2Q4rEjpIvlChf5FupfDDm1rUJt+TO3TZJySFE5TAXKcAWPpJF3kSZpD4v04bYNU/D44boADwK5nhtjA4qg50oRt1EazLzCkxLADhdxJJkbMipmKjXcVkkqk+GZDOAyhS4/jgl6b5EZ3GYppJRJAHsFZ4nKLOghjEGHWSxQoKBfm81xkqSBkvdSuXEE9D4ZwW2XvLg0FcBlCkH/Bui9coPCoN4Nw2gCaZbm1GaCZsmxBL919rcBxg7B22tJjtd6FGDDDoCl6wGa9OY4itmLHxFSbsKyORFgqYBOE5s/0kru8wHunOGCa5ucjex2YjXAzcu1QSaAqTCUakKUsNyVGCKk6hCljjqFdrj0dDvB9eTMEwGuPUv7tBKFNHpAYgwml5ZW4EzXtWTCcPuDqqGNVwqf53uJmgdwf+GECgUemDRE2C4dZisozgS5Pl7sB1haizDJhPdu22c/wP/eY8yLJwvH9PMAjiiwh++aWPHSJoC2o/aC294B8OoW49PPkzowYeswO8gTMrdxJhbUNQI8/r69AD/zAcCOA8anj4PU60oIt5gDctWMFsTFTK14ci3A29vsA3cN2vTIe4G+gjAZLRxT4CiANzqIFZ1xgD+tAnjtE3vAfWMrwC0rjQc4HWwKoiCvPDcuSRZgZt7cDtDS7jboowaAn2A0L47lBliyg7yWQkOijQHqEynpmqPAf080vfrvpmGgGtr19/INADc+46apWWcLnwPc9Gx3cE+vApg/LdDXVqoALC0ArDC9+rBSgLswVb78jK7/1ePA98tlAPe85dYEssFzn1jrgvuJj5L94FSAJdcCVAdbJSdhE40qAFxienXqejHsgn+4GDMmzP3vRlD3H3bjMnnSpp0Av8Wkc0xFZsAlhvC31QAf+npMKZKnn58PcMlpXTYGEKm8EHVAng0uML26PzOZNhbg4dkA54/s+t8W7LY/Q89atj794K78yA1HfnDPq3Ft8MD9v43Bpg0kbCJRBYDT9jBLBSaPC68CeHkzwANrAL5qdgeexW9gXEZvnncBwJD+wa6xD3vI4tddpnCsATjK3Pg9gJlnp/0+StjkEcBxIQ2mTpTWafnpmMmfhSFjCQL73mddvJQGorkI8pQx5vSLvnPvIV82gIPszRcCjCyHnAgB3CHE4SaFYpC2DMXodcc1btH7oXfcWEjx+Y8rANZtx4FwsjqdO9gCcP8aNzX3B78fIyWcPRHdKHNLYqRHvjoJ2E6FL+mfKQtnTUBvRi9b9BrAv/hJiFUfu7/Pn+p6eiohykfnUlp+jJyWAfxmSneKmCFplgB22INTyaFMWzlqMMC9swCum9i9jkF07r630YCWJEa1uJ/RMX5wrx4P8OB1WQGX5Evh86PkwRIbpaLjqExbmo+W/GISwBlVrkd6dO6pdW4tgwYoD7SNO13msdPXvEFFAL/CsDL1lKyG2C9UAJZmpHZl0+LvI40bgQPSXcgE3v20i88S6F4sTawhTMbbPw8HsvJ+kG1pED5vJYBbhIM+y7bVlRjxF13t1mqpGre9MTmwVZgCXX8uwKWn5axu9KlU/lABeGuurL8Y09lJo9wQ8Q42pRaDVUfcTcEvGO0mLYW5nZbami6A6Zic1MAo1b5orKsUk+PxjNIureKcCsBkaqvAJGgQ3GRDi5yINeACY5KKIBCmrQ5nchIVexe+kUSR5kMI07ijyHXfAku2ybJECIs3VfIHVYCpkrpZ14pICBa4Gpq4mTFRBrhZgQ+/pGtFW4f9ABva+LL0tV4a7WikfUj19TanWF9vP8Af6k9fEQarVVNoP8CNUlYC7hPqyvL8BqMGZI8GYI76wkbt054DeauZY1gm7nhCldhUq3xo8THtt6C8Rph47DXj3apYLJr7kZJiLs0F0o1/fqNb8NcQ2qaRdmlJtaEHben4H++PaJLCTiqA6YsfBXf3EDU23u7Ov/lnc0Msj4G8W0q3FXmJtJ0WEkn3dKlCDt4Thdr8rHBMO2N4XICpB0slOBp3b+9lvDjObZY4xxeJuDjHcXHJi2loWN6LAF7ObZa892sLdpMBTEVBlW2saG+F2l4Abi23VZLdkGT67XilE9ooU5rQo2rSfNDbIitscpjbKFUcm+A4m4umqk2p7BNWzwa090Bw27ltUroUT3WMI9yVvQqG/BP1FjDfL9JGobbcym2TZG+q3i5VVxuYOEtCafRfewiziHNbViscewSEeTlH4WK1CvSE5EW+6x0hBpdsv43bonLsdsmpVOYHqDJUp2ggbcI5V9HrbROymXYEXKV4fJ1CTUJ5nx2qIKk+8LQWdU7IKFwt26z6yM4eUKws6sxwNSSmgQK7mMME3ea4HGcb5yiwBX85oUH1ArpTiHWgXhMm7rgQ9SZwd6i2TXawbQsVeK6/J9fpXMQxuOO1oFd4J6pD2yAshiysc1OQQ2zLTEUa5ge3VrdHOobdii7UqHEOkfanwX2g/CGNUJNOOcDXns626CRHjSbgkpjugB3nrkIMQ2fDgoPcyL+jXgTuU+v0iEwmtxinBxRWQsi2GPcXOCiLqQa9PSvbuNEr+QbRg9Xngrufe9A3xhB1osrXPzgBMn0kvQMs2CTfk3S95oFuOD09WQPdX/NQwt8d8w2gR7jx/tc80EJFWs4U9AGxJrDoNQ+e11DDaKPM8gBdnoDZwpor2mbli0o843bxYBKmV+34vdbqV+34DaVHv21/WZSf4dBYEpqXRXmyn+mNba8784e1UL/uzAsbHtADOD73zTGwRzjO9ogX9vmBPsCajVdOJvPWHv3KycTG7mY1eWmqKofttS9NTRwQmzgWSq/99T+43sl6lNXa1/7+T4ABAA2bwThDZcS8AAAAAElFTkSuQmCC"

/***/ }),

/***/ 42:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_002.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhDQjI5RDU4MzM3RjExRUE5RTdGQTMyRjgyNThBRjU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhDQjI5RDU5MzM3RjExRUE5RTdGQTMyRjgyNThBRjU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OENCMjlENTYzMzdGMTFFQTlFN0ZBMzJGODI1OEFGNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OENCMjlENTczMzdGMTFFQTlFN0ZBMzJGODI1OEFGNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4lwBuwAAALrElEQVR42uxd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"

/***/ }),

/***/ 43:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/static/img/img/xxzx_009.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhFNDRDRjQ2MzM3RjExRUFCNTE5RjhCNzg1MUM5NTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhFNDRDRjQ3MzM3RjExRUFCNTE5RjhCNzg1MUM5NTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEU0NENGNDQzMzdGMTFFQUI1MTlGOEI3ODUxQzk1NjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEU0NENGNDUzMzdGMTFFQUI1MTlGOEI3ODUxQzk1NjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6u//JDAAAMG0lEQVR42uxd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"

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 7:
/*!***********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/pages.json?{"type":"style"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationStyle": "custom" }, "pages/information/index": { "navigationBarTitleText": "信息中心" }, "pages/my/index": { "navigationStyle": "custom" }, "components/information/editchild": { "navigationBarTitleText": "编辑孩子信息" }, "components/information/editparent": { "navigationBarTitleText": "编辑家长信息" }, "components/information/addchildschool": { "navigationStyle": "custom" }, "components/information/addschool": { "navigationBarTitleText": "添加学校" }, "components/information/addchildmsg": { "navigationBarTitleText": "填写上学信息(2/4)" }, "components/information/declaration": { "navigationBarTitleText": "申报成功" }, "components/information/payment": { "navigationBarTitleText": "支付接送费用" }, "components/information/padingpayment": { "navigationBarTitleText": "支付接送费用" }, "components/share/index": { "navigationStyle": "custom" }, "components/info/renew": { "navigationBarTitleText": "快速续费" }, "components/info/index": { "navigationBarTitleText": "详情" }, "components/leave/index": { "navigationBarTitleText": "今日请假" }, "components/info/trip": { "navigationBarTitleText": "昨日行程" }, "components/msg/groupsend": { "navigationBarTitleText": "群发信息" }, "components/complaint/index": { "navigationBarTitleText": "投诉上传" }, "components/complaint/info": { "navigationBarTitleText": "详情" }, "pages/my/login": { "navigationBarTitleText": "", "navigationBarBackgroundColor": "#FF6C00", "navigationBarTextStyle": "white" }, "components/msg/Itineraryrecord": { "navigationBarTitleText": "请假申请" }, "components/msg/userinfo": { "navigationBarTitleText": "个人资料" }, "components/msg/report": { "navigationBarTitleText": "运行报告" }, "components/msg/linedetails": { "navigationBarTitleText": "线路详情" }, "components/msg/security": { "navigationBarTitleText": "线路详情" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!**********************************************************************!*\
  !*** F:/BaiduNetdiskDownload/schoolbusjz/pages.json?{"type":"stat"} ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__7ED0341" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map