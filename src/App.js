import React, { Component } from 'react';
import './App.css';
import drawCanvas from './drawCanvas.js'
import PixiCanvas from './PixiCanvas.js'

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
        inputs: {
          nextX: '',
          nextY: '',
          nextColor: '#ff0000',
          node1_id: '',
          node2_id: ''
        },
        nodes: {
          byId: {
            1: { id: 1, x: 10, y: 10, color: '#ff0000', radius: 10 },
            2: { id: 2, x: 110, y: 10, color: '#ff0000', radius: 10 }
          },
          ids: [1, 2]
        },
        synapses: {
          byId: {
            1: { id: 1, node1_id: 1, node2_id: 2 }
          },
          ids: [1]
        }
      }
    }
  }

  componentDidMount = () => {
    drawCanvas('test-canvas', this.nodes(), this.synapses(), this.handleChangeNode)
  }

  componentDidUpdate = (prevProps, prevState) => {
    drawCanvas('test-canvas', this.nodes(), this.synapses(), this.handleChangeNode)
  }

  lsSetState = changes => {
    const newState = Object.assign({}, this.state, changes)
    localStorage.setItem('state', JSON.stringify(newState))
    this.setState(newState)
  }

  nodes = () => {
    return this.state.nodes.ids.map(id => this.state.nodes.byId[id])
  }

  synapses = () => {
    return this.state.synapses.ids.map(id => this.state.synapses.byId[id])
  }

  handleAddNode = () => {
    const newState = Object.assign({}, this.state)
    const nextId = this.nodes().length === 0
      ? 1
      : this.state.nodes.ids[this.state.nodes.ids.length - 1] + 1
    newState.nodes.byId[nextId] = {
      id: nextId,
      x: parseInt(this.state.inputs.nextX, 10),
      y: parseInt(this.state.inputs.nextY, 10),
      radius: 10,
      color: this.state.inputs.nextColor
    }
    newState.nodes.ids.push(nextId)
    this.lsSetState(newState)
  }

  handleChangeNode = (id, node) => {
    const newState = Object.assign({}, this.state)
    newState.nodes.byId[id] = node
    this.lsSetState(newState)
  }

  handleRemoveNode = id => () => {
    const newState = Object.assign({}, this.state)
    delete newState.nodes.byId[id]
    newState.nodes.ids = newState.nodes.ids.filter(oldId => oldId !== id)
    this.lsSetState(newState)
  }

  handleAddSynapse = () => {
    const newState = Object.assign({}, this.state)
    const nextId = this.synapses().length === 0
      ? 1
      : this.state.synapses.ids[this.state.synapses.ids.length - 1] + 1

    newState.synapses.byId[nextId] = {
      id: nextId,
      node1_id: parseInt(this.state.inputs.node1_id, 10),
      node2_id: parseInt(this.state.inputs.node2_id, 10)
    }
    newState.synapses.ids.push(nextId)
    this.lsSetState(newState)
  }

  handleRemoveSynapse = id => () => {
    const newState = Object.assign({}, this.state)
    delete newState.synapses.byId[id]
    newState.synapses.ids = newState.synapses.ids.filter(oldId => oldId !== id)
    this.lsSetState(newState)
  }

  handleInputChange = field => e => {
    this.lsSetState({
      inputs: {
        ...this.state.inputs,
        [field]: e.target.value
      }
    })
  }

  render = () => {
    return (
      <div className="App">
        <canvas width="200" height="200" id="test-canvas" />
        <p>
          <input value={this.state.inputs.nextX} onChange={this.handleInputChange('nextX')} />
          <input value={this.state.inputs.nextY} onChange={this.handleInputChange('nextY')} />
          <input type="color" value={this.state.inputs.nextColor} onChange={this.handleInputChange('nextColor')} />
          <button onClick={this.handleAddNode}>Add node</button>
        </p>
        <ul>
          {this.nodes().map(node => (
            <li key={node.id}>
              <span>{JSON.stringify(node)}</span>
              <button onClick={this.handleRemoveNode(node.id)}>Remove node</button>
            </li>
          ))}
        </ul>
        <p>
          <input value={this.state.inputs.node1_id} onChange={this.handleInputChange('node1_id')} />
          <input value={this.state.inputs.node2_id} onChange={this.handleInputChange('node2_id')} />
          <button onClick={this.handleAddSynapse}>Add synapse</button>
        </p>
        <ul>
          {this.synapses().map(synapse => (
            <li key={synapse.id}>
              <span>{JSON.stringify(synapse)}</span>
              <button onClick={this.handleRemoveNode(synapse.id)}>Remove synapse</button>
            </li>
          ))}
        </ul>
        <PixiCanvas width={200} height={200} state={this.state} setState={this.lsSetState} />
      </div>
    );
  }
}

export default App;
