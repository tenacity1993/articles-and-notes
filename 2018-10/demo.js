let ary = [1, 2, 3, 4, 5]
let ary2 = [1, 2, {name:'Tom', age:5}]
let obj = {
  name: 'Ada',
  age: '18',
  city: 'Beijing'
}

// for (const i in ary) {
//   console.log(i, ary[i])
// }

for (const i in obj) {
  console.log(i, obj[i])
}

// for (const i of ary) {
//   console.log(i, ary[i])
// }

// for (const i of obj) {
//   console.log(i)
// }

// for (const i of Object.keys(obj)) {
//   console.log(i, obj[i])
// }
// console.log(ary2, Array.isArray(ary2))


// ary2.value = 1


// for (const i in ary2) {
//   console.log(i, ary2[i])
// }
// console.log(ary2, Array.isArray(ary2))

// for (const i of ary2) {
//   console.log(i, ary2[i])
// }

// ary.forEach(item => {
//   if(item === 1) {
//     break
//   } else {
//     console.log(item)
//   }
// })