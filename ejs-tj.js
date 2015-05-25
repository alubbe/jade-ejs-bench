var ejs   = require('ejs-tj')
var fs    = require('fs')

var ejsCompiled   = []
var locals        = [ 
  {
    things: [
      { a: 'blah', b: 'halb' }
    , { a: 'clah', b: 'halc' }
    , { a: 'clah', b: 'halc' }
    , { a: 'blah', b: 'halb' }
    , { a: 'clah', b: 'halc' }
    , { a: 'clah', b: 'halc' }
    , { a: 'clah', b: 'halc' }
    , { a: 'blah', b: 'halb' }
    , { a: 'blah', b: 'halb' }
    , { a: 'clah', b: 'halc' }
    , { a: 'blah', b: 'halb' }
    ]
  }
, {}
]

// Jade doesn't use with () {} so make it fair
// Jade also doesn't support dynamic inclusion
var ejsOpts  = { _with: false }
var ejsOpts  = { compileDebug: false, _with: false }

var files = fs.readdirSync('jade').map(function (f) {
  return f.split('.')[0]
})

for (var i = 0; i < files.length; i ++) {
  var f = files[i]
  var src = fs.readFileSync('ejs/' + f + '.ejs', 'utf8')
  ejsCompiled.push(ejs.compile(src, ejsOpts))
}

for (var i = 0; i < files.length; i ++) {
  var f = files[i]
  var local = locals[i]

  var fn = ejsCompiled[i]
  console.time(f)
  for (var j = 0; j < 1000000; j ++) fn(local)
  console.timeEnd(f)
}
