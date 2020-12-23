const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000",
grpc.credentials.createInsecure());

client.createTodo({
    "id" : -1,
    "text" : " Eating "
},(err,response )=>{
    if(err!=null){
        console.error(err);
    }else{
        console.log("Backend Response "+JSON.stringify(response));
    }
});