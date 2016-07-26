import React, { Component } from 'react';
import './App.css';
import drawCanvas from './drawCanvas.js'

const STATE_VERSION = 1

class App extends Component {
  constructor(props) {
    super(props)

    const savedState = localStorage.getItem('state')
    let success = !!savedState
    if (success) {
      try {
        this.state = JSON.parse(savedState)
        if (this.state.STATE_VERSION !== STATE_VERSION) {
          success = false
        }
      } catch(e) {
        success = false
      }
    }
    if (!success) {
      this.state = {
        STATE_VERSION,
        nextX: '',
        nextY: '',
        byId: {
          1: { id: 1, x: 10, y: 10, color: '#FF0000', radius: 5 }
        },
        nodeIds: [1]
      }
    }
  }

  componentDidMount = () => {
    drawCanvas('test-canvas', this.nodes(), this.handleChangeNode)
  }

  componentDidUpdate = (prevProps, prevState) => {
    drawCanvas('test-canvas', this.nodes(), this.handleChangeNode)
  }

  lsSetState = changes => {
    const newState = Object.assign({}, this.state, changes)
    localStorage.setItem('state', JSON.stringify(newState))
    this.setState(newState)
  }

  nodes = () => {
    return this.state.nodeIds.map(id => this.state.byId[id])
  }

  handleAddNode = () => {
    const newState = Object.assign({}, this.state)
    const nextId = this.state.nodeIds[this.state.nodeIds.length - 1] + 1
    newState.byId[nextId] = {
      id: nextId,
      x: parseInt(this.state.nextX, 10),
      y: parseInt(this.state.nextY, 10),
      radius: 5,
      color: '#FF0000'
    }
    newState.nodeIds.push(nextId)
    this.lsSetState(newState)
  }

  handleChangeNode = (id, node) => {
    const newState = Object.assign({}, this.state)
    newState.byId[id] = node
    this.lsSetState(newState)
  }

  handleRemoveNode = id => () => {
    const newState = Object.assign({}, this.state)
    delete newState.byId[id]
    newState.nodeIds = newState.nodeIds.filter(oldId => oldId !== id)
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
          {this.nodes().map(node => (
            <li key={node.id}>
              <span>{JSON.stringify(node)}</span>
              <button onClick={this.handleRemoveNode(node.id)}>Remove node</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
