(function() {
  var Section = me.SpriteObject.extend({
    init : function(x, y, image) {
      this.parent(x, y, image, image.width, image.height);
      this.name = 'tarmacSection';
    }
  })


  game.Tarmac = me.ObjectContainer.extend({
    init : function() {
      this.image = me.loader.getImage('tarmac');
      var x = me.game.viewport.width / 2 - this.image.width / 2;
      this.parent(x, -this.image.height, this.image.width, this.image.height*2);
      this.addChild(new Section(x, -this.image.height), 2);
      this.addChild(new Section(x, 0), 2);
      this.speed = 120;
      this.alwaysUpdate = true;
    },

    forChild : function(fn) {
      for(var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        fn(child);
      }
    }

    setSpeed : function(speed) {
      if(this.speed !== speed) {
        this.speed = speed;
          this.forChild(function(child) {
            if(child.name === 'tarmacSection') {
              child.setVelocity(0, speed);
            }
          });
        }
      }
    },

    update : function(time) {
      this.parent(time);
      this.forChild(function(child) {
        if(child.y >= me.game.viewport.height) {
          child.y = -me.game.viewport.height;
        }
      });
    }
  });


}).call(this);

