import React, { PropTypes, Component } from 'react'
import { Stage } from 'react-pixi'
import Node from './Node.js'
import Synapse from './Synapse.js'

class PixiCanvas extends Component {
  nodes = () => {
    return this.props.state.nodes.ids.map(id => {
      return this.props.state.nodes.byId[id]
    })
  }

  synapses = () => {
    return this.props.state.synapses.ids.map(id => {
      return this.props.state.synapses.byId[id]
    })
  }

  render = () => {
    return (
      <Stage width={this.props.width} height={this.props.height} backgroundColor={0x000000}>
        {this.synapses().map(synapse => {
          return (
            <Synapse key={`from${synapse.node1_id}to${synapse.node2_id}`}
              node1={this.props.state.nodes.byId[synapse.node1_id]}
              node2={this.props.state.nodes.byId[synapse.node2_id]}
            />
          )
        })}
        {this.nodes().map(node => {
          return <Node key={`id${node.id}x${node.x}y${node.y}`} node={node} nodeX={node.x} nodeY={node.y} radius={5} />
        })}
      </Stage>
    )
  }
}

PixiCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  state: PropTypes.object,
  setState: PropTypes.func
}

export default PixiCanvas
