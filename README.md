## wait for it..
A simple module for parallel execution with a shared complete callback

### Usage:

### TODO:
- maybe support cancelling?
- how do we support failures, where none of the callbacks get called? do we need to worry about that? maybe that should be userland
- have the complete callback take in an error object if there's an error (?) not sure if it should try to wrap stuff
  or if it should have all the next callbacks take in an error object as the first parameter
- finish more unit tests
