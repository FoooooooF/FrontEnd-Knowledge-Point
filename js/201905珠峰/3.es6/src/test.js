"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol": typeof obj;
        };
    }
    return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf: function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    // 继承公共属性
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    // 继承父类的静态方法和属性 s
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !! right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
// 检查当前的this 是不是Constructor的实例
function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        // 原型的方法是不可枚举
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
// ConstructorAniaml protoProps 指代的是 原型上的方法 数组
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var Animal =
/*#__PURE__*/
function() {
    function Animal(type) {
        _classCallCheck(this, Animal);

        this.type = type;
    }

    _createClass(Animal, [{ // 分别定义到原型 和 类上
        key: "eat",
        value: function eat() {
            console.log('eat');
        }
    }], [{
        key: "fn",
        value: function fn() {
            return 'fn';
        }
    }]);

    return Animal;
} (); // 类是单继承的
// super 在构造函数中,和静态方法中 指代的是父类
// 在原型方法中指代的是父类的原型
// Tiger.__proto__ = Animal

// 静态属性
_defineProperty(Animal, "flag", 'animal');

var Tiger =
/*#__PURE__*/
function(_Animal) {
    _inherits(Tiger, _Animal);

    // call + Object.create
    function Tiger(type) {
        var _this;

        _classCallCheck(this, Tiger);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Tiger).call(this, type)); // super.call(this)
        console.log(_assertThisInitialized(_this));
        return _this;
    }

    _createClass(Tiger, [{
        key: "eat",
        value: function eat() {
            _get(_getPrototypeOf(Tiger.prototype), "eat", this).call(this);

            console.log('吃肉');
        }
    }], [{
        key: "fn",
        value: function fn() {
            return _get(_getPrototypeOf(Tiger), "fn", this).call(this);
        }
    }]);

    return Tiger;
} (Animal);

var tiger = new Tiger('哺乳类');
console.log(Tiger.fn());