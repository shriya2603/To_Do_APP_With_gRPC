const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Create a grpc server without ssl
const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

// mapping the methods with proto methods
server.addService(todoPackage.Todo.service, {
    "createTodo" : createTodo,
    "readTodos" : readTodos,
});

// starts the server and begin handling requests 
server.start();


function createTodo(call, callback){
    console.log(call);
}

function readTodos (call, callback) {

}