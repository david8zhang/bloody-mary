import Phaser from 'phaser'
import { BloodTypes, BLOOD_TYPE_TO_COLOR } from '~/config/BloodTypes'
import { GameConstants } from '~/config/GameConstants'
import { Goblet } from '~/core/Goblet'
import { Blood } from '~/core/Blood'
import { Button } from '~/ui/Button'
import { Customer } from '~/core/Customer'
import { CocktailGrade, COCKTAIL_GRADE_REP_BONUSES } from '~/config/PrefConstants'

export default class Game extends Phaser.Scene {
  private goblet!: Goblet

  // Reputation
  private reputationScore: number = 100
  private reputationText!: Phaser.GameObjects.Text
  private addRepText!: Phaser.GameObjects.Text

  // Bar
  private barTop!: Phaser.GameObjects.Rectangle
  private barBottom!: Phaser.GameObjects.Rectangle

  // Blood Types to choose from
  private bloods: Blood[] = []
  public selectedBlood: Blood | null = null

  // Current customer
  private currCustomer!: Customer

  constructor() {
    super('game')
  }

  initGameScale() {
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  createBar() {
    const height = GameConstants.WINDOW_HEIGHT * 0.4
    const width = GameConstants.WINDOW_WIDTH

    const yPos = GameConstants.WINDOW_HEIGHT * 0.5 + 210
    const xPos = GameConstants.WINDOW_WIDTH * 0.5
    this.barTop = this.add
      .rectangle(xPos, yPos, width, height, 0x964b00)
      .setDepth(GameConstants.SORT_ORDER.bar)
    this.barBottom = this.add
      .rectangle(xPos, this.barTop.y + this.barTop.displayHeight, width, height, 0x7b3f00)
      .setDepth(GameConstants.SORT_ORDER.bar)
  }

  createGoblet() {
    this.goblet = new Goblet(this, {
      position: {
        x: 140,
        y: GameConstants.WINDOW_HEIGHT / 2 + 60,
      },
    })
  }

  createReputationScoreText() {
    this.reputationText = this.add
      .text(GameConstants.WINDOW_WIDTH - 20, 40, `Rep: ${this.reputationScore}`)
      .setFontSize(20)
    this.reputationText.setPosition(
      GameConstants.WINDOW_WIDTH - this.reputationText.displayWidth - 40,
      30
    )
    this.addRepText = this.add
      .text(GameConstants.WINDOW_WIDTH - 40, this.reputationText.y + 20, '')
      .setFontSize(18)
  }

  getAllBloodTypes(): BloodTypes[] {
    const bloodTypes = Object.keys(BloodTypes).filter((item) => {
      return isNaN(Number(item))
    })
    return bloodTypes as BloodTypes[]
  }

  createBloods() {
    const bloodTypes = this.getAllBloodTypes()
    let xPos = 60
    const yPos = this.barTop.y + 60
    bloodTypes.forEach((bloodType: string) => {
      new Blood(this, {
        position: {
          x: xPos,
          y: yPos,
        },
        bloodType: bloodType as BloodTypes,
      })
      xPos += 75
    })
  }

  create() {
    this.initGameScale()
    this.initButtons()
    this.createBar()
    this.createGoblet()
    this.createBloods()
    this.createCustomer()
    this.createReputationScoreText()
  }

  public static shuffle(array: any[]): any[] {
    let currentIndex = array.length,
      randomIndex
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  createCustomer() {
    this.currCustomer = new Customer(this, {
      position: {
        x: GameConstants.WINDOW_WIDTH / 2,
        y: GameConstants.WINDOW_HEIGHT / 2 + 50,
      },
    })
  }

  selectBlood(blood: Blood) {
    if (this.selectedBlood != null && this.selectedBlood != blood) {
      this.selectedBlood.deselect()
    }
    this.selectedBlood = blood
  }

  pourBlood() {
    if (this.selectedBlood) this.goblet.pour(this.selectedBlood)
  }

  initButtons() {
    new Button(this, {
      width: 200,
      height: 40,
      text: 'Mix',
      position: {
        x: 140,
        y: 60,
      },
      fontSize: 20,
      onPress: () => {
        this.goblet.mix()
      },
    })
    new Button(this, {
      width: 200,
      height: 40,
      text: 'Serve',
      position: {
        x: 140,
        y: 110,
      },
      fontSize: 20,
      onPress: () => {
        this.goblet.serve()
      },
    })
    new Button(this, {
      width: 200,
      height: 40,
      text: 'Dump',
      position: {
        x: 140,
        y: 160,
      },
      fontSize: 20,
      onPress: () => {
        this.goblet.dump()
      },
    })
  }

  addRep(grade: CocktailGrade) {
    const pointsToAdd = COCKTAIL_GRADE_REP_BONUSES[grade]
    const sign = pointsToAdd > 0 ? '+' : ''
    this.addRepText.setText(`${sign}${pointsToAdd}`).setVisible(true).setAlpha(1)
    this.addRepText.setPosition(
      GameConstants.WINDOW_WIDTH - this.addRepText.displayWidth - 40,
      this.reputationText.y + 20
    )
    this.tweens.add({
      targets: [this.addRepText],
      y: '-=20',
      alpha: {
        from: 1,
        to: 0,
      },
      onComplete: () => {
        this.reputationScore += pointsToAdd
        this.reputationText
          .setText(`Rep: ${this.reputationScore}`)
          .setPosition(GameConstants.WINDOW_WIDTH - this.reputationText.displayWidth - 40, 30)
        this.addRepText.setPosition(0, this.reputationText.y + 20)
      },
    })
  }

  evaluateDrink(recipe: BloodTypes[]) {
    const grade = this.currCustomer.evaluateDrink(recipe)
    this.currCustomer.displayReaction(grade as CocktailGrade, () => {
      this.addRep(grade as CocktailGrade)
      this.goblet.clearGlassAndReset()
      if (grade === CocktailGrade.DEAD) {
        this.currCustomer.die()
      } else {
        this.currCustomer.moveAlong()
      }
    })
  }
}
