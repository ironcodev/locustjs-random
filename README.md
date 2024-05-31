# locustjs-random
This library helps in producing random sequence of characters.

# Installation

```
npm i @locustjs/random
```

# Types
## `RandomGeneratorBase`
It is an abstract class that defines structure of random classes. It currently has a default `RandomGeneratorDefault` implementation.

## Methods
### `next(min, max)`
Generates a new random number between `min` (inclusive) and `max` (exclusive).

```javascript
const random = new RandomGeneratorDefault();

for (let i = 0; i < 10; i++) {
  const s = random.next(10, 100);
    
    console.log(s);
}

/*
12
25
67
34
19
81
44
73
25
31
*/
```

### `generate(options)`
Generates a new random sequence based on the given `options`.

`options` is an object with the properties described below:

| Property   | Type |     Description      |  Default |
|----------|-----|--------|------|
| `type` | string, number, `RandomType` | specifies type of random sequence based on different values `RandomType` enum provides (listed in next table).  | 'num' |
| minLen |  number | minimum sequence length. Used when generating a random sequence of characters with random length between minLen and maxLen | 5 |
| maxLen | number |   maximum sequence length. | 7 |
| len | number | explicit fixed sequence length.  | undefined |
| from | number | starting number. Used when generating random numbers (when `type` is `num`). | |
| to | number | ending random number. Used when generating random numbers (when `type` is `num`). |     |
| chars | array | List of characters to be used to produce random characters. | [ ]  |
| excludes | list of characters that should be excluded when generating random sequence. | [ ] |

## `RandomType` enum values
| type   |      description      | value |
|----------|:-------------:|:---:|
| num |  numeric | 0 |
| alpha |  english alphabet letters, uppercase and lowercase | 1 |
| alphaNum |  alphabet letters and numeric | 2 |
| upper |  only uppercase letters | 3 |
| lower |  only lowercase letters | 4 |
| upperNum |  uppercase letters and numbers | 5 |
| lowerNum |  lowercase letters and numbers | 6 |
| custom | custom characters. requires settings 'chars'. | 7 |

Example:

```javascript
import { RandomGeneratorDefault, RandomType } from '@locustjs/random';

const random = new RandomGeneratorDefault();

for (let i = 0; i < 10; i++) {
  const s = random.generate({
    type: RandomType.alphaNum,
    len: 10
  });
    
    console.log(s);
}
```
Result:
```
f0ivY4eJwH
nzLkl5s80k
9G5RjUK96j
9ppD91iehG
ze1a10M3l7
xyN00yi1YV
oENcb7w85E
P72zCw361S
50tJcr1m9c
N262uQBZJ9
```

## `Random` static class

There is a static helper class named `Random` that simplifies generating random sequences.

```javascript
var s1 = Random.generate({ type: 'alpha', len: 10 });
var s2 = Random.generate({ type: 'num', from: 1000, to: 9999 });
var s3 = Random.generate({ type: 'custom', chars: ['a', 'b', 'c', 'x', 'y', 'z', '1', '2', '3' ], len: 5 });
```

`Random` has a static `instance` property that is used internally by static `generate` and `next` methods.
By default `Random.instance` is set with an instance of `RandomGeneratorDefault`, however, it is a `setter` property and can be set with an instance of any subclass of `RandomGeneratorBase`, enabling developer to use his own implementation of random sequence generator.

```javascript
class MyRandomGenerator extends RandomGeneratorBase {
  ...
}

Random.instance = new MyRandomGenerator()

console.log(Random.generate({ type: 'alpha' }))
```