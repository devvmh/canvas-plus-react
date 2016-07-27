const { Stage, Shape } = window.createjs

const drawCanvas = (canvasId, nodes, synapses, changeNode) => {
  const stage = new Stage(document.getElementById(canvasId))
  synapses.forEach(synapse => {
    const node1 = nodes.filter(node => node.id === synapse.node1_id)[0]
    const node2 = nodes.filter(node => node.id === synapse.node2_id)[0]
    const line = new Shape()
    line.graphics.setStrokeStyle(1)
    line.graphics.beginStroke('black')
    line.graphics.moveTo(node1.x, node1.y)
    line.graphics.lineTo(node2.x, node2.y)
    line.graphics.endStroke()
    stage.addChild(line)
  })
  nodes.forEach(node => {
    const circle = new Shape()
    circle.graphics.beginFill(node.color).drawCircle(node.x, node.y, node.radius)
    circle.on("mousedown", function(e) {
      // needed for dragging since e.target is set at 0, 0 in pressmove
      this.offset = {
        x: e.target.x - e.stageX,
        y: e.target.y - e.stageY
      }
    })
    circle.on("pressmove", function(e) {
      e.target.x = e.stageX + this.offset.x
      e.target.y = e.stageY + this.offset.y
      stage.update()
    })
    circle.on("pressup", e => {
      changeNode(node.id, {
        ...node,
        x: e.stageX,
        y: e.stageY
      })
    })
    stage.addChild(circle)
  })
  stage.update()
}

export default drawCanvas
