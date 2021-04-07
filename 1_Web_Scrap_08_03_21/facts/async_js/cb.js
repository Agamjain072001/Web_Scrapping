let fs = require("fs");
console.log("Before");
let frp = fs.readFile("function.js", cb);
function cb(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content-->" + data);
    }
}
console.log("After");

// Output :-
// Before
// After
// Data of function.js file

// Explanation :-

// In copy with diagram
