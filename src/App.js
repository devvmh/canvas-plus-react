import React, { Component } from 'react';
import './App.css';
import drawCanvas from './drawCanvas.js'

class App extends Component {
  constructor(props) {
    super(props)

    const savedState = localStorage.getItem('state')
    let success = !!savedState
    if (success) {
      try {
        this.state = JSON.parse(savedState)
      } catch(e) {
        success = false
      }
    }
    if (!success) {
      this.state = {
        nextX: '',
        nextY: '',
        nodes: [
          { x: 10, y: 10, color: '#FF0000', radius: 5 }
        ]
      }
    }
  }

  componentDidMount = () => {
    drawCanvas('test-canvas', this.state.nodes)
  }

  componentDidUpdate = (prevProps, prevState) => {
    drawCanvas('test-canvas', this.state.nodes)
  }

  lsSetState = changes => {
    const newState = Object.assign({}, this.state, changes)
    localStorage.setItem('state', JSON.stringify(newState))
    this.setState(newState)
  }

  handleAddNode = () => {
    const newState = Object.assign({}, this.state)
    newState.nodes.push({
      x: parseInt(this.state.nextX, 10),
      y: parseInt(this.state.nextY, 10),
      radius: 5,
      color: '#FF0000'
    })
    this.lsSetState(newState)
  }

  handleRemoveNode = index => () => {
    const newState = Object.assign({}, this.state)
    newState.nodes.splice(index, 1)
    this.lsSetState(newState)
  }

  handleChange = field => e => {
    this.lsSetState({
      [field]: e.target.value
    })
  }

  render = () => {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <canvas width="200" height="200" id="test-canvas" />
        <p>
          <input value={this.state.nextX} onChange={this.handleChange('nextX')} />
          <input value={this.state.nextY} onChange={this.handleChange('nextY')} />
          <button onClick={this.handleAddNode}>Add node</button>
        </p>
        <ul style={{ listStyle: 'none' }}>
          {this.state.nodes.map((node, index) => (
            <li key={index}>
              <span>{JSON.stringify(node)}</span>
              <button onClick={this.handleRemoveNode(index)}>Remove node</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
