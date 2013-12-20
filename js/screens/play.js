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
      this.parent(true, true);
      this.scenes = [new game.BrotherScene(), new game.MotherScene(), new game.FatherScene()];
      this.currentScene = 0;
    },

    nextScene : function() {
      this.scenes[this.currentScene].cleanup();
      me.game.world.addChild(this.background);
      this.currentScene++;
      if(typeof this.scenes[this.currentScene] === 'undefined') {
        me.game.world.removeChild(this);
        me.state.change(me.state.GAME_END);
      }
      else {
        game.scene = this.scenes[this.currentScene];
        me.game.world.addChild(game.scene);
        game.scene.stage();
      }
    },

    onResetEvent: function() {
      me.input.bindKey(me.input.KEY.ENTER, 'enter');
      game.timer = new game.Timer();
      game.scene = new game.MotherScene();
      game.hudContainer = new game.HUD.Container();
      this.background = new Background();
      me.game.world.addChild(game.scene);
      me.game.world.addChild(this.background);
      me.game.world.addChild(game.hudContainer);
      me.audio.playTrack('ld28');
      game.scene.stage();
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
      me.input.unbindKey(me.input.KEY.ENTER);
    },

    showNextButton : function() {
      game.hudContainer.nextButton.visible = true;
    },

    showRestartButton : function() {
      game.hudContainer.restartButton.visible = true;
    },

    update : function(time) {
      game.scene.update(time);
      game.timer.update();
    }
  });
}).call(this);