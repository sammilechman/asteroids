(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel);
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
    this.angle = 0;
  };

  Ship.RADIUS = 16;
  Ship.COLOR = "black";
  RAD_CON = Math.PI/180;

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(i) {
    var deltaVelX = i*Math.sin(this.angle*RAD_CON);
    var deltaVelY = i*-Math.cos(this.angle*RAD_CON);
    this.vel[0] += deltaVelX;
    this.vel[1] += deltaVelY;
  }

  Ship.prototype.turn = function(dir) {
    if (dir == "clockwise") {
      this.angle += 10;
    } else if (dir == "counter-clockwise"){
      this.angle -= 10;
    }
  }

  Ship.prototype.fireBullet = function() {
    var velX = this.vel[0];
    var velY = this.vel[1];
    var bulVelX = Math.sin(this.angle*RAD_CON)*8+this.vel[0];
    var bulVelY = -Math.cos(this.angle*RAD_CON)*8+this.vel[1];
    return new Asteroids.Bullet([this.pos[0], this.pos[1]], [bulVelX, bulVelY]);
  }

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle * RAD_CON);
    ctx.drawImage(shipImage, -(shipImage.width/2), -(shipImage.height/2));
    ctx.restore();
  }
})(this);
