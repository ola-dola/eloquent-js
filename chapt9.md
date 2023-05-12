# Regular Expressions

A regular expression consisting of only nonspecial characters simply represents that sequence of characters. If abc occurs anywhere in the string we are testing against (not just at the start), test will return true.

```javascript
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
```

<br>

> In a regular expression, putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets.

```javascript
console.log(/[0123456789]/.test("in 1992"));
// → true
```

> Within square brackets, a hyphen (-) between two characters can be used to indicate a range of characters, where the ordering is determined by the character’s Unicode number. Characters 0 to 9 sit right next to each other in this ordering (codes 48 to 57), so [0-9] covers all of them and matches any digit.

```javascript
// All the following expressions match all strings that contain a digit:

console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
console.log(/\d/.test("in 1993"));
```

> A number of common character groups have their own built-in shortcuts. Digits are one of them: \d means the same thing as [0-9].

<table>
<tbody>
<tr><td><code>\d</code></td><td>Any digit character</td>
</tr>
<tr><td><code>\w</code></td><td>An alphanumeric character (“word character”)</td>
</tr>
<tr><td><code>\s</code></td><td>Any whitespace character (space, tab, newline, and similar)</td>
</tr>
<tr><td><code>\D</code></td><td>A character that is <em>not</em> a digit</td>
</tr>
<tr><td><code>\W</code></td><td>A nonalphanumeric character</td>
</tr>
<tr><td><code>\S</code></td><td>A nonwhitespace character</td>
</tr>
<tr><td><code>.</code></td><td>Any character except for newline</td>
</tr>
</tbody></table>

<br>

> To invert a set of characters—that is, to express that you want to match any character except the ones in the set—you can write a caret (^) character after the opening bracket.

```javascript
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true

// note that \D is also an inversion of \d, \W an inversion of \w and so on.
```

<br>

## Repeating Parts of a Pattern

Plus sign (+) after something in a regular expression indicates that the element may be repeated more than once. Thus, /\d+/ matches one or more digit characters.

```javascript
console.log(/'\d'/.test("'123'"));
// → false
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
```

- The star (\*) has a similar meaning but also allows the pattern to match zero times. Something with a star after it never prevents a pattern from matching—it’ll just match zero instances if it can’t find any suitable text to match.

## Optional rule

A question mark makes a part of a pattern optional, meaning it may occur zero times or one time.

```javascript
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
```

## Range

To indicate that a pattern should occur a precise number of times, use braces: {4} for example, requires it to occur exactly four times.

- To specify a range: {2,4} means the element must occur at least twice and at most four times.
- Open-ended range: {5,} means five or more times

```javascript
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true
```

## Grouping Subexpressions

To use an operator like \*, + or ? on more than one element at a time, you have to use parentheses. A part of a regular expression that is enclosed in parentheses counts as a single element as far as the operators following it are concerned.

```javascript
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
let cartoonCrying2 = /boo+(hoo+)?koo/i;
console.log(cartoonCrying2.test("Bookoo"));
// → true
```

- The first and second + characters apply only to the second o in boo and hoo, respectively. The third + applies to the whole group (hoo+), matching one or more sequences like that.

> The `i` at the end of the expression in the example makes this regular expression **case insensitive**

## Matches And Groups

In addition to `test`, regex also have an exec (execute) method that will return **null** if no match was found and return an object with information about the match otherwise.

```javascript
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
```

> String values have a **`match`** method that behaves similarly(returns same object type, same content and all).

```javascript
console.log("she said 'hello' 454".match(/hello/));
// → ["hello"]
```

> When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up in the array. The whole match is always the first element. The next element is the part matched by the first group (the one whose opening parenthesis comes first in the expression), then the second group, and so on.

```javascript
let quotedText = /(said) '([^']*)'/;
console.log(quotedText.exec("she said 'hello' 454"));
// → ["said 'hello'", "said", "hello"]
```

- When a group does not end up being matched at all (for example, when followed by a question mark), its position in the output array will hold undefined. Similarly, when a group is matched multiple times, only the last match ends up in the array.

```javascript
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]
```

- Groups can be **useful for extracting parts of a string**. If we don’t just want to verify whether a string contains a date but also extract it and construct an object that represents it, we can wrap parentheses around the digit patterns and directly pick the date out of the result of exec.

## The Date Class

> JavaScript uses a convention where month numbers start at zero (so December is 11), yet day numbers start at one. This is confusing and silly. Be careful.

```javascript
console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)

// The last four arguments (hours, minutes, seconds, and milliseconds) are optional and taken to be zero when not given.
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
```

## Backtracking

https://eloquentjavascript.net/09_regexp.html#h_NFMtGK0tD3

##Exercises

```javascript
/*
1: Regexp Golf
For each of the following items, write a regular expression to test whether any of the given substrings occur in a string.

1. car and cat
3. pop and prop
3. ferret, ferry, and ferrari
4. Any word ending in ious
5. A whitespace character followed by a period, comma, colon, or semicolon
6. A word longer than six letters
7. A word without the letter e (or E)

More details: https://eloquentjavascript.net/09_regexp.html#i_vDM8PzwQWU
*/

verify(/cat|car/, ["my car", "bad cats"], ["camper", "high art"]);

verify(/pop|prop/, ["pop culture", "mad props"], ["plop", "prrrop"]);

verify(
  /ferret|ferry|ferrari/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]
);

verify(
  /ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]
);

verify(/\s[.,:;]/, ["bad punctuation ."], ["escape the period"]);

verify(
  /\w{7,}/i,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]
);

verify(
  /[^e]*/,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]
);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}
```
