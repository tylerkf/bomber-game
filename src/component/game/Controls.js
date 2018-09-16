class Controls {
  constructor(world, keyMap) {
    this.keyMap = keyMap;
    this.world = world;

    this.onEvent = this.onEvent.bind(this);
    this.getPress = this.getPress.bind(this);
  }

  onEvent(event) {
    const press = this.getPress(event);
    const action = this.keyMap[press.key];

    if (action === undefined) {
      return;
    }

    // perform action
    this.world.onAction(action)

    // send to server
  }

  getPress(event) {
    let key = '';
    let down = false;

    switch (event.type) {
      case 'keydown':
        key = event.key;
        down = true;
        break;
      case 'keyup':
        key = event.key;
        down = false;
        break;
      case 'mousedown':
        key = 'mouse' + event.button.toString();
        down = true;
        break;
      case 'mouseup':
        key = 'mouse' + event.button.toString();
        down = false;
    }

    const press = { key, down };
    return press;
  }

}

export default Controls;
