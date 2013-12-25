(function() {
  var EndScreenBackground = me.SpriteObject.extend({
    init : function() {
      this.parent(0, 0, me.loader.getImage('end'), me.game.viewport.width, me.game.viewport.height);
      this.z = 1;
    }
  });

  game.EndScreen = me.ScreenObject.extend({
    onResetEvent : function() {
      me.game.world.addChild(new EndScreenBackground());
      for(var i = 0; i < 80; i++) {
        var x = Number.prototype.random(-600, me.game.viewport.width);
        var y = Number.prototype.random(0, me.game.viewport.height);
        me.game.world.addChild(new game.SnowFlake(x, y));
      }
    }
  });
}).call(this);