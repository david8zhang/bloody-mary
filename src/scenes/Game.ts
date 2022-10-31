import Phaser from 'phaser'
import { BloodTypes, BLOOD_TYPE_TO_COLOR } from '~/config/BloodTypes'
import { GameConstants } from '~/config/GameConstants'
import { Goblet } from '~/core/Goblet'
import { Blood } from '~/core/Blood'
import { Button } from '~/ui/Button'
import { Customer } from '~/core/Customer'
import {
  CocktailGrade,
  COCKTAIL_GRADE_REP_BONUSES,
  TimeGradeTypes,
  TIME_BONUSES,
} from '~/config/GradeConstants'
import { Guide } from '~/core/Guide'

export default class Game extends Phaser.Scene {
  private goblet!: Goblet
  private guide!: Guide
  public isShowingGuide: boolean = false

  // Reputation
  private reputationScore: number = 100
  private reputationText!: Phaser.GameObjects.Text
  private addRepText!: Phaser.GameObjects.Text
  private addBonusRepText!: Phaser.GameObjects.Text

  // Timer
  private timer: number = 0
  private timerEvent!: Phaser.Time.TimerEvent
  private timerText!: Phaser.GameObjects.Text

  // Bar
  private barTop!: Phaser.GameObjects.Sprite

  // Blood Types to choose from
  private bloods: Blood[] = []
  public selectedBlood: Blood | null = null

  // Current customer
  public assetMappings: any = {}
  private currCustomer!: Customer

  constructor() {
    super('game')
  }

  init(data: { assetMappings: any }) {
    this.assetMappings = data.assetMappings
  }

  initGameScale() {
    this.game.scale.setZoom(GameConstants.GAME_ZOOM_FACTOR)
  }

  createBar() {
    const yPos = GameConstants.WINDOW_HEIGHT * 0.5
    const xPos = GameConstants.WINDOW_WIDTH * 0.5
    this.barTop = this.add.sprite(xPos, yPos, 'table').setDepth(GameConstants.SORT_ORDER.bar)
  }

  createGoblet() {
    this.goblet = new Goblet(this, {
      position: {
        x: 140,
        y: GameConstants.WINDOW_HEIGHT / 2 + 30,
      },
    })
  }

  createTimerText() {
    this.timerText = this.add
      .text(
        GameConstants.WINDOW_WIDTH - this.reputationText.displayWidth - 40,
        30,
        `Time: ${this.timer}s`
      )
      .setFontSize(20)
    this.timerText.setPosition(this.reputationText.x - this.reputationText.displayWidth - 30, 30)
    this.timerEvent = this.time.addEvent({
      repeat: -1,
      delay: 1000,
      callback: () => {
        this.timer++
        this.updateTimerText()
      },
      paused: true,
    })
  }

  updateTimerText() {
    this.timerText
      .setText(`Time: ${this.timer}s`)
      .setPosition(this.reputationText.x - this.timerText.displayWidth - 30, 30)
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
    this.addBonusRepText = this.add
      .text(this.addRepText.x, this.addRepText.y + 20, '')
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
    const yPos = this.barTop.y + 250
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
    this.createTimerText()
    this.createGuide()
  }

