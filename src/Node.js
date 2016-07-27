import { CustomPIXIComponent } from 'react-pixi'
import PIXI from 'pixi.js'

const Node = CustomPIXIComponent({ // eslint-disable-line
  customDisplayObject: (props) => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff0000)
    graphics.drawCircle(props.nodeX, props.nodeY, props.radius)
    graphics.endFill()
    return graphics
  }
})

export default Node
