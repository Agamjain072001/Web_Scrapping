// Good Technique

let fs = require("fs");

console.log("Before");

console.log("F1 was sent");
fs.readFile("../f1.txt", cb1);


function cb1(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content -> " + data);
        console.log("F2 was sent");
        fs.readFile("../f2.txt", cb2);
    }
}

function cb2(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content -> " + data);
        console.log("F3 was sent");
        fs.readFile("../f3.txt", cb3);
    }
}

function cb3(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content -> " + data);
        console.log("F4 was sent");
        fs.readFile("../f4.txt", cb4);
    }
}

function cb4(err, data){
    if(err){
        console.log(err);
    }else{
        console.log("content -> " + data);
    }
}

console.log("After");



// Bad Technique
// Also known as Callback Hell

// let fs = require("fs");

// console.log("Before");

// console.log("F1 was sent");
// fs.readFile("../f1.txt", cb1);


// function cb1(err, data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("content -> " + data);
//         console.log("F2 was sent");
//         fs.readFile("../f2.txt", function cb2(err, data){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("content -> " + data);
//                 console.log("F3 was sent");
//                 fs.readFile("../f3.txt", function cb3(err, data){
//                     if(err){
//                         console.log(err);
//                     }else{
//                         console.log("content -> " + data);
//                         console.log("F4 was sent");
//                         fs.readFile("../f4.txt", function cb4(err, data){
//                             if(err){
//                                 console.log(err);
//                             }else{
//                                 console.log("content -> " + data);
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
// }