import keyMap from '../../config/defaultKeyMap';

const DOUBLE_PRESS_TIME = 300;

class Controls {
  constructor(world) {
    this.world = world;

    this.lastPressDown = {
      key: '',
      timeStamp: 0
    };

    this.onEvent = this.onEvent.bind(this);

    window.addEventListener('keydown', this.onEvent);
		window.addEventListener('keyup', this.onEvent);
		window.addEventListener('mousedown', this.onEvent);
		window.addEventListener('mouseup', this.onEvent);
  }

  onEvent(event) {
    if (event.repeat) {
      return;
    }

    const press = this.getPress(event);

    // get action
    let action = '';
    if (press.double && keyMap['d' + press.key]) {
      action = keyMap['d' + press.key]
    } else {
      action = keyMap[press.key];
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
