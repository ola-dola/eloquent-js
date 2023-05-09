# Errors

## Testing

Automated tests are programs that test other programs.

## Exceptions

Exceptions are a mechanism that makes it possible for code that runs into a problem to raise (or throw) an exception. An exception can be any value. Raising one somewhat resembles a super-charged return from a function: it jumps out of not just the current function but also its callers, all the way down to the first call that started the current execution(could be the bottom of the stack if  no catch is found, in which case it is caught by the standard language catch block itself). This is called **unwinding the stack**.

An exception zooms down the stack of functon calls, throwing away all the call contexts it encounters.

Their power lies in the fact that you can set “obstacles” along the stack to catch the exception as it is zooming down. Once you’ve caught an exception, you can do something with it to address the problem and then continue to run the program.

> In most JavaScript environments, instances of the Error constructor also gather information about the call stack that existed when the exception was created, a so-called stack trace. This information is stored in the stack property and can be helpful when trying to debug a problem: it tells us the function where the problem occurred and which functions made the failing call.

<br>

There is another feature that try statements have. They may be followed by a `finally` block either instead of or in addition to a catch block. A finally block says “no matter what happens, run this code after trying to run the code in the try block.”

```javascript
// Take a DEEP look at this interesting pattern
// https://eloquentjavascript.net/08_error.html#p_lhrnmP99dZ
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;

    // Possible exception thrown in getAccount() fn
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    // Damage repair
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}
```

This version of the function tracks its progress, and if, when leaving, it notices that it was aborted at a point where it had created an inconsistent program state, it repairs the damage it did.

> As a general rule, don’t blanket-catch exceptions unless it is for the purpose of “routing” them somewhere—for example, over the network to tell another system that our program crashed. And even then, think carefully about how you might be hiding information.

- Check how the error type checking was discussed here: https://eloquentjavascript.net/08_error.html#p_o1E5pkUD5g. The author mentioned using the error message to check error type is a shaky method to write code. If the error message changes, or translated for whatever reason at the point where the exception was thrown, then the `if` check fails.

- Better approach is to define a custom error class and check using `instanceof`.

```javascript
// No constructor defined. This means InputError is the same as th default Error. Same ppties and methods. Only diff now is the custom prototype chain.
class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}

// =============(0)__(o) ===========

for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again.");
    } else {
      throw e;
    }
  }
}
```

## Assertions
Assertions are checks inside a program that verify that something is the way it is supposed to be. They are used not to handle situations that can come up in normal operation but to find programmer mistakes.

```javascript
function firstElement(array) {
    // The if block here is an assertion.
  if (array.length == 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
```

> I do not recommend trying to write assertions for every possible kind of bad input. That’d be a lot of work and would lead to very noisy code. You’ll want to reserve them for mistakes that are easy to make (or that you find yourself making).

- Typescript also takes care of cases like this example 'easily'.