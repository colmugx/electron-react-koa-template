import React, { PureComponent } from 'react';
import { ipcRenderer } from 'electron'

class Index extends PureComponent {

  state = {
    msg: ''
  }

  componentDidMount() {}

  handleClick = () => {
    const res = ipcRenderer.sendSync('fetch')
    this.setState({
      msg: res.message
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
