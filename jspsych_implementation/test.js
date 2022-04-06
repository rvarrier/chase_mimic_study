let x = [1,2]
//.console.log(x)
//x.push(3,4)
console.log(x)
//console.log(x.slice(1,3))

//console.log(true && true)

console.log(x.find(element => 0))
console.log(x.find(element => 1))
const y = x.find(element => element == 1)

n=10
console.log('e.g. 1')
if (x.find(element => element == n) == undefined){
    console.log('undefined')
}else{
    console.log('found')
}

console.log('e.g. 2')
if (x.find(element => element == n)){
    console.log('found')
}else{
    console.log('undefined')
}