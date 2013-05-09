"use strict"

var multi = require("../multi.js")

require("tap").test("multinomial", function(t) {

  t.equals(multi(0, 5), 1)
  t.equals(multi(1, 4), 5)
  
  t.equals(multi(7, 4, 2), 25740)
  t.equals(multi(9, 8, 4), 145495350)

  t.end()
})