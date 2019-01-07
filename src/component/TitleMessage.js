import React, { Component } from 'react';

class TitleMessage extends Component {
  render() {
    return(
      <div className='title-message-outer'>
        <h1 className='title-message-inner'>
          {this.props.message}
        </h1>
      </div>
    );
  }

}

export default TitleMessage;
