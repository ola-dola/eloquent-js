# Chapter 6: The Secret Life of Objects

## Encapasulaion

> The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible for managing its own state.

> Different pieces of such a program interact with each other through **interfaces**, limited sets of functions or bindings that provide useful functionality at a more abstract level, hiding their precise implementation.

> Such program pieces are modeled using objects. Their interface consists of a specific set of methods and properties. Properties that are part of the interface are called public. The others, which outside code should not be touching, are called private.

- Javascript does not provide an inbuilt way to distinguish between public and private properties. It just makes private properties inaccessible by default.
- Developer can distinguish private ppties by including _ at the beginning of the property/method name.

> Separating interface from implementation is a great idea. It is usually called **encapsulation**.

## Prototypes

> Who is the prototype of empty object? It is the great ancestral prototype, the entity behind almost all objects, Object.prototype.

> You can use Object.create to create an object with a specific prototype.

## Maps

> Using plain objects as maps is dangerous, because they inherit extra properties from the Object.prototype which are at best not needed and at worst could lead to clashing properties. There are several possible ways to avoid this problem. First, it is possible to create objects with no prototype. If you pass null to Object.create, the resulting object will not derive from Object.prototype and can safely be used as a map.

```javascript
console.log("toString" in Object.create(null));
// → false
```

## Classes

> JavaScript classes are constructor functions with a prototype property(actually, all functions have a prototype ppty. Constructor functions just have extra methods added to the prototype by the programmer). That is how they work, and until 2015, that was how you had to write them.

```javascript
// Pre 2015
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");
```

```javascript
// Since 2015
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");
```

<br>

## Polymorphism

```javascript
Rabbit.prototype.toString = () => {
  return [1, 2, 4].toString();
};

let jaguar = new Rabbit("foxy");

console.log(String(jaguar));
// → a black rabbit 
```
- When a piece of code is written to work with objects that have a certain interface—in this case, a toString method—any kind of object that happens to support this interface can be plugged into the code, and it will just work.

- This technique is called polymorphism. Polymorphic code can work with values of different shapes, as long as they support the interface it expects.

## Getters, setters, and statics

> Interfaces often consist mostly of methods, but it is also okay to include properties that hold non-function values.

- It is not even necessary for such an object to compute and store such a property directly in the instance. Even properties that are accessed directly may hide a method call. Such methods are called **getters**, and they are defined by writing **get** in front of the method name in an object expression or class declaration.

```javascript
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};

console.log(varyingSize.size);
console.log(varyingSize.size);
```

- The opposite of getters are setter methods, used for writing to properties.

```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
```

<br>

> A static method (or static function) is a method defined as a member of an object but is accessible directly from an API object's constructor, rather than from an object instance created via the constructor.

- Methods called on object instances are called instance methods.
  <br>

## Exercises

```javascript
/*
1: A vector type
Write a class Vec that represents a vector in two-dimensional space. It takes x and y parameters (numbers), which it should save to properties of the same name.

Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (this and the parameter) x and y values.

Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).
*/

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
```

<br>

```javascript
/*
2: Group
Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.

Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.

More details: https://eloquentjavascript.net/06_object.html#i_rpYp9Ou4LG
*/

class Group {
  constructor() {
    this.store = [];
  }

  add(val) {
    if (!this.has(val)) {
      this.store.push(val);
    }
  }

  delete(val) {
    this.store = this.store.filter((ele) => ele !== val);
  }

  has(val) {
    return this.store.includes(val);
  }

  static from(iterable) {
    let group = new Group();
    for (const ele of iterable) {
      group.add(ele);
    }

    return group;
  }

  toString() {
    return this.store;
  }
}

let group = Group.from([10, 10, 20, 20, 30, 40]);
console.log(group.has(10));
// → true
console.log(group);
// → 10,20,30,40
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
console.log(group);
// → 20,30,40
```

<br>

```javascript
/*
3: Iterable Groups
Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

https://eloquentjavascript.net/06_object.html#i_djD3XDJ27V
*/

// This solution requires the Group class defined in Exercise 2 above.
class GroupIterator {
  constructor(group) {
    this.group = group;
    this.current = 0;
  }

  next() {
    if (this.current == this.group.store.length) {
      return { done: true };
    }
    let value = this.group.store[this.current];
    this.current += 1;
    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
```

<br>

```javascript
/*
4: Borrowing a Method
Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used as a more robust alternative to the `in` operator when you want to ignore the prototype’s properties. But what if your map needs to include the word "hasOwnProperty"? You won’t be able to call that method anymore because the object’s own property hides the method value.

Can you think of a way to call hasOwnProperty on an object that has its own property by that name?
*/

let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
//console.log(map.hasOwnProperty("one"));
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true

/*
HINT: Remember that methods that exist on plain objects come from Object.prototype.

Also remember that you can call a function with a specific `this` binding by using its call method.
*/
```
