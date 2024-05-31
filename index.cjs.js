"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RandomType = exports.RandomGeneratorDefault = exports.RandomGeneratorBase = void 0;
var _base = require("@locustjs/base");
var _exception = require("@locustjs/exception");
var _enum = _interopRequireDefault(require("@locustjs/enum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RandomType = exports.RandomType = _enum["default"].define({
  num: 0,
  // numeric
  alpha: 1,
  // letters (upper and lower)
  alphaNum: 2,
  // numeric and letters
  upper: 3,
  // only upper letters
  lower: 4,
  // only lower letters
  upperNum: 5,
  // numbers and upper letters
  lowerNum: 6,
  // numbers and lower letters
  custom: 7
}, "RandomType");
var RandomGeneratorBase = exports.RandomGeneratorBase = /*#__PURE__*/function () {
  function RandomGeneratorBase(options) {
    _classCallCheck(this, RandomGeneratorBase);
    (0, _exception.throwIfInstantiateAbstract)(RandomGeneratorBase, this);
    this.options = this.getOptions(options);
  }
  return _createClass(RandomGeneratorBase, [{
    key: "getOptions",
    value: function getOptions(options) {
      var _options = Object.assign({
        seed: undefined,
        minLen: undefined,
        maxLen: undefined,
        len: undefined,
        from: undefined,
        to: undefined,
        type: "num",
        excludes: [],
        chars: []
      }, options);
      _options.type = RandomType.getNumber(_options.type, "num");
      if (!(0, _base.isNumber)(_options.len)) {
        _options.len = undefined;
      }
      if (!(0, _base.isNumber)(_options.minLen)) {
        _options.minLen = undefined;
      }
      if (!(0, _base.isNumber)(_options.maxLen)) {
        _options.maxLen = undefined;
      }
      if (_options.type == RandomType.num) {
        if (!(0, _base.isNumber)(_options.from)) {
          _options.from = undefined;
        } else {
          _options.minLen = _options.from.toString().length;
        }
        if (!(0, _base.isNumber)(_options.to)) {
          _options.to = undefined;
        } else {
          _options.maxLen = _options.to.toString().length;
        }
        if (_options.from > _options.to) {
          var temp = _options.from;
          _options.from = _options.to;
          _options.to = temp;
        }
      }
      if ((0, _base.isNumber)(_options.minLen) && (0, _base.isNumber)(_options.maxLen) && _options.minLen > _options.maxLen) {
        var _temp = _options.minLen;
        _options.minLen = _options.maxLen;
        _options.maxLen = _temp;
      }
      return _options;
    }
  }, {
    key: "generate",
    value: function generate(options) {
      (0, _exception.throwNotImplementedException)("".concat(this.constructor.name, ".generate()"));
    }
  }, {
    key: "next",
    value: function next(from, to) {
      (0, _exception.throwNotImplementedException)("".concat(this.constructor.name, ".next()"));
    }
  }]);
}();
var RandomGeneratorDefault = exports.RandomGeneratorDefault = /*#__PURE__*/function (_RandomGeneratorBase) {
  function RandomGeneratorDefault() {
    _classCallCheck(this, RandomGeneratorDefault);
    return _callSuper(this, RandomGeneratorDefault, arguments);
  }
  _inherits(RandomGeneratorDefault, _RandomGeneratorBase);
  return _createClass(RandomGeneratorDefault, [{
    key: "generate",
    value: function generate(options) {
      var result;
      var _options = options == null ? this.options : this.getOptions(options);
      do {
        result = [];
        if (_options.type == RandomType.num && _options.excludes.length == 0) {
          var from = _options.from == null ? _options.minLen == null ? _options.len == null ? 0 : Math.pow(10, _options.len - 1) : Math.pow(10, _options.minLen - 1) : _options.from;
          var to = _options.to == null ? _options.maxLen == null ? _options.len == null ? 100000 : Math.pow(10, _options.len) - 1 : Math.pow(10, _options.maxLen) - 1 : _options.to;
          result = Math.floor(Math.random() * (to - from)) + from;
          break;
        }
        if (_options.minLen == null) {
          _options.minLen = 5;
        }
        if (_options.maxLen == null) {
          _options.maxLen = 7;
        }
        var length = _options.len == null ? Math.floor(Math.random() * (_options.maxLen - _options.minLen + 1)) + _options.minLen : _options.len;
        for (var i = 1; i <= length; i++) {
          var ch = void 0;
          do {
            var r = void 0;
            switch (_options.type) {
              case RandomType.num:
                r = Math.floor(Math.random() * 10);
                ch = String.fromCharCode(48 + r);
                break;
              case RandomType.alpha:
                r = Math.floor(Math.random() * 20);
                switch (r % 2) {
                  case 0:
                    // upper
                    r = Math.floor(Math.random() * 26);
                    ch = String.fromCharCode(65 + r);
                    break;
                  case 1:
                    // lower
                    r = Math.floor(Math.random() * 26);
                    ch = String.fromCharCode(97 + r);
                    break;
                }
                break;
              case RandomType.alphaNum:
                r = Math.floor(Math.random() * 30);
                switch (r % 3) {
                  case 0:
                    // upper
                    r = Math.floor(Math.random() * 26);
                    ch = String.fromCharCode(65 + r);
                    break;
                  case 1:
                    // lower
                    r = Math.floor(Math.random() * 26);
                    ch = String.fromCharCode(97 + r);
                    break;
                  case 2:
                    // num
                    r = Math.floor(Math.random() * 10);
                    ch = String.fromCharCode(48 + r);
                    break;
                }
                break;
              case RandomType.upperNum:
                r = Math.floor(Math.random() * 20);
                switch (r % 2) {
                  case 0:
                    // upper
                    r = Math.floor(Math.random() * 26);
                    ch = String.fromCharCode(65 + r);
                    break;
                  case 1:
                    // num
                    r = Math.floor(Math.random() * 10);
                    ch = String.fromCharCode(48 + r);
                    break;
                }
                break;
              case RandomType.lowerNum:
                r = Math.floor(Math.random() * 20);
                switch (r % 2) {
                  case 0:
                    // lower
                    r = Math.floor(Math.random() * 26);
                    ch = String.fromCharCode(97 + r);
                    break;
                  case 1:
                    // num
                    r = Math.floor(Math.random() * 10);
                    ch = String.fromCharCode(48 + r);
                    break;
                }
                break;
              case RandomType.upper:
                r = Math.floor(Math.random() * 26);
                ch = String.fromCharCode(65 + r);
                break;
              case RandomType.lower:
                r = Math.floor(Math.random() * 26);
                ch = String.fromCharCode(97 + r);
                break;
              case RandomType.custom:
                if (!(0, _base.isSomeArray)(_options.chars)) {
                  throw "Missing options.chars. Custom charset not specified.";
                }
                r = Math.floor(Math.random() * _options.chars.length);
                ch = _options.chars[r];
                break;
              default:
                throw "uknown random type ".concat(_options.type);
            }
            if (_options.excludes.length == 0 || _options.excludes.indexOf(ch) < 0) {
              break;
            }
          } while (true);
          result.push(ch);
        }
        result = result.join("");
        if (_options.type == RandomType.num) {
          if ((0, _base.isNumber)(_options.from) && (0, _base.isNumber)(_options.to)) {
            var num = new Number(result);
            if (num >= _options.from && num < _options.to) {
              break;
            }
          } else {
            break;
          }
        } else {
          break;
        }
      } while (true);
      return result.toString();
    }
  }, {
    key: "next",
    value: function next(from, to) {
      return this.generate({
        from: from,
        to: to,
        type: RandomType.num
      });
    }
  }]);
}(RandomGeneratorBase);
var _instance = new RandomGeneratorDefault();
var Random = /*#__PURE__*/function () {
  function Random() {
    _classCallCheck(this, Random);
  }
  return _createClass(Random, null, [{
    key: "instance",
    get: function get() {
      return _instance;
    },
    set: function set(value) {
      if ((0, _base.isEmpty)(value)) {
        throw "no object given to be set as current random generator.";
      } else if (!(value instanceof RandomGeneratorBase)) {
        throw "random generator must be a subclass of RandomGeneratorBase";
      }
      _instance = value;
    }
  }, {
    key: "generate",
    value: function generate(options) {
      return _instance.generate(options);
    }
  }, {
    key: "next",
    value: function next(from, to) {
      return _instance.next(from, to);
    }
  }]);
}();
var _default = exports["default"] = Random;
