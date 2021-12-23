const net = require('net')

const server = net.createServer()  // creates server

server.listen(1234) // listen on port 1234

let connections = []	// allows for multiple connections

server.on('connection', (connection) => {   // creates connection
	connections.push(connection)

	connection.on('data', (data) => {
		dataString = data.toString()		// represent data as string - "username:message"
		dataArray  = dataString.split(":")	// split data into array - ["username", "message"]
		if(dataArray.length == 1)	// only username is recieved - user just joined
		{
			text = dataString + " has joined ^_^"
			forwardToClients(text)
		}
		else						// username and message recieved
		{
			text = dataString
			forwardToClients(text)
		}
		
		username = dataArray[0];	// extract username from data
		
		connection.on('close', () => {	// client disconnects
			text = username + " has left -_-"
			forwardToClients(text)
		})
	})

	connection.on('error', () => {})	// does nothing for now so that there are not error messages every time a client disconnects
})

/* 
* forwardToClients:
* Sends text to all clients connected
*/

let forwardToClients = (text) => {
	for(let connection of connections)
	{
		connection.write(Buffer.from(text, "utf-8"))
	}
}


