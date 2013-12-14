game.Scene = Object.extend({
  init : function() {
    this.alwaysUpdate = true;
  },

  cleanup : function() {
    me.game.world.reset();
  },

  update : function(time) {

  }
})