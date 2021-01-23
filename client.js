const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000",
grpc.credentials.createInsecure());
const text = process.argv[2];

client.createTodo({
    // "id" : -1,
    "text" : text,
},(err,response )=>{
    if(err!=null){
        console.error(err);
    }else{
        console.log("Backend Response createTodo "+JSON.stringify(response));
    }
});

// Unary call : One request and got one Reply from backend 

// In readTodos, from backend we are getting an array in a single call this would be good if size of array is smaller. But if size of array is larger then client will be crowd with huge data and it would be effect performance. Hence we will use readTodosStream which is server streaming RPC  
// client.readTodos({},(err, response)=>{
//     if(err!=null){
//         console.error(err);
//     }else{
//         console.log("ToDos are as followed ");
//         if(!response.items){
//             response.items.forEach(i => {
//                 console.log(i.text);
//             });
//         }
        
//     }
// });

const call = client.readTodosStream();
call.on("data", item =>{
    console.log("Recieved data from server "+JSON.stringify(item));
});
call.on("end", e => console.log("server done!"))
   



