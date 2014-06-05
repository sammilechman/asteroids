(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([450, 225],[0,0]);
    this.bullets = [];
    this.starLayer1 = [];
    this.starLayer2 = [];
    this.score = 0;
  }

  Game.DIM_X = 900;
  Game.DIM_Y = 450;
  Game.INTERVAL_ID;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i =0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  }

  Game.prototype.addStarLayers = function() {
  	for (var num = 0; num < 20; num++) {
		var x = (Math.random() * 900);
		var y = (Math.random() * 450);
		var pos = [x, y];

		var genRandomVel = function() {
			var value =  Math.random() * Math.random() / Math.random();
			if (value > 2 || value < -2) { return genRandomVel(); }
			return value;
		};

		var vel = [genRandomVel(), genRandomVel()];

		var star = new Asteroids.Star(pos, vel);
  		this.starLayer1.push(star)
  	}
  	for (var num = 0; num < 20; num++) {
		var x = (Math.random() * 900);
		var y = (Math.random() * 450);
		var pos = [x, y];
		var vel = [0,0];

		var star = new Asteroids.Star(pos, vel);
  		this.starLayer2.push(star)
  	}
  }

  Game.prototype.fireBullet = function() {
    // if (!(this.ship.vel[0] === 0 && this.ship.vel[1] === 0)) {
      this.bullets.push(this.ship.fireBullet());
    // }
  }

  Game.prototype.handleStarParallax = function () {
	var x = this.ship.vel[0]/2;
  	var y = this.ship.vel[1]/2;

  	this.starLayer1.forEach(function(star) {
  		star.matchVelocity([(x * -1),(y * -1)]);
  	});

  	this.starLayer2.forEach(function(star) {
  		star.matchVelocity([((x/2)),((y/2) * -1)]);
  	});
  }

  Game.prototype.handleLostObjects = function() {
    var that = this;
    for (var i = this.asteroids.length-1; i >= 0; i--) {
      if (this.asteroids[i].isOutOfBounds()) {
        this.handleOutOfBounds(this.asteroids[i]);
      }
    }
    if (this.ship.isOutOfBounds()) {
    	this.handleOutOfBounds(this.ship);
    }
    this.starLayer1.forEach(function(star) {
    	if (star.isOutOfBounds()) {
    		that.handleOutOfBounds(star);
    	}
    });
    this.starLayer2.forEach(function(star) {
    	if (star.isOutOfBounds()) {
    		that.handleOutOfBounds(star);
    	}
    });
  }

  Game.prototype.handleOutOfBounds = function(object) {
  	if (object.pos[0] >= 900) {
  		object.pos[0] = 0.1;
  	}
  	if (object.pos[0] <= 0) {
  		object.pos[0] = 899.9;
  	}
  	if (object.pos[1] >= 450) {
  		object.pos[1] = 0.1;
  	}
  	if (object.pos[1] <= 0) {
  		object.pos[1] = 449.9;
  	}
  }

  Game.prototype.removeAsteroid = function(idx) {
    this.asteroids.splice(idx, 1);
    this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, -25));
    this.score++;
    document.getElementById("score").innerHTML = this.score;
  }

  Game.prototype.removeBullet = function(idx) {
    this.bullets.splice(idx, 1);
  }


  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var that = this;
    this.starLayer1.forEach(function(star) {
    	star.draw(that.ctx);
    });
    this.starLayer2.forEach(function(star) {
    	star.draw(that.ctx);
    });
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx);
    });
    this.ship.draw(that.ctx);
  }

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.starLayer1.forEach(function(star) {
      star.move();
    });
    this.starLayer2.forEach(function(star) {
      star.move();
    });
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
    this.ship.move();
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    key('w', function() {
    	that.ship.power(1);
    	that.handleStarParallax();
    });

    key('a', function() {
      that.ship.turn("counter-clockwise");

    });
    key('d', function() {
      that.ship.turn("clockwise");
    });
    key('space', function() {
    	that.fireBullet();
    });
  }

  Game.prototype.checkCollisions = function() {

    for (var i = this.asteroids.length - 1; i >= 0; i--) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.ctx.fillText("Click on the board to start the game", 230, 250);
        this.stop();
        this.ctx.fillText("Click on the board to start the game", 230, 250);
      }

      for (var j = this.bullets.length -1; j >= 0; j--) {
        if (this.bullets[j].isCollidedWith(this.asteroids[i])) {
          this.removeAsteroid(i);
          this.removeBullet(j);
        }
      }
    }
  }

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
    this.handleLostObjects();
    this.draw();
  }

  Game.prototype.loadSprites = function() {
    document.getElementById("score").innerHTML = 0;
  	this.start(10);
  }

  Game.prototype.start = function(numAsteroids) {
    var game = this;
    game.bindKeyHandlers();
    game.addAsteroids(numAsteroids);
    game.addStarLayers();
    Game.INTERVAL_ID = setInterval(function() {
      game.step();
    }, 30);
  }

  Game.prototype.stop = function() {
    clearInterval(Game.INTERVAL_ID);
  }

})(this);
