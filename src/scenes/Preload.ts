import { BloodTypes } from '~/config/BloodTypes'

export default class Preload extends Phaser.Scene {
  public assetMappings: any = {
    male: {},
    female: {},
  }

  constructor() {
    super('preload')
  }

  preload() {
    this.loadFaces()
    this.loadEyes()
    this.loadOutfits()
    this.loadHair()
    this.loadBloodTypes()
    this.loadTable()
    this.loadBartenderOutfit()
    this.loadGuide()
    this.loadGlass()
  }

  getAllBloodTypePathNames() {
    const bloodTypes = Object.keys(BloodTypes).filter((item) => {
      return isNaN(Number(item))
    })
    return bloodTypes.map((b) => b.toLowerCase())
  }

  loadEyes() {
    const allBloodTypePathNames = this.getAllBloodTypePathNames()
    const genders = ['male', 'female']
    genders.forEach((g) => {
      this.assetMappings[g]['eyes'] = {}
      allBloodTypePathNames.forEach((bloodTypePath) => {
        this.assetMappings[g]['eyes'][bloodTypePath] = []
        for (let i = 1; i <= 3; i++) {
          const imgKey = `${g}-eyes${i}-${bloodTypePath}`
          this.load.image(imgKey, `${g}/eyes/${bloodTypePath}/eyes${i}.png`)
          this.assetMappings[g]['eyes'][bloodTypePath].push(imgKey)
        }
      })
    })
  }

  loadFaces() {
    const genders = ['male', 'female']
    genders.forEach((g) => {
      const imgKey = `${g}-face`
      this.assetMappings[g]['face'] = [imgKey]
      this.load.image(`${g}-face`, `${g}/face/face.png`)
    })
  }

  loadOutfits() {
    const allBloodTypePathNames = this.getAllBloodTypePathNames()
    const genders = ['male', 'female']
    genders.forEach((g) => {
      this.assetMappings[g]['outfit'] = {}
      allBloodTypePathNames.forEach((bloodTypePath) => {
        this.assetMappings[g]['outfit'][bloodTypePath] = []
        for (let i = 1; i <= 3; i++) {
          const imgKey = `${g}-outfit${i}-${bloodTypePath}`
          this.load.image(imgKey, `${g}/outfit/${bloodTypePath}/outfit${i}.png`)
          this.assetMappings[g]['outfit'][bloodTypePath].push(imgKey)
        }
      })
    })
  }

  loadHair() {
    const genders = ['male', 'female']
    genders.forEach((g) => {
      this.assetMappings[g]['hair'] = []
      for (let i = 1; i <= 3; i++) {
        const imgKey = `${g}-hair-${i}`
        this.load.image(imgKey, `${g}/hair/hair${i}.png`)
        this.assetMappings[g]['hair'].push(imgKey)
      }
    })
  }

  loadBloodTypes() {
    const bloodTypes = ['fish', 'mammal', 'bird', 'reptile', 'human']
    bloodTypes.forEach((bloodType) => {
      this.load.image(`${bloodType}`, `blood/${bloodType}.png`)
    })
  }

  loadTable() {
    this.load.image('table', 'table.png')
  }

  loadBartenderOutfit() {
    this.load.image('bartender', 'bartender.png')
  }

  loadGuide() {
    this.load.image('guide', 'guide.png')
  }

  loadGlass() {
    this.load.image('glass', 'glass.png')
  }

  create() {
    this.scene.start('start', { assetMappings: this.assetMappings })
  }
}
