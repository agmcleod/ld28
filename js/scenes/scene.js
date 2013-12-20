game.Scene = Object.extend({
  init : function() {
    this.alwaysUpdate = true;
  },

  cleanup : function() {
    me.game.world.destroy();
  },

  update : function(time) {

  }
})