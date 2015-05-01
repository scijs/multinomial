"use strict"

var gcd = require("gcd")
var slice = require("generic-slice")
var assert = require("assert")
require('array.from')

module.exports = wrapper
module.exports.multinomials = multinomialCoefficients
module.exports.binomials = binomialCoefficients

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

function binomialCoefficients(n) {
  assert(n>=0 && n==n|0, "Can only generate binomial coefficients for non-negative integers.")
  var coefs = new Array(n+1)
  coefs[0] = 1 // Only one way to select 0 elements
  for(var k=1; k<=n; k++) {
    // The last coef was n!/((k-1)! (n-k+1)!), the new one should be n!/(k! (n-k)!), so we need to multiply by (n-k+1)/k
    coefs[k] = (coefs[k-1]*(n-k+1)/k) |0 // Make sure we stick to integers (the answer should clearly be an integer)
  }
  return coefs
}

function multinomialCoefficients(n, d) {
  assert((typeof n) === "number" || n instanceof Number, "n must be a number")
  assert((typeof d) === "number" || d instanceof Number, "d must be a number")
  assert((n%1)===0 && (d%1)===0, "n and d must be integers")
  assert(n>=0, "n must be non-negative")
  assert(d>0, "d must be positive")

  function multUpdate(i1, i2) { // Increase count for i1, decrease count for i2, and update multinomial coefficient.
    var m1 = counthist[i1]
    var m2 = counthist[i2]
    coef = (coef*m2/(m1+1)) |0 // New coefficient (always remains an integer)
    counthist[i1] += 1
    counthist[i2] -= 1
  }

  // Gather multiplicities for all (non-decreasing) sequences of counts in lexicographic order
  // That is, we imagine counthist to be a run-length encoded (non-decreasing) sequence of numbers in the range [0,d), and we iterate over those in lexicographic order.
  var counthist = new Int32Array(d), allCounts = [], coef = 1, coefs = [coef]
  counthist[0] = n // Initially we have n zeroes
  allCounts.push(Array.from(counthist))
  while(counthist[d-1]<n) { // Loop while something can be increased
    for(var i=d-1; i-->0;) { // Find right-most assignment that can be increased (skipping d-1!)
      if (counthist[i]>0) break
    }
    multUpdate(i+1, i)
    if (i+1<d-1) {
      // Make sure we have the lowest non-decreasing sequence with this prefix by changing all the d-1's into i+1's.
      while(counthist[d-1]>0) {
        multUpdate(i+1, d-1)
      }
    }
    allCounts.push(Array.from(counthist))
    coefs.push(coef) // Push onto list with multiplicities
  }

  return {counts: allCounts, coefs: coefs}
}
