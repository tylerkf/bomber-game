import React, { Component } from 'react';

class Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form_url: this.props.currentUrl,
      form_name: this.props.currentName
    };

    this.onChange = this.onChange.bind(this);
    this.onLocalButtonClick = this.onLocalButtonClick.bind(this);
    this.join = this.join.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  join(event) {
    event.preventDefault();
    this.props.onJoin(this.state.form_name, this.state.form_url);
  }

  onLocalButtonClick() {
    this.setState({
      form_url: 'ws://localhost:3001'
    });
  }

  render() {
    return (
      <div className='overlay'>
        <h3>Bomber Game Server</h3>
        <div>
          <p>Server</p>
          <input type='text' name='form_url' value={this.state.form_url} onChange={this.onChange} />
          <input type='button' onClick={this.onLocalButtonClick} value='localhost' />
          <p>Join as</p>
          <input type='text' name='form_name' value={this.state.form_name} onChange={this.onChange} />
          <br /><input type='button' onClick={this.join} value='Join' />
        </div>
      </div>
    );
  }


}

export default Overlay;
