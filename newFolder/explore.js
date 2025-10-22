// function outer() {
//   let count = 4;
//   return function () {
//     count++;
//     return count;
//   };
// }

// let increment = outer();
// console.log(increment());
// console.log(increment());
// console.log(increment());
// console.log(increment());

// function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let success = true;
//       if (success) {
//         resolve("Data fetched successfully");
//       } else {
//         reject("Error fetching data");
//       }
//     }, 2000);
//   });
// }

// fetchData()
//     .then((data) => {
//         console.log(data)
//         return "something"
//     })
//     .then((chainData)=>{
//         console.log(chainData)
//     })
//     .catch((error) => {
//         console.log(error)
//     })


// const person = {
//     name : "this name",
//     greet(){
//         console.log(`hi my name is ${this.name}`)
//     }
// }

// person.greet()

// const ref = person.greet
// ref()

// const refNew = person.greet.bind({name:"new name"})
// refNew()

// function fetchUserData(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({name:"name",url:"this is a url"})
//         }, 2000);
//     })
// }

// async function getUserData(){
//     try {
//         console.log("Fetching user data....")
//         let userData = await fetchUserData()
//         console.log("Data fetched Successfully ",userData)
//     } catch (error) {
//         console.log("Error fetching user data ",error);
//     }
// }
// getUserData()

function* generator(){
    yield 1
    yield 2
    yield 3
}

let gen = generator()
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)

let gen2 = generator()
console.log(gen2.next().value)
console.log(gen2.next().value)
console.log(gen2.next().value)
console.log(gen2.next().value)
console.log(gen2.next().value)


