let fs = require("fs");
let files =["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

console.log("Before");
for(let i=0;i<files.length;i++){
    fs.readFile(files[i], cb);
}
function cb(err, content){
    if(err){
        console.log(err);
    }else{
        console.log("content => " + content);
    }
}
console.log("After");




// This below will give error 
// Because in this callback will wait for forloop to end or for i increase
// And i will not increase because it is written in callback
// Thats why there is condition of deadlock and for loop will be infinite
// Refer notes for diagram  ----> 11 January

// let fs = require("fs");
// let files =["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

// console.log("Before");
// for(let i=0;i<files.length;){
//     fs.readFile(files[i], cb);
// }
// function cb(err, content){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("content => " + content);
//         i=i+1
//     }
// }
// console.log("After");