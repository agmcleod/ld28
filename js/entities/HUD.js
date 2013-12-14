

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

  init: function() {
    // call the constructor
    this.parent();

    // persistent across level change
    this.isPersistent = true;

    // non collidable
    this.collidable = false;

    // make sure our object is always draw first
    this.z = Infinity;

    // give a name
    this.name = "HUD";

    // add our child score object at the top left corner
    this.addChild(new game.HUD.ScoreItem(5, 5));
  }
});

game.HUD.restartButton = me.AnimationSheet.extend({
  init : function() {
    this.parent(30, 30, me.loader.getImage('buttons'), 160, 64);
    this.addAnimation('idle', [0], 1);
    this.setCurrentAnimation('idle');
    me.input.registerPointerEvent('mousedown', this, this.clicked.bind(this));
  },

  clicked : function() {
    game.scene.restart();
    game.HUD.removeChild(this);
  }
})

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
  /**
   * constructor
   */
  init: function(x, y) {

    // call the parent constructor
    // (size does not matter here)
    this.parent(new me.Vector2d(x, y), 10, 10);

    // local copy of the global score
    this.score = -1;

    // make sure we use screen coordinates
    this.floating = true;
  },

  /**
   * update function
   */
  update : function () {
    // we don't draw anything fancy here, so just
    // return true if the score has been updated
    if (this.score !== me.game.score) {
      this.score = me.game.score;
      return true;
    }
    return false;
  },

  /**
   * draw the score
   */
  draw : function (context) {
    // draw it baby !
  }

});
