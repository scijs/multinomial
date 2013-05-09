"use strict"

var gcd = require("gcd")
var slice = require("generic-slice")

function multinomial(coef) {
  var numer = 1, denom = 1, i, j, k, n = coef.length, m, a, b, c, d
  k = 0
  for(i=0; i<n; ++i) {
    m = coef[i]|0
    for(j=1; j<=m; ++j) {
      ++k
      c = gcd(k, j)
      a = (k / c)|0
      b = (j / c)|0
      c = gcd(a, denom)
      d = gcd(numer, b)
      numer = ((numer/d)|0) * ((a/c)|0)
      denom = ((denom/c)|0) * ((b/d)|0)
    }
  }
  return numer
}

function wrapper() {
  if(arguments.length === 0) {
    return 1
  }
  if(arguments[0].length !== undefined) {
    return multinomial(arguments[0])
  }
  return multinomial(slice(arguments))
}

module.exports = wrapper