  createGuide() {
    this.guide = new Guide(this, false)
    const guideOnTable = this.add
      .rectangle(
        GameConstants.WINDOW_WIDTH - 100,
        GameConstants.WINDOW_HEIGHT - 130,
        150,
        200,
        0x000000
      )
      .setDepth(GameConstants.SORT_ORDER.ui)
      .setInteractive()
      .on('pointerdown', () => {
        this.isShowingGuide = true
        this.guide.show()
      })
    const guideText = this.add
      .text(guideOnTable.x, guideOnTable.y - 75, 'Vampire\nBartending\n101')
      .setDepth(GameConstants.SORT_ORDER.ui)
      .setAlign('center')
      .setFontSize(18)
    guideText.setPosition(guideOnTable.x - guideText.displayWidth / 2, guideOnTable.y - 75)
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
        y: GameConstants.WINDOW_HEIGHT / 2 - 60,
      },
      onOrder: () => {
        this.timerEvent.paused = false
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
    if (this.selectedBlood && !this.isShowingGuide) {
      this.goblet.pour(this.selectedBlood)
    }
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
        if (!this.isShowingGuide) {
          this.goblet.mix()
        }
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
        if (!this.isShowingGuide && this.goblet.isMixed) {
          this.timerEvent.paused = true
          this.goblet.serve()
        }
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
        if (!this.isShowingGuide) {
          this.goblet.dump()
        }
      },
    })
  }

  addRep(grade: CocktailGrade, timeGrade: TimeGradeTypes) {
    const pointsToAdd = COCKTAIL_GRADE_REP_BONUSES[grade]
    let bonusPoints = 0
    if (grade !== CocktailGrade.DEAD) {
      bonusPoints = TIME_BONUSES[timeGrade]
      if (grade === CocktailGrade.F || grade === CocktailGrade.D) {
        bonusPoints = Math.min(0, bonusPoints)
      }
    }
    const sign = pointsToAdd > 0 ? '+' : ''
    this.addRepText.setText(`${sign}${pointsToAdd}`).setVisible(true).setAlpha(1)
    this.addRepText.setPosition(
      GameConstants.WINDOW_WIDTH - this.addRepText.displayWidth - 40,
      this.reputationText.y + 20
    )

    const bonusSign = bonusPoints > 0 ? '+' : ''
    this.addBonusRepText
      .setText(`${bonusSign}${bonusPoints}`)
      .setVisible(true)
      .setAlpha(1)
      .setVisible(bonusPoints !== 0)
    this.addBonusRepText.setPosition(this.addRepText.x, this.addRepText.y + 20)

    const addRepCb = () => {
      this.reputationScore += pointsToAdd + bonusPoints
      this.reputationText
        .setText(`Rep: ${this.reputationScore}`)
        .setPosition(GameConstants.WINDOW_WIDTH - this.reputationText.displayWidth - 40, 30)
      this.addRepText.setPosition(0, this.reputationText.y + 20)
      if (this.reputationScore <= 0) {
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start('game-over')
        })
      }
    }

    this.tweens.add({
      targets: [this.addRepText],
      y: '-=20',
      alpha: {
        from: 1,
        to: 0,
      },
      onComplete: () => {
        if (bonusPoints === 0) {
          addRepCb()
        }
      },
    })
    this.tweens.add({
      delay: 100,
      targets: [this.addBonusRepText],
      y: '-=20',
      alpha: {
        from: 1,
        to: 0,
      },
      onComplete: () => {
        if (bonusPoints !== 0) {
          addRepCb()
        }
      },
    })
  }

  getTimeGrade(timeToComplete: number) {
    if (timeToComplete > 0 && timeToComplete < 10) {
      return TimeGradeTypes.LIGHTNING
    } else if (timeToComplete > 10 && timeToComplete < 20) {
      return TimeGradeTypes.FAST
    } else if (timeToComplete > 20 && timeToComplete < 30) {
      return TimeGradeTypes.AVERAGE
    } else {
      return TimeGradeTypes.SLOW
    }
  }

  evaluateDrink(recipe: BloodTypes[]) {
    const timeToComplete = this.timer
    this.timer = 0
    this.updateTimerText()
    const grade = this.currCustomer.evaluateDrink(recipe)
    const timeGrade = this.getTimeGrade(timeToComplete)
    this.currCustomer.displayReaction(grade as CocktailGrade, () => {
      this.addRep(grade as CocktailGrade, timeGrade)
      this.goblet.clearGlassAndReset()
      if (grade === CocktailGrade.DEAD) {
        this.currCustomer.die()
      } else {
        this.currCustomer.moveAlong()
      }
    })
  }
}
