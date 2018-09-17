const DOUBLE_PRESS_TIME = 300;

class Controls {
  constructor(world, keyMap) {
    this.keyMap = keyMap;
    this.world = world;

    this.lastPressDown = {
      key: '',
      timeStamp: 0
    };

    this.onEvent = this.onEvent.bind(this);
  }

  onEvent(event) {
    if (event.repeat) {
      return;
    }

    const press = this.getPress(event);

    // get action
    let action = '';
    if (press.double && this.keyMap['d' + press.key]) {
      action = this.keyMap['d' + press.key]
    } else {
      action = this.keyMap[press.key];
    }

    if (action === undefined) {
      return;
    }

    // perform action
    this.world.onAction(action, !press.down);

    // send to server
  }

  getPress(event) {
    let key = '';
    let down = false;
    let double = false;

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
        key = 'm' + event.button.toString();
        down = true;
        break;
      case 'mouseup':
        key = 'm' + event.button.toString();
        down = false;
        break;
      default:
        ;
    }

    // detect double press down
    if (down) {
      if (this.lastPressDown.key === key
        && event.timeStamp - this.lastPressDown.timeStamp < DOUBLE_PRESS_TIME) {
          double = true;
      }
      this.lastPressDown.key = key;
      this.lastPressDown.timeStamp = event.timeStamp;
    }

    const press = { key, down, double };
    return press;
  }

}

export default Controls;
