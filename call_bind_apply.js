// call
let person = { name: "github" };

function fun(city, place) {
  console.log(
    `my name is ${this.name} and city is ${city} and place is ${place}`
  );
}

fun.call(person, "Tokyo", "Japan");

// apply
fun.apply(person, ["Tokyo", "Japan"]);

// bind
let lang = { name: "java" };
function fun(some) {
  console.log(`the language is ${this.name} and ${some}`);
}

const newfun = fun.bind(lang);
newfun("something");
