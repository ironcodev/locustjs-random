"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandom = exports.Random = exports.RandomGeneratorDefault = exports.RandomGeneratorBase = exports.RandomType = void 0;

var _locustjsBase = require("locustjs-base");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RandomType = _locustjsBase.Enum.define({
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
}, 'Resolve');

exports.RandomType = RandomType;

var generateRandom = function generateRandom(options) {
  var _options = Object.assign({
    seed: undefined,
    minLen: undefined,
    maxLen: undefined,
    len: undefined,
    from: undefined,
    to: undefined,
    type: 'num',
    excludes: [],
    chars: []
  }, options);

  var result;
  var type = RandomType.getNumber(_options.type, 'num');

  if (!(0, _locustjsBase.isNumber)(_options.len)) {
    _options.len = undefined;
  }

  if (!(0, _locustjsBase.isNumber)(_options.minLen)) {
    _options.minLen = undefined;
  }

  if (!(0, _locustjsBase.isNumber)(_options.maxLen)) {
    _options.maxLen = undefined;
  }

  if (type == RandomType.num) {
    if (!(0, _locustjsBase.isNumber)(_options.from)) {
      _options.from = undefined;
    } else {
      _options.minLen = _options.from.toString().length;
    }

    if (!(0, _locustjsBase.isNumber)(_options.to)) {
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

  if ((0, _locustjsBase.isNumber)(_options.minLen) && (0, _locustjsBase.isNumber)(_options.maxLen) && _options.minLen > _options.maxLen) {
    var _temp = _options.minLen;
    _options.minLen = _options.maxLen;
    _options.maxLen = _temp;
  }

  do {
    result = [];

    if (type == RandomType.num && _options.excludes.length == 0) {
      var from = _options.from == undefined ? _options.minLen == undefined ? _options.len == undefined ? 0 : Math.pow(10, _options.len - 1) : Math.pow(10, _options.minLen - 1) : _options.from;
      var to = _options.to == undefined ? _options.maxLen == undefined ? _options.len == undefined ? 100000 : Math.pow(10, _options.len) - 1 : Math.pow(10, _options.maxLen) - 1 : _options.to;
      result = Math.floor(Math.random() * (to - from)) + from;
      break;
    }

    if (_options.minLen == undefined) {
      _options.minLen = 5;
    }

    if (_options.maxLen == undefined) {
      _options.maxLen = 7;
    }

    var length = _options.len == undefined ? Math.floor(Math.random() * (_options.maxLen - _options.minLen + 1)) + _options.minLen : _options.len;

    for (var i = 1; i <= length; i++) {
      var ch = void 0;

      do {
        var r = void 0;

        switch (type) {
          case RandomType.num:
            r = Math.floor(Math.random() * 10);
            ch = String.fromCharCode(48 + r);
            break;

          case RandomType.alpha:
            r = Math.floor(Math.random() * 40);

            switch (r % 2) {
              case 0:
                // upper
                r = Math.floor(Math.random() * 26);
                ch = String.fromCharCode(65 + r);
                break;

              case 1:
                // lower
                r = Math.floor(Math.random() * 26);
                ch = String.fromCharCode(65 + r);
                break;
            }

            break;

          case RandomType.alphaNum:
            r = Math.floor(Math.random() * 30);

            switch (r % 3) {
              case 0:
                // lower
                r = Math.floor(Math.random() * 26);
                ch = String.fromCharCode(65 + r);
                break;

              case 1:
                // upper
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
            r = Math.floor(Math.random() * 40);

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
            r = Math.floor(Math.random() * 40);

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
            r = Math.floor(Math.random() * _options.chars.length);
            ch = _options.chars[r];
            break;

          default:
            throw "uknown random type ".concat(type);
        }

        if (_options.excludes.length == 0 || _options.excludes.indexOf(ch) < 0) {
          break;
        }
      } while (true);

      result.push(ch);
    }

    result = result.join('');

    if (type == RandomType.num) {
      if ((0, _locustjsBase.isNumber)(_options.from) && (0, _locustjsBase.isNumber)(_options.to)) {
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

  return result;
};

exports.generateRandom = generateRandom;

var RandomGeneratorBase = /*#__PURE__*/function () {
  function RandomGeneratorBase() {
    _classCallCheck(this, RandomGeneratorBase);

    if (this.constructor === RandomGeneratorBase) {
      throw "RandomGeneratorBase is abstract. You cannot instantiate from it.";
    }
  }

  _createClass(RandomGeneratorBase, [{
    key: "generate",
    value: function generate(options) {
      throw "".concat(this.constructor.name, ".generate() is not implemented");
    }
  }, {
    key: "next",
    value: function next(from, to) {
      throw "".concat(this.constructor.name, ".next() is not implemented");
    }
  }]);

  return RandomGeneratorBase;
}();

exports.RandomGeneratorBase = RandomGeneratorBase;

var RandomGeneratorDefault = /*#__PURE__*/function (_RandomGeneratorBase) {
  _inherits(RandomGeneratorDefault, _RandomGeneratorBase);

  var _super = _createSuper(RandomGeneratorDefault);

  function RandomGeneratorDefault(options) {
    var _this;

    _classCallCheck(this, RandomGeneratorDefault);

    _this = _super.call(this);
    _this.options = options;
    return _this;
  }

  _createClass(RandomGeneratorDefault, [{
    key: "generate",
    value: function generate(options) {
      if ((0, _locustjsBase.isSomeObject)(options)) {
        return generateRandom(options);
      } else {
        return generateRandom(this.options);
      }
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

  return RandomGeneratorDefault;
}(RandomGeneratorBase);

exports.RandomGeneratorDefault = RandomGeneratorDefault;

var __instance = new RandomGeneratorDefault();

var Random = /*#__PURE__*/function () {
  function Random() {
    _classCallCheck(this, Random);
  }

  _createClass(Random, null, [{
    key: "generate",
    value: function generate(options) {
      return __instance.generate(options);
    }
  }, {
    key: "next",
    value: function next(from, to) {
      return __instance.next(from, to);
    }
  }, {
    key: "Instance",
    get: function get() {
      return __instance;
    },
    set: function set(value) {
      if ((0, _locustjsBase.isEmpty)(value)) {
        throw "no object given to be set as current random generator.";
      } else if (value.constructor) {
        throw "random generator must have a constructor";
      } else if (!(0, _locustjsBase.isSubClassOf)(value.constructor, RandomGeneratorBase)) {
        throw "random generator must be a subclass of RandomGeneratorBase";
      }

      __instance = value;
    }
  }]);

  return Random;
}();

exports.Random = Random;