const readline = require("readline")
const net      = require('net')

const connection = net.connect({host: "localhost", port: 1234})	// asks server if client can connect

const commandLine = readline.createInterface({	// command line interface for input and output -> reads one line at a time
	input: process.stdin, output: process.stdout
})

commandLine.question('User name: ', (name) => {	// asks for client's username once it has connected
	connection.write(Buffer.from(name, "utf-8"))	// sends username to server
	message = askForMessage(name, connection)		// asks for client's message to send to server

	connection.on('data', (data) => {	// data recieved from server
		dataString = data.toString()		// represents data as string - "username:message"
		dataArray  = dataString.split(':')	// data split into array - ["username", "message"]
		if (dataArray[0] != name)	// do not display client's own messages, only messages from other clients
		{
			console.log(data.toString())
		}
	})
});

connection.on('error', () => {
	console.log("Error connecting to server :(")
	process.exit(1)
})

/*
* askForMessage:
* Asks client for message to send to server
* Once client types message, it is sent to server to forward to other clients
* Repeat so that the client can send multiple messages
*/
let askForMessage = (name, connection) => {
	commandLine.question('', (message) => {
		sendMessage(name, message, connection)
		askForMessage(name, connection)
		return message
	})
}

/*
* sendMessage:
* Constructs message in the format "username:message"
* Sends message to server
*/
let sendMessage = (name, message, connection) => {
	messageToSend = name + ":" + message
	connection.write(Buffer.from(messageToSend, "utf-8"))
}
