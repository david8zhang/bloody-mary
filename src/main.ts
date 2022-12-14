import Phaser from 'phaser'
import { GameConstants } from './config/GameConstants'

import Game from './scenes/Game'
import { GameOver } from './scenes/GameOver'
import Preload from './scenes/Preload'
import { Start } from './scenes/Start'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GameConstants.WINDOW_WIDTH,
  height: GameConstants.WINDOW_HEIGHT,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Start, Game, GameOver],
}

export default new Phaser.Game(config)
