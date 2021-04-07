// In JS we can assign function as variables

// let fnAddrCount = function fn(param){
//     console.log("param is ", param);
// }
// fnAddrCount(10);
// Output is param is 10

// ---------------------------------------------------------------

// In JS we can pass function as arguments

// function jack(param){
//     console.log("param is ", param);
// }

// function back(){
//     conosle.log("I would like to call jack");
// }
// jack(back);
// Output is param is [Function: back]

// -------------------------------------------------------------------

// function jack(param){
//     console.log("param is ", param());
// }

// function back(){
//     console.log("I would like to call jack");
// }
// jack(back);
// Output:-
// I would like to call jack
// param is  undefined


// -------------------------------------------------------------------------------

// function jack(param){
//     console.log("param is ", param());
// }

// function back(){
//     console.log("I would like to call jack");
//      return 10;
// }
// jack(back);
// Output:-
// I would like to call jack
// param is  10

// --------------------------------------------------------------------------

