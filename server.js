const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Create a grpc server without ssl
const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

// First we get the service and then mapping the methods with proto methods
server.addService(todoPackage.Todo.service, {
    "createTodo" : createTodo,
    "readTodos" : readTodos,
    "readTodosStream" : readTodosStream,
});

// starts the server and begin handling requests 
server.start();
const todos = [];
// Methods in grpc takes 2 parameters : call and callback 
// call : the request we get from client 
// callback : the repose we send back to client 
function createTodo(call, callback){
    
    console.log("Request from client: "+JSON.stringify(call));
    if(!call || call!=null){
        const text = call.request.text;
        const todo ={
            "id" : todos.length +1,
            "text" : text,
        }
        todos.push(todo);
        callback(null, todo);
    }
    else {
        callback(null, "Request failed");
    }
}

function readTodos (call, callback) {
    callback(null,{"items": todos} )
}

function readTodosStream(call) {
    todos.forEach(t => call.write(t));
    call.end();
}