import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import Keepalive from './components/Keepalive/demo/index2'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }
  shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    console.log('我被处罚了');
    return true
  }
  render(): React.ReactNode {
    return <>
      <div>{this.state.count}</div>
      <button onClick={() => this.setState(() => ({
        count: this.state.count + 1
      }))}>+1</button>
    </>
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Keepalive />
)
