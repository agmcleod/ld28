(function() {
  var startSpeed = 200;
  var House = me.SpriteObject.extend({
    init : function() {
      this.parent(0, -768, me.loader.getImage('house'), 1024, 768);
      this.name = 'house';
      this.isRenderable = true;
      this.alwaysUpdate = true;
      this.speed = 0;
    },

    update : function(time) {
      this.parent(time);
      this.pos.y += this.speed * game.timer.deltaAsSeconds();
    }
  });

  var Section = me.SpriteObject.extend({
    init : function(x, y, image) {
      this.parent(x, y, image, image.width, image.height);
      this.name = 'tarmacSection';
      this.alwaysUpdate = true;
      this.isRenderable = true;
      this.speed = 0;
    },

    update : function(time) {
      this.parent(time);
      this.pos.y += this.speed * game.timer.deltaAsSeconds();
      if(!game.scene.atEnd && this.pos.y >= me.game.viewport.height) {
        this.pos.y = -this.height;
      }
      if(this.pos.y - this.other.pos.y > this.height) {
        this.pos.y = this.other.pos.y + this.height;
      }
      else if(this.pos.y - this.other.pos.y < -this.height) {
        this.pos.y = this.other.pos.y - this.height;
      }
      return true;
    }
  });

  game.Tarmac = me.ObjectContainer.extend({
    init : function(scene) {
      this.scene = scene;
      this.image = me.loader.getImage('tarmac');
      this.name = 'tarmac';
      this.parent(0, 0, me.game.viewport.width, me.game.viewport.height);
      this.speed = 0;
      this.alwaysUpdate = true;
      this.isRenderable = true;
      this.spawnCars = true;
      this.house = new House();
      this.restart();
    },

    addCar : function() {
      var x = !!Number.prototype.random(0, 1) ? Number.prototype.random(300, 350) : Number.prototype.random(560, 600);
      var car = me.entityPool.newInstanceOf('car', x, - 256, null, this.speed);
      this.addChild(car, 3);
    },

    addHouse : function() {
      this.spawnCars = false;
      this.house.speed = this.speed;
      this.addChild(this.house, 2);
    },

    forChild : function(fn) {
      for(var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        fn(child, i);
      }
    },

    removeAndAddCar : function(obj) {
      this.removeChild(obj);
      if(this.spawnCars) this.addCar();
    },

    restart : function() {
      if(this.children.length > 0) {
        this.destroy();
      }
      var s1 = new Section(0, 0, this.image);
      var s2 = new Section(0, me.game.viewport.height, this.image);
      s1.other = s2;
      s2.other = s1;
      this.addChild(s1, 2);
      this.addChild(s2, 2);
      this.addChild(me.entityPool.newInstanceOf('car', 300, 50, 'red'), 3);
      this.addChild(me.entityPool.newInstanceOf('car', 570, 400, 'green'), 3);
      if(!this.scene.showInstructions) {
        this.setSpeed();
      }
    },

    setSpeed : function(speed) {
      if(speed === null || typeof speed === 'undefined') {
        speed = startSpeed;
      }
      if(this.speed !== speed) {
        this.speed = speed;
        game.hudContainer.speedometer.setSpeed(speed / 2);
        this.forChild(function(child) {
          if(child.name === 'tarmacSection' || child.name === 'house') {
            child.speed = speed;
          }
          else if(child.name === 'car') {
            child.speed = speed * 0.8;
          }
        });
      }
    },

    update : function(time) {
      this.parent(time);
      this.scene.progress.addPixelsCovered(this.speed * game.timer.deltaAsSeconds());
      if(this.scene.atEnd && this.house.pos.y >= 0) {
        this.house.pos.y == 0;
        this.scene.end();
      }
      return true;
    }
  });


}).call(this);

