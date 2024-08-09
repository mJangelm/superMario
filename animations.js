export const createAnimations = (game) => {
    

  if (!game.anims.exists('mario-walk')) {
   game.anims.create({
    key:  'mario-walk',
   frames: game.anims.generateFrameNumbers(
      'mario',
      {start: 3, end: 1}      
      ),
      repeat: -1, //-1 es infinito.
      frameRate: 12,
    });
  }

  if (!game.anims.exists('mario-idle')) {

    game.anims.create( {
      key: 'mario-idle', //cuando el mario no está moviéndose.
      frames: [{key: 'mario', frame: 0}]
    })
  }

  if (!game.anims.exists('mario-jump')) {

    game.anims.create( {
      key: 'mario-jump', //cuando el mario no está moviéndose.
      frames: [{key: 'mario', frame: 5}]
    })
  }

   if (!game.anims.exists('mario-dead')) {
    game.anims.create( {
        key: 'mario-dead', //cuando el mario no está moviéndose.
        frames: [{key: 'mario', frame: 4}]
      })
    }

    game.anims.create( {
      key: 'mario-grown',
      frames: [{key: 'mario-grown', frame: 0}]

    }
    )
   
  game.anims.create( {
      key: 'mario-grown-jump', //cuando el mario no está moviéndose.
      frames: [{key: 'mario-grown', frame: 5}]
    })

    game.anims.create({
      key:  'mario-grown-walk',
     frames: game.anims.generateFrameNumbers(
        'mario-grown',
        {start: 3, end: 1}      
        ),
        repeat: -1, //-1 es infinito.
        frameRate: 12,
      });

      game.anims.create( {
        key: 'mario-grown-crouch',
        frames: [{key: 'mario-grown', frame: 4}]
  
      }
      )
    
  
    game.anims.create( {
      key: 'goomba-walk',
      frames: game.anims.generateFrameNumbers(
        'goomba',
        {start: 0, end: 1}
      ),
      frameRate: 12,
      repeat: -1
    })

    game.anims.create ({
      key: 'goomba-death',
      frames: game.anims.generateFrameNumbers(
        'goomba',
        {start: 2, end: 2}
      ),
      frameRate: 12,
      repeat: 1
    })

    game.anims.create( {
      key: 'coin-idle',
      frames: game.anims.generateFrameNumbers(
        'coin',
        {start: 0, end: 3}),
        frameRate: 12,
        repeat: -1
})
    }


