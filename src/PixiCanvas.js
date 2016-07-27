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
      <Stage width={this.props.width}
        height={this.props.height}
        backgroundcolor={0xffffff}
        draggable={true}
      >
        {this.synapses().map(synapse => {
          const node1 = this.props.state.nodes.byId[synapse.node1_id]
          const node2 = this.props.state.nodes.byId[synapse.node2_id]
          return (
            <Synapse key={`from${node1.x},${node1.y}to${node2.x},${node2.y}`}
              node1={node1}
              node2={node2}
            />
          )
        })}
        {this.nodes().map(node => {
          return <Node key={`id${node.id}x${node.x}y${node.y}`} node={node} nodeX={node.x} nodeY={node.y} radius={node.radius} />
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
