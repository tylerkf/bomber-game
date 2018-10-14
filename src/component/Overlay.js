import React, { Component } from 'react';

class Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form_url: this.props.currentUrl,
      form_name: this.props.currentName
    };

    this.onChange = this.onChange.bind(this);
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

  render() {
    return (
      <div className='overlay'>
        <h3>Bomber Game Server</h3>
        <form onSubmit={this.join}>
          <p>Server</p>
          <input type='text' name='form_url' value={this.state.form_url} onChange={this.onChange} />
          <p>Join as</p>
          <input type='text' name='form_name' value={this.state.form_name} onChange={this.onChange} />
          <br /><input type='submit' value='Join' />
        </form>
      </div>
    );
  }


}

export default Overlay;
