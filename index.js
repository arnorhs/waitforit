module.exports = function(complete) {
    var generated = [],
        called = {},
        args = {},
        completeCalled = false,
        ids = 0;
    return function(key) {
        var index = ids++;
        generated.push(index);
        return function(value) {
            called[index] = true;
            if (key !== undefined) {
                args[key] = value;
            }
            process.nextTick(function() {
                if (completeCalled || !allCalled(generated, called)) {
                    return;
                }
                var result = complete.call(complete, args);
                completeCalled = result === undefined ? true : result;
            });
        };
    };
}

function allCalled(generated, called) {
    for (var i = 0, l = generated.length; i < l; i++) {
        if (!called[generated[i]]) {
            return false;
        }
    }
    return true;
}

