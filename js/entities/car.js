(function() {
  var colours = ['yellow', 'green', 'red', 'gray'];
  game.Car = me.ObjectEntity.extend({
    init : function(x, y, type, speed) {
      var settings = {
        image : 'cars',
        spritewidth : '128',
        spriteheight : '256'
      };
      if(typeof type === 'undefined' || type === null) {
        type = colours[Number.prototype.random(0, colours.length-1)];
      }
      this.parent(x, y, settings);
      this.type = type;
      this.name = 'car';
      this.speed = speed || 0;
      this.alwaysUpdate = true;
      this.updateColRect(15, 100, 20, 225);
      this.stuck = false;

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

    update : function(time) {
      if(this.type === 'blue' && !this.stuck) {
        if(me.input.isKeyPressed('left')) {
          this.pos.x -= 10;
        }
        if(me.input.isKeyPressed('right')) {
          this.pos.x += 10;
        }

        if(this.pos.x < 150 || this.pos.x > 720) {
          game.scene.tarmac.setSpeed(0);
          this.stuck = true;
        }
      }
      if(this.type === 'blue') {
        var res = me.game.collide(this);
        if(res && res.obj.name === 'car') {
          game.scene.tarmac.setSpeed(0);
          this.stuck = true;
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