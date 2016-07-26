const { Stage, Shape } = window.createjs

const drawCanvas = (canvasId, nodes) => {
  const canvas = document.getElementById(canvasId)
  const stage = new Stage(canvas)
  nodes.forEach(node => {
    const circle = new Shape()
    circle.graphics.beginFill(node.color).drawCircle(node.x, node.y, node.radius)
    circle.on("pressmove", function(e) {
      e.currentTarget.x = e.stageX
      e.currentTarget.y = e.stageY
      stage.update()
    })
    stage.addChild(circle)
  })
  stage.update()
}

export default drawCanvas
