const express = require("express");

const app = express();
app.use(express.static('public'));

const server = app.listen(3000, () => {
	console.log('Server is running at port 3000');
})

const io = require('socket.io')(server);
io.on('connection', socket => {
	console.log("New Connection: ", socket.id);

	// listening for the mouse event
	socket.on('draw', (data) => {
		console.log(data);
		// broadcast the data to other client sockets
		socket.broadcast.emit('draw', data);
	})
})