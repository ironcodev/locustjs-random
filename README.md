# locustjs-random
The aim of this library is helping in producing random sequence of characters.

The library contains an abstract RandomGeneratorBase class with a default RandomGeneratorDefault implementation.

The base class has a generate() function that is used to generate random string. This method receives a generation option argument and generates the random sequence based on the given options.

Here is an example:

```javascript
import { RandomGeneratorDefault, RandomType } from 'locustjs-random';

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

generation options are as follows:

| name   |      description      |  default |
|----------|:-------------:|------:|
| minLen |  minimum sequence length. Used when generating a random sequence of characters with random length between minLen and maxLen | 5 |
| maxLen |    exact sequence length. Result will be exactly n characters.   | 7 |
| type | num, alpha, alphaNum, upper, lower, upperNum, lowerNum, custom. accepted values: string, number or RandomType enum values.  | 'num' |
| from | starting random number. Used when generating random numbers. | |
| to | ending random number. Used when generating random numbers. |     |
| chars | List of characters to be used to produce random characters. | [ ]  |
| excludes | Excluded characters | [ ] |

There is a static Random helper class with a static Instance property which by default returns an instance of RandomGeneratorDefault. So, the random generation could be simplified:

```javascript
var s1 = Random.generate({ type: 'alpha', len: 10 });
var s2 = Random.generate({ type: 'num', from: 1000, to: 9999 });
var s3 = Random.generate({ type: 'custom', chars: ['a', 'b', 'c', 'x', 'y', 'z', '1', '2', '3' ], len: 5 });
```
## Random generation types
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





