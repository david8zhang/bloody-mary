export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('sample-vampire', 'sample-vampire.png')
  }
  create() {
    this.scene.start('game')
  }
}
