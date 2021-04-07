let fs = require("fs");
console.log("before");
//Multithreading
// Jis function m callback aaya vo heavy function hai isliye
// Vo side m chalta rahega fir vo end m print ho jaega
fs.readFile("f1.html", cb);
function cb(err, content){
    console.log("content =" + content);
}
//Since f11.html is not present therefore there will be error If
// we dont print it then it doesnt print anything
// fs.readFile("f11.html", cb);
// function cb(err, content){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("content =" + content);
//     }
// }
console.log("After");
console.log("Other work");
// while(true){

// }