//var //canvasBody = document.getElementById("canvas"),

var canvasBody = document.getElementById("canvas"),
canvas = canvasBody.getContext("2d"),

w = canvasBody.width = window.innerWidth, //Full width
h = canvasBody.height = window.innerHeight, //Full height

tick = 0, //Tick in time

//YOU CAN CHANGE OPTIONS HERE. DO NOT REALLY MESS WITH STUFF BELOW THAT
opts = { //Options, you can change those
	backgroundColor: "#222",
	particleColor: "#fcfcfc",
	particleAmount: Math.floor((w * h / 650000) * 40), //the initial starting number of points depent on the screen
	defaultSpeed: 1,
	addedSpeed: 2,

	defaultRadius: 2,
	addedRadius: 2,

	communicationRadius: 150, //The radius for the line
},
particles = [],

Particle = function(Xpos, Ypos){
	this.x = Xpos ? Xpos : Math.random()*w; //If there is not position stated, it takes a random position
	this.y = Ypos ? Ypos : Math.random()*h; //Same here
    this.radius = opts.defaultRadius + Math.random()*opts.addedRadius; //Radius + a bit of random radius
	this.speed = Math.pow(opts.defaultRadius/this.radius, 6) * opts.defaultSpeed + Math.random()*opts.addedSpeed; //Speed that reversed to thedot size + a bit of random one
	this.directionAngle = Math.floor(Math.random()*360); //The angle of this particle its moving. !!!! TRUE ONLY ON INIT
	this.color = opts.particleColor;
	this.d = { //Object, stores directions. Computes directions according to the random this.directionAngle
		x: Math.cos(this.directionAngle)*this.speed,
		y: Math.sin(this.directionAngle)*this.speed
	};
	this.update = function(){ //The update function. The function that calculates next coordinates
		this.border(); //Checks if this particles touches the border and THEN computes the next coordinates
		this.x += this.d.x; //Just adding the direction to the X
		this.y += this.d.y; //Same but with Y
	};
	this.border = function(){ //The border function. Checks if this thing touches the border
		if(this.x >= w || this.x <= 0){ //X walls
			this.d.x *= -1;
		}
		if(this.y >= h || this.y <= 0){ //Floor and ceiling
			this.d.y *= -1;
		}
		this.x > w ? this.x = w : this.x; //This is really important.
		this.y > h ? this.y = h : this.y; //Same
		this.x < 0 ? this.x = 0 : this.x; //Same
		this.y < 0 ? this.y = 0 : this.y; //Same
		/* line ~49 explanation
			Because sometimes the speed of the particle can be faster, so it doesn't touch the border - it goes through. And when it goes back it doesn't go all the way inside - it stucks there. So, you have to set the X to the point when it touches. Same with Y
		*/

	};
	this.draw = function(){ //Just draws the points. Pretty easy. Takes the coords, color, radius - draws.
		canvas.beginPath();
		canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		canvas.closePath();
		canvas.fillStyle = this.color;
		canvas.fill();
	};
},
checkDistance = function(x1, y1, x2, y2){ //You got it. The point on the graph distance formula.
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
},
//Here goes the function that makes lines!
// @param point1 -	The point that check for neighboors
// @param points - 	The array the point suppose to take thing from
communicatePoints = function(point1, points){
	for(var i = 0; i < points.length; i++){
		var distance = checkDistance(point1.x, point1.y, points[i].x, points[i].y);
		var opacity = 1 - distance/opts.communicationRadius;
		if (opacity > 0){ //Draws the line
			canvas.lineWidth = opacity;
			canvas.strokeStyle = "rgba(255,255,255,0.5)";
			canvas.beginPath();
			canvas.moveTo(point1.x, point1.y);
			canvas.lineTo(points[i].x, points[i].y);
			canvas.closePath();
			canvas.stroke();
		}
	}
};

function setup(){ //Function called once to set everything up
for(var i = 0; i < opts.particleAmount; i++){
	particles.push( new Particle() );
}
window.requestAnimationFrame(loop);
}

function loop(){ //Function of loop that will be called for a frame of the animation
    window.requestAnimationFrame(loop);
    tick++;

    //Drawing the background. Basically clearing the frame that was before
    canvas.fillStyle = opts.backgroundColor;
    canvas.fillRect(0,0,w,h);

    //Executing particle functions
    for(var i = 0; i < particles.length; i++){
    	particles[i].update();
    	particles[i].draw();
    }
    //Executing lines
    for(var a = 0; a < particles.length/2; a++){
    	communicatePoints(particles[a], particles);
    }
}

//Executing the animation
setup();

//Some event listeners for backup to look professional
window.addEventListener("resize", function(){
	w = canvasBody.width = window.innerWidth;
	h = canvasBody.height = window.innerHeight;
});

//The thing that adds a point. Basically, we pass the coords of the mouse. And they are applied instead of randomness. Check the line 26, 28 to know
canvasBody.addEventListener("click", function(e){
	particles.push( new Particle(e.pageX, e.pageY) );
	console.log(particles.length);
});
//The thing that removes a point.
canvasBody.addEventListener("contextmenu", function(e){
	e.preventDefault();
	particles.splice(particles.length - 1, 1); //Takes the last thing from the particles[];
});
