class PlaceBombMessage {
  constructor(level) {
    this.level = level;
  }

  generate() {
    return {
      type: 'place bomb',
      level: this.level
    }
  }

  toString() {
    return JSON.stringify(this.generate());
  }
}

export default PlaceBombMessage;
