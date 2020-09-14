let socket;
let remoteColor;
let brushRadius = 20;

function setup() {
	// p5 canvas
	createCanvas(400, 400);
	background(51)
	// assign a random remote color for this instance
	remoteColor = `rgb(${floor(random(0, 255))}, ${floor(random(0, 255))}, ${floor(random(0, 255))})`;
	// setup socket.io
	socket = io();
	// listen for draw event from other socktets
	socket.on('draw', newDrawing);
	// listen for join event
	socket.on("user-join", onNewJoin);
	
	// listen for user disconnects from server
	socket.on('user-left', onUserLeft);
}

function onNewJoin(id) {
	createP(`<b>${id}</b>` + " has joined.");
}

function onUserLeft(id) {
	createP(`<b>${id}</b>` + " left.");
}

function newDrawing(data) {
	noStroke();
	fill(color(data.color));
	ellipse(data.x, data.y, brushRadius, brushRadius);
}

function mouseDragged() {
	console.log(mouseX + ",", mouseY);
	const data = {
		x: mouseX,
		y: mouseY,
		color: remoteColor
	}
	// emiting draw event with data via socket
	socket.emit('draw', data);
	// drawing
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, brushRadius, brushRadius);
}

function draw() {
	// put drawing code here
	
}