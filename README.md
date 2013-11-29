## wait for it..
A simple module for parallel execution with a shared complete callback

### Usage:

Install using:
```
npm install waitforit
```

Start two async calls that can run in parallel:
```javascript
var waitforit = require('waitforit');

var wait = waitforit(function(err) {
    console.log("Complete called");
});

var first = wait();
setTimeout(function() {
    first();
}, Math.random() * 1000);

var second = wait();
setTimeout(function() {
    second();
}, Math.random() * 1000);
```

Have the callbacks return results:
```javascript
var waitforit = require('waitforit');

var wait = waitforit(function(err, results) {
    console.log("Complete called with results: ", results);
    // results will be {"key 1": "value 1", "key 2": "value 2"}
});

var first = wait('key 1');
setTimeout(function() {
    first('value 1');
}, Math.random() * 1000);

var second = wait('key 2');
setTimeout(function() {
    second('value 2');
}, Math.random() * 1000);
```

Sometimes you might not have generated all the async handlers right away, or you want to have
the handlers called multiple times (with the last result overriding the previous) you can
control whether or not you're done by returning a boolean for whether or not it's done in the
complete callback.
```javascript
var wait = waitforit(function(err, results) {
    if (!results.key1 || !results.key2) {
        return false;
    }
    // do something with the results
});
```

Note that the final callback will be called immediately if any of the async handlers get passed
an error.

### TODO:
- maybe support cancelling?
