(function() {
  var Background = me.Renderable.extend({
    init : function() {
      this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
      this.z = 0;
    },

    draw : function(ctx) {
      me.video.clearSurface(ctx, '#000');
    }
  })


  game.PlayScreen = me.ScreenObject.extend({

    init : function() {
      this.parent(true);
    },

    onResetEvent: function() {
      game.scene = new game.BrotherScene();
      game.timer = new game.Timer();
      me.game.world.addChild(game.scene);
      // add our HUD to the game world
      me.game.world.addChild(new Background());
      me.game.world.addChild(new game.HUD.Container());
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
      // remove the HUD from the game world
      me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
    },

    update : function(time) {
      game.scene.update(time);
      game.timer.update();
    }
  });
}).call(this);