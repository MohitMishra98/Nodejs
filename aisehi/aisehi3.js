// Task 1
const person = {
  name: "name",
  introduce() {
    return `my name is ${this.name}`;
  },
};

const introduce = person.introduce.bind(person);

// Task 2
function introduce() {
  return `my name is ${this.name}`;
}
introduce.call({name:"name1"})
introduce.call({name:"name2"})
// Task 3

