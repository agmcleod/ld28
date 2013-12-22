(function() {
  var types = {
    'food' : 0,
    'guitar' : 1,
    'lotus' : 2,
    'candycane' : 3,
    'puppy' : 4,
    'chocolate' : 5
  }

  game.PickupItem = me.AnimationSheet.extend({
    init : function(x, y, type) {
      this.parent(x, y, me.loader.getImage('mother-scene-items'), 128, 128);
      this.type = type;
      this.addAnimation('idle', [types[type]], 1);
      this.setCurrentAnimation('idle');
      this.z = 2;
    },

    clicked : function() {
      if(game.scene.loss) return false;
      game.scene.itemCollected();
      me.game.world.removeChild(this);
      this.hasPointerEvent = false;
      me.input.releasePointerEvent('mousedown', this);
    }
  });
}).call(this);