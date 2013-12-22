game.Scene = Object.extend({
  init : function() {
    this.alwaysUpdate = true;
  },

  cleanup : function() {
    me.audio.stopTrack();
    me.game.world.destroy();
  },

  update : function(time) {

  }
})