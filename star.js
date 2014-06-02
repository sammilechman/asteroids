(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Star = Asteroids.Star = function (pos, vel, radius, color) {
	Asteroids.MovingObject.call(this, pos, vel);
	this.radius = Star.RADIUS;
    this.color = Star.COLOR;
  };
  
  Star.RADIUS = 1;
  Star.COLOR = "white";

  Star.inherits(Asteroids.MovingObject);

  Star.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

})(this);