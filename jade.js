var jade  = require('jade')
var fs    = require('fs')

var jadeCompiled  = []
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

var jadeOpts = {  }
var jadeOpts = { compileDebug: false }
var jadeOpts = { compileDebug: false, self: true }

var files = fs.readdirSync('jade').map(function (f) {
  return f.split('.')[0]
})

for (var i = 0; i < files.length; i ++) {
  var f = files[i]
  var src = fs.readFileSync('jade/' + f + '.jade', 'utf8')
  jadeCompiled.push(jade.compile(src, jadeOpts))
}

for (var i = 0; i < files.length; i ++) {
  var f = files[i]
  var local = locals[i]

  var fn = jadeCompiled[i]
  for (var j = 0; j < 100000; j ++) fn(local)
  console.time(f)
  for (var j = 0; j < 1000000; j ++) fn(local)
  console.timeEnd(f)
}
