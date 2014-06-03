(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel, radius, color) {
    // Asteroids.MovingObject.call(this, pos, vel);
    this.pos = pos;
    this.vel = vel;
    this.radius = Bullet.RADIUS;
    this.color = Bullet.COLOR;
  };

  Bullet.RADIUS = 3;
  Bullet.COLOR = "black";

  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);

	ctx.fill();
    
    ctx.drawImage(bulletImage, this.pos[0]-5, this.pos[1]-3);
  }

})(this);

