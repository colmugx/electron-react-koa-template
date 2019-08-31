import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './pages/router'

const App = () => (
  <div>
    <Router />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
