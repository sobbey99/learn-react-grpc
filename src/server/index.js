const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../ping_pong.proto")
);
const serverProto = grpc.loadPackageDefinition(packageDefinition);

function pingPong(call, callback) {
  console.log("request");
  return callback(null, { pong: "Pong" });
}

const server = new grpc.Server();
server.addService(serverProto.PingPongService.service, {
  pingPong,
});

server.bindAsync(
  "localhost:8080",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
