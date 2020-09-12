let rows, cols;
let scale = 20;
let w = 1200;
let h = 900;
let terrain;
let flying = 0;

function setup() {
	// put setup code here
	createCanvas(600, 600, WEBGL);
	cols = w/scale;
	rows = h/scale;
	// initialize empty 2d matrix
	terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
	
}

function draw() {
	// terrain moving
	flying -= 0.02;
	// terrain height generation
	let yoff = flying;
	for(let y = 0; y < rows; y++) {
		let xoff = 0;
		for(let x = 0; x < cols; x++) {
			terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
			xoff += 0.15;
		}
		yoff += 0.15;
	}

	background(0);
	stroke(255);
	noFill();

	rotateX(PI / 3);
	translate(-w/2, -h/2);
	for(let y = 0; y < rows-1; y++) {
		beginShape(TRIANGLE_STRIP);
		for(let x = 0; x < cols; x++) {
			vertex(x* scale, y * scale, terrain[x][y]);
			vertex(x* scale, (y+1) * scale, terrain[x][y+1]);
			//rect(x*scale, y*scale, scale, scale);
		}
		endShape();
	}
}