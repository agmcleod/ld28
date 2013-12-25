(function() {
  var collected = 0;
  var secondsLeft = 20;
  game.MotherScene = game.Scene.extend({
    init : function() {
      this.parent();
      this.ground = new game.Ground();
      this.buildings = new game.Buildings();
      this.items = [
        new game.PickupItem(220, 540, 'guitar'),
        new game.PickupItem(500, 633, 'food'),
        new game.PickupItem(450, -50, 'lotus'),
        new game.PickupItem(850, 130, 'candycane'),
        new game.PickupItem(750, 490, 'chocolate'),
        new game.PickupItem(600, 150, 'puppy')
      ];
    },

    cleanup : function() {
      game.hudContainer.timeRemaining.visible = false;
      for(var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        me.input.releasePointerEvent('mousedown', item);
      }
      this.parent();
    },

    itemCollected : function() {
      collected++;
      me.audio.play('collect');
      if(collected >= this.items.length) {
        game.playScreen.showNextButton();
      }
    },

    load : function() {
      this.parent('mother-intro');
    },

    restart : function() {
      collected = 0;
      secondsLeft = 20;
      this.loss = false;
      for(var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if(!me.game.world.hasChild(item)) {
          if(!item.hasPointerEvent) {
            me.input.registerPointerEvent('mousedown', item, item.clicked.bind(item));
            item.hasPointerEvent = true;
          }
          me.game.world.addChild(item);
        }
      }
    },

    stage : function() {
      me.game.world.addChild(this.ground);
      me.game.world.addChild(this.buildings);
      game.hudContainer.timeRemaining.visible = true;
      this.loss = false;
      me.audio.playTrack('ld28-mother');
      for(var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        me.game.world.addChild(item);
        item.hasPointerEvent = true;
        me.input.registerPointerEvent('mousedown', item, item.clicked.bind(item));
      }
    },

    update : function(time) {
      this.parent(time);
      if(!this.loss) secondsLeft -= game.timer.deltaAsSeconds();
      game.hudContainer.timeRemaining.setRemaining(~~secondsLeft);
      if(secondsLeft < 0) {
        secondsLeft = 0;
        if(!game.hudContainer.restartButton.visible) {
          this.loss = true;
          game.hudContainer.restartButton.visible = true;
        }
      }
    }
  });
}).call(this);