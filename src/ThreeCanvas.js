import React, { PropTypes, Component } from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'

class ThreeCanvas extends Component {
  render = () => {
    return (
      <React3 mainCamera="camera"
        width={this.props.width}
        height={this.props.height}
        clearColor={'white'}
      >
        <scene>
          <perspectiveCamera name="camera"
            fov={185.5}
            aspect={this.props.width / this.props.height}
            position={new THREE.Vector3(this.props.x - 100, 100 - this.props.y, 5)}
          />
          <mesh>
            <circleGeometry radius={10}
              segments={15}
            />
            <meshBasicMaterial color={0xff0000} />
          </mesh>
        </scene>
      </React3>
    )
  }
}

export default ThreeCanvas
