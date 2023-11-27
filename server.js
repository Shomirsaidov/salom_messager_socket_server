const WebSocket 	= require('ws')
const sql 			= require('mysql2')
const md5 			= require('blueimp-md5')
const crypto 		= require('./crypto.js')

const connection = sql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	database: 'salom_db',
	password: ''
}).promise()
connection.connect((e) => {
	if(e) console.warn(e)
	else console.log('Connected to the database !')
})

const wss = new WebSocket.Server({port: 4440});

console.log('Server started !')

const clients = {};

wss.on('connection', (ws) => {
	const id = ws._protocol
	clients[id] = ws;

	console.log(`New client ${id}`);
	console.log('The protocol is ' + clients[id]._protocol)
	for(x in clients) {
		console.log(x)
	}

	ws.on('message', (rawMessage) => {
		console.log('sjflkd' + rawMessage)
			console.log('%cnew message from client ! The message is:', 'color: green;')
			console.log(JSON.parse(rawMessage))
			messageData = JSON.parse(rawMessage)
			newMessage = messageData

			if(newMessage.type === undefined) {
				console.log('receiver should be ' + newMessage.receiver)

				if(clients[newMessage.receiver] !== undefined) {
					clients[newMessage.receiver].send(JSON.stringify(newMessage))
				}


				var DATA = [crypto.encrypt(newMessage.text),newMessage.sender, newMessage.receiver, newMessage.time, newMessage.image]
				console.log(DATA)
				connection.execute("INSERT INTO `messages`(`id`,`text`,`sender`,`receiver`,`time`,`image`) VALUES(NULL, ?,?,?,?,?)", DATA)
				.then(([rows, fields]) => {
					console.log(fields)
					console.log('Added !')
				})
				.catch(e => {
					console.warn(e.message)
				})
			} else if(newMessage.type == 'for refresh') {
				if(clients[newMessage.receiver] !== undefined) {
					clients[newMessage.receiver].send('refresh !')
				}
			} else if (newMessage.type == 'line check') {
				if(clients[newMessage.receiver] !== undefined) {
					clients[newMessage.sender].send('online')
				} else {
					clients[newMessage.sender].send('offline')
				}
			}

	})

	ws.on('close', () => {
		delete clients[id];
		console.log(`Connection has broken ${id}`);
	})





})

// avazbek-info.github.io
// 








// for (const id in clients) {
		// 	clients[id].send(JSON.stringify(newMessage))
		// }

		/* uncomment the code passage below and comment the loop above 
			to make the chat private and for turning off the stream mode		*/

		// clients[messageData.receiverID].send(messageData.senderName + ': ' + messageData.messageText)


