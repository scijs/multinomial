multinomial
===========
Computes [multinomial](http://en.wikipedia.org/wiki/Multinomial_theorem) coefficients. Also allows efficiently computing entire sets of binomial and multinomial coefficients in one go.

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

### `require("multinomial").multinomials(n, d)`

Returns an object containing:

*`counts` An array containing "histograms" of the `d` numbers (each histogram sums to n).
*`coefs` An array with the multinomial coefficients corresponding to the histograms in `counts'.

Note that the order in which the coefficients are returned is fixed, but that it is not recommended to rely on this (other orders might have benefits over this one, so it might change in the future).

### `require("multinomial").binomials(n)`

Conceptually the same as `require("multinomial").multinomials(n, 2)`, but just returns the list of coefficients. In this case, the order of the coefficients *is* guaranteed. In particular, the i-th coefficient gives the number of ways in which one can pick i out of n positions.

# Credit
(c) 2013 Mikola Lysenko. MIT License
