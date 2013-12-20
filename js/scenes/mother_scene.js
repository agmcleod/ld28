(function() {
  game.MotherScene = game.Scene.extend({
    init : function() {
      this.motherBackground = new game.MotherBackground();
    },

    stage : function() {
      me.game.world.addChild(this.motherBackground);
    },

    update : function() {

    }
  });
}).call(this);