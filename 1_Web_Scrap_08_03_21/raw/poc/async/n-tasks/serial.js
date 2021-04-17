let fs = require("fs");
let files =["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

console.log("Before");

function serialReader(n){
    if(n == files.length){
        return; 
    }

    fs.readFile(files[n], function (err, data){
        if(err){
            console.log(err);
        }else{
            console.log(data.bytelength);   // Gives filesize
            console.log("content =>" + data);
            serialReader(n+1);
        }
    });
}

serialReader(0);
console.log("After");



// Homework 
// Create conditional tree