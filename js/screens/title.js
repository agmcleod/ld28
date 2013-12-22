var IntroImage = me.SpriteObject.extend({
  init : function() {
    this.parent(0, 0, me.loader.getImage('intro'), 1024, 768);
    this.isRenderable = true;
  }
});

game.TitleScreen = me.ScreenObject.extend({
  init : function() {
    this.parent(true);
  },

  onResetEvent : function() {
    me.input.bindKey(me.input.KEY.ENTER, 'enter');
    me.input.bindTouch(me.input.KEY.ENTER);
    me.game.world.addChild(new IntroImage(), 1);
  },


  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindTouch();
  },

  update : function() {
    if(me.input.isKeyPressed('enter')) {
      me.state.change(me.state.PLAY);
    }
  }
});
