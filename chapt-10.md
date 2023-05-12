# MODULES

> Write code that is easy to delete, not easy to extend. - **Tef**, <i>Programming is Terrible</i>

**A module** is a piece of program that specifies which other pieces it relies on and which functionality it provides for other modules to use (its interface).

**A package** is a chunk of code that can be distributed (copied and installed). It <u>may contain one or more modules</u> and has information about which other packages it depends on.

A less scary way(than the use of eval()) of interpreting data as code is to use the Function constructor. It takes two arguments: a string containing a comma-separated list of argument names and a string containing the function body.

```javascript
let plusOne = Function("x,y", "let result = x+y; return result;");
console.log(plusOne(4, 5));
// → 5
```

## Building and Bundling

- <i>Compilers:</i> Translates a chosen JavaScript dialect to plain old JavaScript—or even to a past version of JavaScript—so that old browsers can run it.
- <i>Bundlers:</i> roll modular programs with multiple big files into a single big file. Fetching a single big file tends to be faster than fetching a lot of tiny ones.
- <i>Minifiers:</i> tools that take a JavaScript program and make it smaller by automatically removing comments and whitespace,renaming bindings, and replacing pieces of code with equivalent code that take up less space.

## Tips on Good Module Design 
https://eloquentjavascript.net/10_modules.html#h_P8pyzbI9vO
