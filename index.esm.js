import { Enum, isEmpty, isSomeObject, isNumber, isSubClassOf } from 'locustjs-base';

const RandomType = Enum.define({
    num		: 0,	// numeric
    alpha	: 1,	// letters (upper and lower)
    alphaNum: 2,    // numeric and letters
    upper	: 3,    // only upper letters
    lower	: 4,   	// only lower letters
    upperNum: 5,	// numbers and upper letters
    lowerNum: 6,	// numbers and lower letters
    custom	: 7
}, 'Resolve');

const generateRandom = (options) => {
	const _options = Object.assign({
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
		
	let result;
	
	const type = RandomType.getNumber(_options.type, 'num');

	if (!isNumber(_options.len)) {
		_options.len = undefined;
	}
	
	if (!isNumber(_options.minLen)) {
		_options.minLen = undefined;
	}
	
	if (!isNumber(_options.maxLen)) {
		_options.maxLen = undefined;
	}
	
	if (type == RandomType.num) {
		if (!isNumber(_options.from)) {
			_options.from = undefined;
		} else {
			_options.minLen = _options.from.toString().length;
		}
		
		if (!isNumber(_options.to)) {
			_options.to = undefined;
		} else {
			_options.maxLen = _options.to.toString().length;
		}
		
		if (_options.from > _options.to) {
			const temp = _options.from;
			_options.from = _options.to;
			_options.to = temp;
		}
	}
	
	if (isNumber(_options.minLen) && isNumber(_options.maxLen) && _options.minLen > _options.maxLen) {
		const temp = _options.minLen;
		_options.minLen = _options.maxLen;
		_options.maxLen = temp;
	}
	
	do {
		result = [];
		
		if (type == RandomType.num && _options.excludes.length == 0) {
			const from = _options.from == undefined ?
							(
								_options.minLen == undefined ?
									(_options.len == undefined ? 0: Math.pow(10, _options.len - 1))
									:
									Math.pow(10, _options.minLen - 1)
							)
							:
							_options.from;
			const to   = _options.to == undefined ?
							(
								_options.maxLen == undefined ?
									(_options.len == undefined ? 100000: Math.pow(10, _options.len) - 1)
									:
									(Math.pow(10, _options.maxLen) - 1)
							)
							:
							_options.to;
			
			result = Math.floor(Math.random() * (to - from)) + from;
			
			break;
		}
		
		if (_options.minLen == undefined) {
			_options.minLen = 5;
		}
		if (_options.maxLen == undefined) {
			_options.maxLen = 7;
		}
		
		const length = _options.len == undefined ?
							(Math.floor(Math.random() * (_options.maxLen - _options.minLen + 1)) + _options.minLen)
							:
							_options.len;
		
		for (let i = 1; i <= length; i++) {
			let ch;
			
			do {
				let r;
				
				switch (type) {
					case RandomType.num:
						r = Math.floor(Math.random() * 10);
						ch = String.fromCharCode(48 + r);
						break;
					case RandomType.alpha:
						r = Math.floor(Math.random() * 20);
						
						switch (r % 2) {
							case 0:	// upper
								r = Math.floor(Math.random() * 26);
								ch = String.fromCharCode(65 + r);
								break;
							case 1:	// lower
								r = Math.floor(Math.random() * 26);
								ch = String.fromCharCode(97 + r);
								break;
						}
						break;
					case RandomType.alphaNum:
						r = Math.floor(Math.random() * 30);
						
						switch (r % 3) {
							case 0:	// upper
								r = Math.floor(Math.random() * 26);
								ch = String.fromCharCode(65 + r);
								break;
							case 1:	// lower
								r = Math.floor(Math.random() * 26);
								ch = String.fromCharCode(97 + r);
								break;
							case 2:	// num
								r = Math.floor(Math.random() * 10);
								ch = String.fromCharCode(48 + r);
								break;
						}
						break;
					case RandomType.upperNum:
						r = Math.floor(Math.random() * 20);
						
						switch (r % 2) {
							case 0:	// upper
								r = Math.floor(Math.random() * 26);
								ch = String.fromCharCode(65 + r);
								break;
							case 1:	// num
								r = Math.floor(Math.random() * 10);
								ch = String.fromCharCode(48 + r);
								break;
						}
						break;
					case RandomType.lowerNum:
						r = Math.floor(Math.random() * 20);
						
						switch (r % 2) {
							case 0:	// lower
								r = Math.floor(Math.random() * 26);
								ch = String.fromCharCode(97 + r);
								break;
							case 1:	// num
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
						throw `uknown random type ${type}`
				}
				
				if (_options.excludes.length == 0 || _options.excludes.indexOf(ch) < 0) {
					break;
				}
			} while (true);
			
			result.push(ch);
		}
		
		result = result.join('');
		
		if (type == RandomType.num) {
			if (isNumber(_options.from) && isNumber(_options.to)) {
				const num = new Number(result);
				
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
}

class RandomGeneratorBase {
	constructor() {
		if (this.constructor === RandomGeneratorBase) {
            throw `RandomGeneratorBase is abstract. You cannot instantiate from it.`
        }
	}
	generate(options) {
		throw `${this.constructor.name}.generate() is not implemented`
	}
	next(from, to) {
		throw `${this.constructor.name}.next() is not implemented`
	}
}

class RandomGeneratorDefault extends RandomGeneratorBase {
	constructor(options) {
		super();
		
		this.options = options;
	}
	generate(options) {
		if (isSomeObject(options)) {
			return generateRandom(options);
		} else {
			return generateRandom(this.options);
		}
	}
	next(from, to) {
		return this.generate({ from, to, type: RandomType.num });
	}
}

let __instance = new RandomGeneratorDefault();

class Random {
    static get Instance() {
        return __instance;
    }
    static set Instance(value) {
        if (isEmpty(value)) {
			throw `no object given to be set as current random generator.`
		} else if (!(value instanceof RandomGeneratorBase)) {
            throw `random generator must be a subclass of RandomGeneratorBase`
        }

        __instance = value;
    }
	static generate(options) {
		return __instance.generate(options);
	}
	static next(from, to) {
		return __instance.next(from, to);
	}
}

export {
    RandomType,
	RandomGeneratorBase,
	RandomGeneratorDefault,
	Random,
    generateRandom
}