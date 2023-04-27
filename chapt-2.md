# Chapter 2: Program Structure

- do...while loop: useful when you need the body of the code to execute at least once. For example, when prompting for user input, you would want to the user to have entered something before checking the condition for accuracy or whatever.

- [GOTCHA]: Switch statement does not only execute the case that matches the condition. It starts executing from the case and only stops on encountering the first `break` or at the end of the statement. So it could run multiple cases below the starting case if there's no break.

## Exercises

```javascript
/*
1: Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/

for (let str = "#"; str.length <= 7; str += "#") {
  console.log(str);
}
```

```javascript
/*
2: FizzBuzz
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/

for (let i = 1; i <= 100; i++) {
  let str = "";
  if (i % 3 == 0) str += "Fizz";
  if (i % 5 == 0) str += "Buzz";

  if (str) console.log(i, str);
}
```

```javascript
/*
3: Chessboard
Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #
When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height.
*/

let str = "";
let size = 8;

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if ((i + j) % 2 == 0) {
      str += " ";
    } else {
      str += "#";
    }
  }

  str += "\n";
}

console.log(str);
```
