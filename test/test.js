var waitforit = require('../'),
    assert = require('assert');

describe('generating a new instance', function() {
    describe('where every callback takes place in the same tick', function() {
        it('should call the complete callback', function(done) {
            var waiter = waitforit(function() {
                done();
            });
            waiter()();
            waiter()();
        });
        it('should only call the complete callback once', function(done) {
            var i = 0;
            var waiter = waitforit(function(obj) {
                i++;
            });
            waiter()();
            waiter()();
            setTimeout(function() {
                assert(i === 1, "Callback called more than once");
                done();
            }, 20);
        });
    });

    describe('where nexts are given names', function() {
        describe('that don\'t get values', function() {
            describe('complete', function() {
                it('should have two keys with undefined', function(done) {
                    var waiter = waitforit(function(args) {
                        assert(Object.keys(args).length == 2, "Arguments don't have two keys");
                        assert(args["a"] === undefined && args["b"] === undefined, "Arguments aren't undefined");
                        done();
                    });
                    waiter("a")();
                    waiter("b")();
                });
            });

            describe('complete', function() {
                it('should have two keys with the values 5 & 7', function(done) {
                    var waiter = waitforit(function(args) {
                        assert(Object.keys(args).length == 2, "Arguments don't have two keys");
                        assert(args["a"] === 5 && args["b"] === 7, "Arguments don't have the rigth values");
                        done();
                    });
                    waiter("a")(5);
                    waiter("b")(7);
                });
            });
        });
    });
});

// TODO: test return value of complete
// TODO: test callbacks in async calls
// TOOD: test that the callback's context is itself
