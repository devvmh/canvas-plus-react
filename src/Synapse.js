import { CustomPIXIComponent } from 'react-pixi'
import PIXI from 'pixi.js'

const Synapse = CustomPIXIComponent({ // eslint-disable-line
  customDisplayObject: (props) => {
    const graphics = new PIXI.Graphics()
    graphics.lineColor = 0xe743c
    graphics.lineWidth = 1
    graphics.moveTo(props.node1.x, props.node1.y)
    graphics.lineTo(props.node2.x, props.node2.y)
    return graphics
  }
})

export default Synapse
