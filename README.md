# chat-server
Connect multiple clients to the server so they can send and recieve messages with each other

## Materials needed
* Node.js

## How to use
1. Run server code with `node server.js`
2. Run client code in a separate terminal with `node client.js`
3. To connect multiple clients, run the client code in separate terminals
4. Type username when prompted

## Additional Information
* When running the server on a virtual machine, make sure to change the host and port in the client code from the default:

`const connection = net.connect({host: "localhost", port: 1234})`