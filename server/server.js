const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));

const server = app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
})

const io = require('socket.io')(server);
io.on('connection', socket => {
	console.log("New Connection: ", socket.id);
	io.emit("user-join", socket.id);

	// listening for the mouse event
	socket.on('draw', (data) => {
		console.log(data);
		// broadcast the data to other client sockets
		socket.broadcast.emit('draw', data);
	});

	// listening for the client disconnect
	socket.on('disconnect', reason => {
		// broadcast the id to other client sockets
		socket.broadcast.emit('user-left', socket.id);
	});
});