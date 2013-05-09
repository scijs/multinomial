multinomial
===========
Computes [multinomial](http://en.wikipedia.org/wiki/Multinomial_theorem) coefficients.

Example
=======

```javascript

var multi = require("multinomial")

console.log(multi(7, 4, 2)) // Prints: 25740
```

Install
=======

    npm install multinomial
    
### `require("multinomial")(a0, a1, ... )`
Computes the multinomial coefficient, or in other words:

```
     /                     \
    |  a0 + a1 + a2 + ...   |
    |                       |
    | a0   a1    a2   ...   |
     \                     /
```

**Note** You can also pass an array as input instead of a list of arguments.

# Credit
(c) 2013 Mikol Lyasenko. MIT License
