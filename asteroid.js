(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel, radius) {
    Asteroids.MovingObject.call(this, pos, vel);
    // this.pos = pos;
    // this.vel = vel;
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
  };

  Asteroid.COLOR = "black";

  Asteroid.RADIUS = 27;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY){
    var startX = (Math.random() * dimX);
    var startY = (Math.random() * dimY);
    
    if ((startX < 600 && startX > 400) || (startY < 350 && startY > 175)) {
    	return Asteroid.randomAsteroid(900,450);
    }

    var startPos = [startX, startY];
    var startVel = randomVec();

    return new Asteroid(startPos, startVel);
  }
  
  Asteroid.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);

	ctx.fill();
    
    ctx.drawImage(asteroidImage, this.pos[0]-28, this.pos[1]-28);
//     imageObj.src = "asteroid.png";
  }

  var randomVec = function () {
    var velX = (4 * Math.random() - 2);
    var velY = (4 * Math.random() - 2);

    return [velX, velY];
  }

})(this);