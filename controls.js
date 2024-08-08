const MARIO_ANIMATIONS = {
   grown: {
      idle: 'mario-grown',
      walk: 'mario-grown-walk',
      jump: 'mario-grow-jump'
   },
   normal: {
      idle: 'mario-idle',
      walk: 'mario-walk',
      jump: 'mario-jump'
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
   mario.anims.play('mario-walk', true)
   mario.flipX = true //para girarlo
   } else if (keys.right.isDown) {
    mario.x += 2
    mario.anims.play('mario-walk', true)
    mario.flipX = false //para que deje de girarlo.
    console.log('hola')
   }else {
      mario.anims.play(marioAnimations.idle, true )
     mario.setVelocityX(0)
   }

   if (keys.up.isDown) {
      
      mario.anims.play('mario-jump', true)
   }
   if (keys.up.isDown && mario.body.touching.down) {
      mario.setVelocityY(-300)
      mario.anims.play('mario-jump', true)
   }


}