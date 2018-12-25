class PlaceBombMessage {
  generate() {
    return {
      type: 'place bomb'
    }
  }

  toString() {
    return JSON.stringify(this.generate());
  }
}

export default PlaceBombMessage;
