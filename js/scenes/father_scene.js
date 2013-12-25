(function() {
  game.FatherScene = game.Scene.extend({
    init : function() {
      this.parent();
      this.dad = new game.Dad();
      this.tree = new game.Tree();
      this.snow = new me.SpriteObject(0, me.game.viewport.height - 64, me.loader.getImage('ground-snow'), me.game.viewport.width, 64);
      this.treeProgress = new game.TreeProgress();
    },

    cleanup : function() {
      game.hudContainer.treeMessage.visible = false;
      this.parent();
    },

    end : function() {
      game.playScreen.showNextButton();
      me.game.world.removeChild(this.treeProgress);
      this.ended = true;
    },

    load : function() {
      this.parent('father-intro');
    },

    stage : function() {
      game.playScreen.background.color = '#005';
      me.audio.playTrack('ld28-mother');
      me.game.world.addChild(this.tree);
      me.game.world.addChild(this.dad);
      me.game.world.addChild(this.snow, 1);
      me.game.world.addChild(this.treeProgress);
      for(var i = 0; i < 80; i++) {
        var x = Number.prototype.random(-600, me.game.viewport.width);
        var y = Number.prototype.random(0, me.game.viewport.height);
        me.game.world.addChild(new game.SnowFlake(x, y));
      }
    },

    update : function(time) {
      this.parent(time);
      if(!this.showIntro && !this.ended && me.input.isKeyPressed('enter')) {
        this.dad.swing();
        this.tree.animate();
        if(this.treeProgress.incrementPercent() >= 100) {
          this.end();
        }
      }
      else if(this.ended) {
        game.hudContainer.treeMessage.visible = true;
      }
    }
  });
}).call(this);