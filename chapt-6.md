# Chapter 6: The Secret Life of Objects

## Encapasulaion

> The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible for managing its own state.

> Different pieces of such a program interact with each other through **interfaces**, limited sets of functions or bindings that provide useful functionality at a more abstract level, hiding their precise implementation.

> Such program pieces are modeled using objects. Their interface consists of a specific set of methods and properties. Properties that are part of the interface are called public. The others, which outside code should not be touching, are called private.

- Javascript does not provide an inbuilt way to distinguish between public and private properties. It just makes private properties inaccessible by default.
- Developer can distinguish private ppties by including \_ at the beginning of the property/method name.

> Separating interface from implementation is a great idea. It is usually called **encapsulation**.

## Prototypes

> So who is the prototype of that empty object? It is the great ancestral prototype, the entity behind almost all objects, Object.prototype.

> You can use Object.create to create an object with a specific prototype.

## Classes

> So JavaScript classes are constructor functions with a prototype property. That is how they work, and until 2015, that was how you had to write them.

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

