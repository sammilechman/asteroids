(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel);
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "black";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function() {
    var velX = this.vel[0];
    var velY = this.vel[1];

    var bulVelX = velX * 3;
    var bulVelY = velY * 3;

    return new Asteroids.Bullet([this.pos[0], this.pos[1]], [bulVelX, bulVelY]);
  }
  
  Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);

	ctx.fill();
    
    ctx.drawImage(shipImage, this.pos[0]-10, this.pos[1]-11);
  }

})(this);

