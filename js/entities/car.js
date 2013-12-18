(function() {
  var colours = ['yellow', 'green', 'red', 'gray'];
  var maxAccelX = 7;
  game.Car = me.ObjectEntity.extend({
    init : function(x, y, type, speed) {
      var settings = {
        image : 'cars',
        spritewidth : '128',
        spriteheight : '192'
      };
      if(typeof type === 'undefined' || type === null) {
        type = colours[Number.prototype.random(0, colours.length-1)];
      }
      this.parent(x, y, settings);
      this.type = type;
      this.name = 'car';
      this.speed = speed || 0;
      this.alwaysUpdate = true;
      this.updateColRect(17, 94, 10, 170);
      this.stuck = true;
      this.crashed = false;
      this.accel = new me.Vector2d(0, 0);

      if(type === 'blue') {
        this.timer = new game.Timer();
      }

      switch(type) {
        case 'blue':
          this.renderable.addAnimation('idle', [0], 1);
          break;
        case 'yellow':
          this.renderable.addAnimation('idle', [1], 1);
          break;
        case 'green':
          this.renderable.addAnimation('idle', [2], 1);
          break;
        case 'red':
          this.renderable.addAnimation('idle', [3], 1);
          break;
        case 'gray':
          this.renderable.addAnimation('idle', [4], 1);
          break;
        case 'police':
          this.renderable.addAnimation('idle', [5], 1);
          break;
      }
      this.renderable.setCurrentAnimation('idle');
    },

    restart : function() {
      if(this.type === 'blue') {
        this.pos.x = 400;
        this.stuck = false;
        this.crashed = false;
      }
    },

    update : function(time) {
      if(this.timer) this.timer.update();
      if(this.type === 'blue' && !this.stuck) {
        if(me.input.isKeyPressed('left')) {
          this.accel.x -= 1;
          if(this.accel.x < -maxAccelX) this.accel.x = -5;
          this.pos.x += this.accel.x;
        }
        else if(me.input.isKeyPressed('right')) {
          this.accel.x += 1;
          if(this.accel.x > maxAccelX) this.accel.x = 5;
          this.pos.x += this.accel.x;
        }
        else {
          if(this.accel.x > 0) {
            this.accel.x--;
          }
          else if(this.accel.x < 0) {
            this.accel.x++;
          }
        }

        if(me.input.isKeyPressed('brake')) {
          game.scene.tarmac.setSpeed();
        }

        if(this.pos.x < 300 || this.pos.x > 600) {
          game.scene.stop();
          game.scene.showStuck();
        }
        if(this.timer && this.timer.elapsed > 1500) {
          game.scene.tarmac.setSpeed(game.scene.tarmac.speed + 20);
          this.timer.reset();
        }
      }
      if(this.type === 'blue') {
        var res = me.game.collide(this);
        if(res && res.obj.name === 'car' && !this.crashed) {
          game.scene.stop();
          game.scene.showCrash();
          this.crashed = true;
        }
      }
      this.pos.y += this.speed * game.timer.deltaAsSeconds();

      if(this.pos.y > me.game.viewport.height) {
        game.scene.tarmac.removeAndAddCar(this);
      }

      this.parent(time);
      return true;
    }
  });
}).call(this);