# Benchmarks results using jade 1.10.0 and ejs 2.3.1
Please note that ```compileDebug``` was disabled (to be expected in production), but also that ```self```(jade) was enabled/```with```(ejs) was disabled.
This is less likely to happen in production but otherwise ejs becomes incredibly slow because it relies on JavaScript's own ```with``` as opposed to jade's usage of the highly optimized https://github.com/ForbesLindesay/with.
Therefore, ejs can show all of its strength and is expected to outperform Jade because

1. Jade's for loop adds sugar to handle both arrays and objects -> additional runtime cost
2. Jade's for loop gets its own closure and variable scope

JSPerf numbers (http://jsperf.com/html-compilers) show that, even in the most synthetic of benchmarks, this should cause only a  10% - 15% drop and less on a 'real' website.

## Jade
- mixin-escape: 44930ms
- mixin-no-escape: 20945ms
- no-mixin-escape: 28157ms
- no-mixin-no-escape: 6409ms
- simple: 404ms

## Jade (alubbe optimized branch)
- mixin-escape: 7457ms
- mixin-no-escape: 2305ms
- no-mixin-escape: 7884ms
- no-mixin-no-escape: 1313ms
- simple: 259ms

## EJS
- mixin-escape: 6608ms
- mixin-no-escape: 1653ms
- no-mixin-escape: 7710ms
- no-mixin-no-escape: 1456ms
- simple: 310ms

# Identified reasons for performance differences

- [x] jade's escape function is slower than EJS' (20-30%, fixed with https://github.com/jadejs/jade/pull/1976)
- [x] Array.join is slower than +=, especially for a small number of items (15-50%, fixed with https://github.com/jadejs/jade/pull/1977)
- [ ] jade's ```each``` has to perform runtime checks whether to iterate of an array or object, making it a bit slower than two separate iteration implementations (~5%)
- [x] jade's ```each``` runs in an IIFE for variable scoping, losing quite a bit of performance (~20%, fixed by https://github.com/jadejs/jade/pull/1983)
- [x] jade's mixin implementation is really, really slow. It runs about 400% slower than EJS' functions. (fixed by https://github.com/jadejs/jade/pull/1982 - turned out to be a v8 bug)

See https://github.com/jadejs/jade/issues/1975
