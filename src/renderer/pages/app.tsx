import React, { PureComponent } from 'react';

class Index extends PureComponent {

  state = {
    msg: ''
  }

  componentDidMount() {}

  handleClick = () => {
    fetch('http://localhost:9080')
      .then(res => res.json())
      .then(json => {
        this.setState({
          msg: json.message
        })
      })
  }

  render() {
    return (
      <div style={{margin: '200px'}}>
        <div>
          <span>Welcome to Electron with koa</span>
        </div>
        <div>
          <div>返回结果：{this.state.msg || '-'}</div>
          <button onClick={this.handleClick}>Click</button>
        </div>
      </div>
    );
  }
}

export default Index;
