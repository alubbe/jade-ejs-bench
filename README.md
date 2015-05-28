# Benchmarks results using jade 1.10.0 and ejs 2.3.1
Please note that ```compileDebug``` was disabled (to be expected in production), but also that ```self```(jade) was enabled/```with```(ejs) was disabled.
This is less likely to happen in production but otherwise ejs becomes incredibly slow because it relies on JavaScript's own ```with``` as opposed to jade's usage of the highly optimized https://github.com/ForbesLindesay/with.
Therefore, ejs can show all of its strength and is expected to outperform Jade because

1. Jade's for loop adds sugar to handle both arrays and objects -> additional runtime cost
2. Jade's for loop gets its own closure and variable scope

JSPerf numbers (http://jsperf.com/html-compilers) show that, even in the most synthetic of benchmarks, this should cause only a  10% - 15% drop and less on a 'real' website.

## Jade
mixin-escape: 38752ms
mixin-no-escape: 20419ms
no-mixin-escape: 22701ms
no-mixin-no-escape: 6417ms
simple: 369ms

## Jade (alubbe optimized branch)
mixin-escape: 25609ms
mixin-no-escape: 17433ms
no-mixin-escape: 9301ms
no-mixin-no-escape: 2188ms
simple: 22ms

## EJS
mixin-escape: 6533ms
mixin-no-escape: 1706ms
no-mixin-excape: 7370ms
no-mixin-no-escape: 1547ms
simple: 288ms

# Identified reasons for performance differences

- Jade's mixins are extremely low (currently investigating)
- Jade's escape method can be improved (fixed in alubbe branch)
- String concatenation via += is faster than [].join (fixed in alubbe branch)
