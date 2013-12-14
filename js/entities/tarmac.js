(function() {
  var startSpeed = 200;
  var Section = me.SpriteObject.extend({
    init : function(x, y, image) {
      this.parent(x, y, image, image.width, image.height);
      this.name = 'tarmacSection';
      this.alwaysUpdate = true;
      this.isRenderable = true;
      this.speed = startSpeed;
    },

    update : function(time) {
      this.parent(time);
      this.pos.y += this.speed * game.timer.deltaAsSeconds();
      return true;
    }
  });

  game.Tarmac = me.ObjectContainer.extend({
    init : function() {
      this.image = me.loader.getImage('tarmac');
      this.name = 'tarmac';
      this.parent(0, -this.image.height, this.image.width, this.image.height*2);
      this.speed = 0;
      this.addChild(new Section(0, 0, this.image), 2);
      this.addChild(new Section(0, this.image.height, this.image), 2);
      this.addChild(me.entityPool.newInstanceOf('car', 300, 800, 'red'), 3);
      this.addChild(me.entityPool.newInstanceOf('car', 570, 1200, 'green'), 3);
      this.alwaysUpdate = true;
      this.isRenderable = true;
      this.setSpeed(startSpeed);
    },

    forChild : function(fn) {
      for(var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        fn(child, i);
      }
    },

    removeAndAddCar : function(obj) {
      this.removeChild(obj);
      var x = !!Number.prototype.random(0, 1) ? Number.prototype.random(300, 350) : Number.prototype.random(550, 600);
      var car = me.entityPool.newInstanceOf('car', x, me.game.viewport.height - 256, null, this.speed);
      this.addChild(car, 3);
    },

    setSpeed : function(speed) {
      if(this.speed !== speed) {
        this.speed = speed;
        this.forChild(function(child) {
          if(child.name === 'tarmacSection' || child.name === 'car') {
            child.speed = speed;
          }
        });
      }
    },

    update : function(time) {
      this.parent(time);
      this.forChild(function(child) {
        if(child.pos.y >= me.game.viewport.height * 2) {
          child.pos.y = 0;
        }
      });
      return true;
    }
  });


}).call(this);

