const { Stage, Shape } = window.createjs

const drawCanvas = (canvasId, nodes, changeNode) => {
  //if (!window.stage) {
  //  window.stage = new Stage(document.getElementById(canvasId))
  //}
  const stage = new Stage(document.getElementById(canvasId))
  nodes.forEach((node, index) => {
    const circle = new Shape()
    circle.graphics.beginFill(node.color).drawCircle(node.x, node.y, node.radius)
    circle.on("mousedown", function(e) {
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
