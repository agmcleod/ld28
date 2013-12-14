(function() {
  var startSpeed = 200;
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
      if(this.pos.y >= me.game.viewport.height) {
        game.scene.tarmac.forChild((function(child) {
          if(child.name === 'tarmacSection' && child.GUID !== this.GUID) {
            this.pos.y = child.pos.y - this.height;
          }
        }).bind(this));
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
      this.restart();
    },

    addCar : function() {
      var x = !!Number.prototype.random(0, 1) ? Number.prototype.random(300, 350) : Number.prototype.random(550, 600);
      var car = me.entityPool.newInstanceOf('car', x, - 256, null, this.speed);
      this.addChild(car, 3);
    },

    forChild : function(fn) {
      for(var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        fn(child, i);
      }
    },

    removeAndAddCar : function(obj) {
      this.removeChild(obj);
      this.addCar();
    },

    restart : function() {
      if(this.children.length > 0) {
        this.destroy();
      }
      this.addChild(new Section(0, 0, this.image), 2);
      this.addChild(new Section(0, me.game.viewport.height, this.image), 2);
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
        this.forChild(function(child) {
          if(child.name === 'tarmacSection' || child.name === 'car') {
            child.speed = speed;
          }
        });
      }
    },

    update : function(time) {
      this.parent(time);
      return true;
    }
  });


}).call(this);

