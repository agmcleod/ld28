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

    addRestartButton : function() {
      game.hudContainer.addChild(new game.HUD.restartButton());
    },

    onResetEvent: function() {
      me.input.bindKey(me.input.KEY.ENTER, 'enter');
      game.scene = new game.BrotherScene();
      game.timer = new game.Timer();
      me.game.world.addChild(game.scene);
      // add our HUD to the game world
      me.game.world.addChild(new Background());
      game.hudContainer = new game.HUD.Container();
      me.game.world.addChild(game.hudContainer);
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
      me.input.unbindKey(me.input.KEY.ENTER);
    },

    update : function(time) {
      game.scene.update(time);
      game.timer.update();
    }
  });
}).call(this);