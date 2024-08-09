const MARIO_ANIMATIONS = {
   grown: {
      idle: 'mario-grown',
      walk: 'mario-grown-walk',
      jump: 'mario-grown-jump',
      crouch: 'mario-grown-crouch'
   },
   normal: {
      idle: 'mario-idle',
      walk: 'mario-walk',
      jump: 'mario-jump',
      crouch: 'mario-idle'
   }
}


export function checkControls ({mario, keys}) {
   const marioAnimations = mario.isGrown
   ? MARIO_ANIMATIONS.grown
   : MARIO_ANIMATIONS.normal

   

   if (mario.isDead) return
   if (mario.isBlocked) return

   if (keys.left.isDown) {
    mario.x -= 2
   mario.anims.play(marioAnimations.walk, true)
   mario.flipX = true //para girarlo
   } else if (keys.right.isDown) {
    mario.x += 2
    mario.anims.play(marioAnimations.walk, true)
    mario.flipX = false //para que deje de girarlo.
    console.log('hola')
   }else {
      mario.anims.play(marioAnimations.idle, true )
     mario.setVelocityX(0)
   }

   if (keys.up.isDown) {
      
      mario.anims.play(marioAnimations.jump, true)
   }
   if (keys.up.isDown && mario.body.touching.down) {
      mario.setVelocityY(-300)
      mario.anims.play(marioAnimations.jump, true)
   }

   if (keys.down.isDown) {
      mario.anims.play(marioAnimations.crouch, true)
      mario.body.setSize(18,16)
      mario.body.offset.y = 16; //para que no se quede atrapado en el suelo
      
      console.log('mario agachado')   
   } else if (mario.isGrown) {
      mario.body.setSize(16,32)
      mario.body.offset.y = 0;
   }
   }
 


