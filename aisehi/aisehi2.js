function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

function rateLimiter(fn, limit) {
  let on = false;
  return function () {
    if (on) {
      return "Rate limit exceeded";
    }
    on = true;
    fn();
    setTimeout(() => {
      on = false;
    }, limit);
  };
}

function memoize(fn) {
    let obj = {}
    return function(){

    }
}

function Animal() {}
Animal.prototype.makeSound = function(){
    return "Animal sound"
}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.bark = function(){
    return "Woof!"
}

// Task 2
function Shape(color) {
    this.color = color
}

Shape.prototype.getColor = function(){
    return this.color
}

function Rectangle(width, height, color) {
    this.width = width
    this.height = height
    this.color = color
}

Rectangle.prototype = Object.create(Shape.prototype)

Rectangle.prototype.getArea = function(){
    return this.width*this.height
}


