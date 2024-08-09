/* global Phaser */
import { createAnimations } from "./animations.js"
import { checkControls } from "./controls.js"
import { initSpritesheet } from "./spritesheet.js"

const config = {
type: Phaser.AUTO,
width: 256,
height: 244,
backgroundColor: '#049cd8',
parent: 'game',
physics: {
default: 'arcade',
arcade: {
   gravity: { y: 400},
   debug: false //para que de información sobre el dato de gravity, para lo cual tendríamos que ponerlo en true.
}  }, //Phaser permite elegir física predeterminadas.
scene: {
    preload, //funcion que se ejecuta para precargar los recursos del juego
    create,   //funcion que se ejecuta cuando se inicia
    update //se ejecuta en cada frame

    }
 
}

new Phaser.Game(config)
   //this -> game -> es el juego que estamos construyendo
   

function preload() {
 this.load.image(
    'cloud1', //esto es la id
    'assets/scenery/overworld/cloud1.png' //direccion
 )
initSpritesheet(this)

 

 this.load.image (
    'floorbricks',
    'assets/scenery/overworld/floorbricks.png',
 )

 this.load.image(
   'supermushroom',
   'assets/collectibles/super-mushroom.png'
 )

}
function create() {
   createAnimations(this)
    console.log('create')
    //image (x,y, id-del-aset)
    this.add.image(0,0, 'cloud1') //referencia a la imagen cargada en preload
    .setOrigin(0,0) //asi si se inserta una imagen se empieza a contar desde
    //la esquinita de arriba a la izquierda.
    .setScale(0.15) //para escalar la imagen

    this.floor = this.physics.add.staticGroup()

    this.floor
    .create(0, config.height -16, 'floorbricks')
    .setOrigin(0,0.5)
    .refreshBody() //Sincroniza la posición y el tamaño con el objeto del juego. No se necesita para cuerpos dinámicos, pero
    //para objetos estáticos es util.
  


    this.floor
    .create(170, config.height -16, 'floorbricks')
    .setOrigin(0,0.5)
    .refreshBody()

this.collectibes = this.physics.add.staticGroup()
this.collectibes.create(150,150,'coin').anims.play('coin-idle',true)
this.collectibes.create(190,150,'coin').anims.play('coin-idle',true)
this.collectibes.create(200, config.height -40, 'supermushroom')

    
    // ESTO SE HARÍA SIN LA PROPIEDAD DE PHYSICS. this.add.tileSprite(0, config.height -32, config.width, 32, 'floorbricks') //tileSprite para que se repita. 
    //La posición x, la posición y. Le tenemos que decir el ancho y el alto de esta textura. 
    //f
    // .setOrigin(0,0)

    //this.mario = this.add.sprite(50,210,'mario'). ESTE MARIO SE AÑADE ASÍ SI NO HUBIERA SISTEMA DE FÍSICAS.
    // .setOrigin(0,1)

    this.mario = this.physics.add.sprite(50, 100, 'mario')
    .setOrigin(0,1)
   .setCollideWorldBounds(true) //así, Mario no se escapa por los límites.
   .setGravityY(400)

   this.enemy = this.physics.add.sprite(120,config.height -30,'goomba')
   .setOrigin(0,1)
   .setGravityY(300)
   .setVelocityX(-50) //para que vaya hacia la izq


  
  

   
   this.physics.world.setBounds(0, 0, 2000, config.height ) //limites. (0, 0, 2000, config.height)
   //0, 0: El borde superior izquierdo del mundo físico empieza en la coordenada (0, 0).
   this.physics.add.collider(this.mario, this.floor)
   this.physics.add.collider(this.enemy, this.floor)
   this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this),
   this.physics.add.overlap(this.mario, this.collectibes, onHitItem, null, this)
   
   


   this.cameras.main.setBounds(0,0, 2000, config.height)
   this.cameras.main.startFollow(this.mario)


    this.keys = this.input.keyboard.createCursorKeys() //esta función habilita las teclas en la función update.
      // Agregar la tecla "A"

this.enemy.anims.play('goomba-walk',true)


}

function onHitEnemy (mario, enemy) {
   if (mario.body.touching.down && enemy.body.touching.up) {
      
      mario.setVelocityY(-200);
      
      enemy.anims.play('goomba-death', true);
      addToScore(200,enemy,this)
      enemy.setVelocityX(0)
      
       
      enemy.on('animationcomplete', () => {
         
         
         enemy.destroy();
      })

     
   } else {
    killMario(this)
   }
}



function update() {
   
   const {mario} = this
   checkControls(this)
  

   //check si Mario muere

   

   if (mario.y >= config.height) {
    //killMario(this)
    killMario(this)
    
   }



   
}

function killMario (game) {
   const { mario, scene } = game
 
   if (mario.isDead) return
 
   mario.isDead = true
   mario.anims.play('mario-dead')
   mario.setCollideWorldBounds(false)
 
   mario.body.checkCollision.none = true
   mario.setVelocityX(0)
 
   setTimeout(() => {
     mario.setVelocityY(-250)
   }, 100)
 
   setTimeout(() => {
     scene.restart()
   }, 2000)
 }

 function onHitItem(mario, item) {
   const {texture: {key}} = item
if (key === 'coin' ) {

     item.destroy();
     //coin.disableBody(parametro1, parametro2)
     addToScore(100, item, this)
} else if (key === 'supermushroom'){
  item.destroy();
  this.physics.world.pause(),
  this.anims.pauseAll()


 
let i = 0;
const interval= setInterval(() => {
   i++
mario.anims.play (i % 2 === 0
? 'mario-grown'
: 'mario-idle'
)

}, 100)

mario.isBlocked = true
mario.isGrown = true


setTimeout(() => {
   mario.setDisplaySize(18,32)
   mario.body.setSize(18,32)
this.anims.resumeAll()
mario.isBlocked = false
clearInterval(interval)
this.physics.world.resume()
}, 1000
)
}
 

 }



 function addToScore(scoretoAdd, origin, game) {
   const scoreText=  game.add.text(
      origin.x,
      origin.y,
      scoretoAdd,
      {
         fontFamily: 'pixel',
         fontSize: config.width/ 40
      }
     )
     game.tweens.add({ //añadir animaciones
      targets: scoreText,
      duration: 500,
      y: scoreText.y -20,
      onComplete: () => {
      game.tweens.add( {
         targets: scoreText,
         duration: 300,
         alpha: 0, //transparencia
         onComplete: () => {
            scoreText.destroy()
         }

      })
      }
   }
     )
   
 }











 

   
