# Chapter 4: Data Structures: Objects and Arrays

> **Numbers, Booleans, and strings** are the atoms that **data structures** are built from. Think about the distinction.

<br>

> When you compare objects with JavaScript’s == operator, it compares by identity: it will produce true only if both objects are precisely the same value. Comparing different objects will return false, even if they have identical properties. There is no “deep” comparison operation built into JavaScript, which compares objects by contents

<br>

> To search for a specific value, arrays provide an indexOf method. The method searches through the array from the start to the end and returns the index at which the requested value was found—or -1 if it wasn’t found. To search from the end instead of the start, there’s a similar method called lastIndexOf.

```javascript
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
```

> Both indexOf and lastIndexOf take an optional second argument that indicates where to start searching.

<br>

## JSON

> Because properties only grasp their value, rather than contain it, objects and arrays are stored in the computer’s memory as sequences of bits holding the addresses—the place in memory—of their contents. So an array with another array inside of it consists of (at least) one memory region for the inner array, and another for the outer array, containing (among other things) a binary number that represents the position of the inner array.

- If you want to save data in a file for later or send it to another computer over the network, you have to somehow convert these tangles of memory addresses to a description that can be stored or sent. You could send over your entire computer memory along with the address of the value you’re interested in, I suppose, but that doesn’t seem like the best approach.

- What we can do is serialize the data. That means it is converted into a flat description. A popular serialization format is called JSON (pronounced “Jason”), which stands for JavaScript Object Notation. It is widely used as a data storage and communication format on the Web, even in languages other than JavaScript.
  <br>

## Exercises

```javascript
/*
1: The Sum of a Range
Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the example program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array. If no step is given, the elements go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
*/
function range(start, end, step = start < end ? 1 : -1) {
  let arr = [];

  while (start !== end) {
    arr.push(start);
    start += step;
  }

  arr.push(end);
  return arr;
}

function sum(nums) {
  let total = 0;

  for (let num of nums) {
    total += num;
  }

  return total;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
```

```javascript
/*
2: Reversing an array
Arrays have a reverse method that changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations? Which one runs faster?
*/

function reverseArray(arr) {
  let newArr = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }

  return newArr;
}

function reverseArrayInPlace(arr) {
  let midpoint = Math.floor(arr.length / 2);
  for (let i = 0; i < midpoint; i++) {
    let old = arr[i];

    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = old;
  }

  return arr;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// reverseArray() would be more useful. It is a pure function with no side-effects and doesn't change the original array.
// reverseArrayInPlace() would be faster. We only need to loop through half of the array.
```

```javascript
/*
3: Linked list helper functions.
  Long problem description. See https://eloquentjavascript.net/04_data.html#i_nSTX34CM1M for details
*/

function arrayToList(arr) {
  let list, lastNode;

  for (const ele of arr) {
    const node = { value: ele, rest: null };

    if (!list) {
      list = node;
    } else {
      lastNode.rest = node;
    }

    lastNode = node;
  }
  return list;

  // CodiumAI generated.
  // const list = arr.reduceRight((rest, value) => {
  //   ({ value, rest }), null;
  // });
  // return list;
}

function listToArray(list) {
  let arr = [];

  while (list) {
    arr.push(list.value);
    list = list.rest;
  }

  return arr;
}

function prepend(element, list) {
  return { value: element, rest: list };
}

function nth(list, target) {
  if (!list || target < 0) return undefined;
  else if (target == 0) return list.value;

  return nth(list.rest, target - 1);
}

console.log(arrayToList([10, 20, 30]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
```
