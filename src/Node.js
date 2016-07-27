import { CustomPIXIComponent } from 'react-pixi'
import PIXI from 'pixi.js'

const Node = CustomPIXIComponent({ // eslint-disable-line
  customDisplayObject: (props) => {
    const graphics = new PIXI.Graphics()
    // eslint-disable-next-line
    var color = eval(props.node.color.replace(/#([0-9a-fA-F]{6}).*/, "0x$1"))
    graphics.beginFill(color)
    graphics.drawCircle(props.nodeX, props.nodeY, props.radius)
    graphics.endFill()
    return graphics
  }
})

export default Node
