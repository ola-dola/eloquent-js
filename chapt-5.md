# Chapter 5: Higher-Order Functions

## Exercises

```javascript
/*
1: Flattening
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.
*/

let arrays = [[1, 2, 3], [4, 5], [6]];

function flatten(arr) {
  return arrays.reduce((acc, current) => acc.concat(current));
}

console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
```

<br>

```javascript
/*
2: Your own loop
Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.

When defining the function, you can use a regular loop to do the actual looping.
*/

function loop(value, testFn, updateFn, bodyFn) {
  for (value; testFn(value); value = updateFn(value)) {
    bodyFn(value);
  }

  //   let result = true;
  //   while (result) {
  //     result = testFn(value);

  //     if (!result) {
  //       return;
  //     }

  //     bodyFn(value);
  //     value = updateFn(value);
  //   }
}

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);
// → 3
// → 2
// → 1
```
<br>

```javascript
/*
3: Everything
Analogous to the some method, arrays also have an every method. This one returns true when the given function returns true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method.
*/

function every(array, test) {
  // Your code here.
  for (const ele of array) {
    if (!test(ele)) return false
  }
  
  return true
}

function everyWithSome(array, test) {
    // HINT: To build every on top of some, we can apply De Morgan’s laws, which state that a && b equals !(!a || !b). This can be generalized to arrays, where all elements in the array match if there is no element in the array that does not match.

	return !array.some(ele => !test(ele))
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
```


