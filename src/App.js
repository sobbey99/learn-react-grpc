import logo from "./logo.svg";
import "./App.css";

const { PingPongServiceClient } = require("./ping_pong_grpc_web_pb");
const { PingRequest, PongResponse } = require("./ping_pong_pb.js");

var client = new PingPongServiceClient("http://localhost:9090", null, null);

function App() {
  const callGrpcService = () => {
    const request = new PingRequest();
    request.setPing("Ping");

    client.pingPong(request, {}, (err, response) => {
      if (response == null) {
        console.log(err);
      } else {
        console.log(response.getPong());
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={{ padding: 10 }} onClick={callGrpcService}>
          Click for grpc request
        </button>
      </header>
    </div>
  );
}

export default App;
