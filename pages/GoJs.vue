<template>
  <div>
    <div id="sample">
      <div style="width: 100%; display: flex; justify-content: space-between;">
        <div id="myDraggableItems">
          <canvas
            tabindex="0"
            width="200"
            height="1500"
            style="
              position: absolute;
              top: 0px;
              left: 0px;
              z-index: 2;
              user-select: none;
              touch-action: none;
              width: 100px;
              height: 750px;
              cursor: auto;
            "
            >This text is displayed if your browser does not support the Canvas
            HTML element.</canvas
          >
          <div
            style="
              position: absolute;
              overflow: auto;
              width: 100px;
              height: 750px;
              z-index: 1;
            "
          >
            <div style="position: absolute; width: 1px; height: 1px;"></div>
          </div>
        </div>
        <div
          id="myDiagramDiv"
          style="
            flex-grow: 1;
            height: 750px;
            background-color: rgb(40, 44, 52);
            position: relative;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            cursor: auto;
            font: bold 11pt Lato, Helvetica, Arial, sans-serif;
          "
        >
          <canvas
            tabindex="0"
            width="1000"
            height="1500"
            style="
              position: absolute;
              top: 0px;
              left: 0px;
              z-index: 2;
              user-select: none;
              touch-action: none;
              width: 834px;
              height: 750px;
              cursor: auto;
            "
            >This text is displayed if your browser does not support the Canvas
            HTML element.</canvas
          >
          <div
            style="
              position: absolute;
              overflow: auto;
              width: 834px;
              height: 750px;
              z-index: 1;
            "
          >
            <div
              style="position: absolute; width: 1px; height: 756.188px;"
            ></div>
          </div>
        </div>
        <div id="myParamsEditor">
          <div class="introductionEditor">
            <div v-for="stage of node" :key="stage.key">
              <collapseGoJs :stage="stage"/>
            </div>
          </div>
          <div class="questionEditor"></div>
          <button @click="save()">GEN JSON</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collapseGoJs from '~/components/collapseGoJs.vue'

export default {
  name: 'GoJs',
  components: {},
  data() {
    return {
      myDiagram: '',
      jsonGenerator: '',
      node: [],
    }
  },
  mounted() {
    if (window.goSamples) goSamples() // init for these samples -- you don't need to call this

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make // for conciseness in defining templates

    const myDiagram = $(
      go.Diagram,
      'myDiagramDiv', // must name or refer to the DIV HTML element
      {
        LinkDrawn: this.showLinkLabel, // this DiagramEvent listener is defined below
        LinkRelinked: this.showLinkLabel,
        'undoManager.isEnabled': true, // enable undo & redo
      }
    )

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener('Modified', (e) => {
      const button = document.getElementById('SaveButton')
      if (button) button.disabled = !myDiagram.isModified
      const idx = document.title.indexOf('*')
      if (myDiagram.isModified) {
        if (idx < 0) document.title += '*'
      } else if (idx >= 0) document.title = document.title.slice(0, idx)
    })

    // helper definitions for node templates

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId,
    // the "align" is used to determine where to position the port relative to the body of the node,
    // the "spot" is used to control how links connect with the port and whether the port
    // stretches along the side of the node,
    // and the boolean "output" and "input" arguments control whether the user can draw links from or to the port.

    // define the Node templates for regular nodes

    myDiagram.nodeTemplateMap.add(
      '', // the default category
      $(
        go.Node,
        'Table',
        this.nodeStyle(),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'Rectangle',
            { fill: '#282c34', stroke: '#00A9C9', strokeWidth: 3.5 },
            new go.Binding('figure', 'figure')
          ),
          $(
            go.TextBlock,
            this.textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true,
            },
            new go.Binding('text').makeTwoWay()
          )
        ),
        // four named ports, one on each side:
        this.makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
        this.makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        this.makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false)
      )
    )

    myDiagram.nodeTemplateMap.add(
      'Conditional',
      $(
        go.Node,
        'Table',
        this.nodeStyle(),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'Diamond',
            { fill: '#282c34', stroke: '#00A9C9', strokeWidth: 3.5 },
            new go.Binding('figure', 'figure')
          ),
          $(
            go.TextBlock,
            this.textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true,
            },
            new go.Binding('text').makeTwoWay()
          )
        ),
        // four named ports, one on each side:
        this.makePort('T', go.Spot.Top, go.Spot.Top, false, true),
        this.makePort('L', go.Spot.Left, go.Spot.Left, true, true),
        this.makePort('R', go.Spot.Right, go.Spot.Right, true, true),
        this.makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
      )
    )

    myDiagram.nodeTemplateMap.add(
      'Information',
      $(
        go.Node,
        'Table',
        this.nodeStyle(),
        $(
          go.Panel,
          'Spot',
          $(go.Shape, 'Circle', {
            desiredSize: new go.Size(80, 80),
            fill: '#282c34',
            stroke: '#09d3ac',
            strokeWidth: 3.5,
          }),
          $(
            go.TextBlock,
            'Information',
            this.textStyle(),
            new go.Binding('text')
          )
        ),
        // three named ports, one on each side except the top, all output only:
        this.makePort('L', go.Spot.Left, go.Spot.Left, true, false),
        this.makePort('R', go.Spot.Right, go.Spot.Right, true, false),
        this.makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
      )
    )

    myDiagram.nodeTemplateMap.add(
      'End',
      $(
        go.Node,
        'Table',
        this.nodeStyle(),
        $(
          go.Panel,
          'Spot',
          $(go.Shape, 'Circle', {
            desiredSize: new go.Size(60, 60),
            fill: '#282c34',
            stroke: '#DC3C00',
            strokeWidth: 3.5,
          }),
          $(go.TextBlock, 'End', this.textStyle(), new go.Binding('text'))
        ),
        // three named ports, one on each side except the bottom, all input only:
        this.makePort('T', go.Spot.Top, go.Spot.Top, false, true),
        this.makePort('L', go.Spot.Left, go.Spot.Left, false, true),
        this.makePort('R', go.Spot.Right, go.Spot.Right, false, true)
      )
    )

    // taken from https://unpkg.com/gojs@2.3.1/extensions/Figures.js:
    go.Shape.defineFigureGenerator('File', (shape, w, h) => {
      const geo = new go.Geometry()
      const fig = new go.PathFigure(0, 0, true) // starting point
      geo.add(fig)
      fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0))
      fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h))
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h))
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close())
      const fig2 = new go.PathFigure(0.75 * w, 0, false)
      geo.add(fig2)
      // The Fold
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.25 * h))
      fig2.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h))
      geo.spot1 = new go.Spot(0, 0.25)
      geo.spot2 = go.Spot.BottomRight
      return geo
    })

    myDiagram.nodeTemplateMap.add(
      'Comment',
      $(
        go.Node,
        'Auto',
        this.nodeStyle(),
        $(go.Shape, 'File', {
          fill: '#282c34',
          stroke: '#DEE0A3',
          strokeWidth: 3,
        }),
        $(
          go.TextBlock,
          this.textStyle(),
          {
            margin: 8,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            textAlign: 'center',
            editable: true,
          },
          new go.Binding('text').makeTwoWay()
        )
        // no ports, because no links are allowed to connect with a comment
      )
    )

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
        // mouse-overs subtly highlight links:
        mouseEnter: (e, link) => {
          link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)'
        },
        mouseLeave: (e, link) =>
          (link.findObject('HIGHLIGHT').stroke = 'transparent'),
        selectionAdorned: false,
      },
      new go.Binding('points').makeTwoWay(),
      $(
        go.Shape, // the highlight shape, normally transparent
        {
          isPanelMain: true,
          strokeWidth: 8,
          stroke: 'transparent',
          name: 'HIGHLIGHT',
        }
      ),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
        new go.Binding('stroke', 'isSelected', (sel) =>
          sel ? 'dodgerblue' : 'gray'
        ).ofObject()
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: 'standard', strokeWidth: 0, fill: 'gray' }
      ),
      $(
        go.Panel,
        'Auto', // the link label, normally not visible
        {
          visible: false,
          name: 'LABEL',
          segmentIndex: 2,
          segmentFraction: 0.5,
        },
        new go.Binding('visible', 'visible').makeTwoWay(),
        $(
          go.Shape,
          'RoundedRectangle', // the label shape
          { fill: '#F8F8F8', strokeWidth: 0 }
        ),
        $(
          go.TextBlock,
          'Yes', // the label
          {
            textAlign: 'center',
            font: '10pt helvetica, arial, sans-serif',
            stroke: '#333333',
            editable: true,
          },
          new go.Binding('text').makeTwoWay()
        )
      )
    )

    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal
    myDiagram.toolManager.relinkingTool.temporaryLink.routing =
      go.Link.Orthogonal

    // initialize the Palette that is on the left side of the page

    $(
      go.Palette,
      'myDraggableItems', // must name or refer to the DIV HTML element
      {
        // Instead of the default animation, use a custom fade-down
        'animationManager.initialAnimationStyle': go.AnimationManager.None,
        InitialAnimationStarting: this.animateFadeDown, // Instead, animate with this function

        nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
        model: new go.GraphLinksModel([
          // specify the contents of the Palette
          { category: 'Information', text: 'Information' },
          { text: 'Choix' },
          { category: 'Conditional', text: '???' },
          { category: 'End', text: 'End' },
          { category: 'Comment', text: 'Comment' },
        ]),
      }
    )
    this.myDiagram = myDiagram
    // This is a re-implementation of the default animation, except it fades in from downwards, instead of upwards.
  }, // end init

  methods: {
    nodeStyle() {
      return [
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse static method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify static method.
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center,
        },
      ]
    },
    makePort(name, align, spot, output, input) {
      const $ = go.GraphObject.make
      const horizontal =
        align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
      // the port is basically just a transparent rectangle that stretches along the side of the node,
      // and becomes colored when the mouse passes over it
      return $(go.Shape, {
        fill: 'transparent', // changed to a color in the mouseEnter event handler
        strokeWidth: 0, // no stroke
        width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
        alignment: align, // align the port on the main Shape
        stretch: horizontal
          ? go.GraphObject.Horizontal
          : go.GraphObject.Vertical,
        portId: name, // declare this object to be a "port"
        fromSpot: spot, // declare where links may connect at this port
        fromLinkable: output, // declare whether the user may draw links from here
        toSpot: spot, // declare where links may connect at this port
        toLinkable: input, // declare whether the user may draw links to here
        cursor: 'pointer', // show a different cursor to indicate potential link point
        mouseEnter: (e, port) => {
          // the PORT argument will be this Shape
          if (!e.diagram.isReadOnly) {
            port.fill = 'rgba(255,0,255,0.5)'
          }
        },
        mouseLeave: (e, port) => (port.fill = 'transparent'),
      })
    },
    textStyle() {
      return {
        font: 'bold 11pt Lato, Helvetica, Arial, sans-serif',
        stroke: '#F8F8F8',
      }
    },
    showLinkLabel(e) {
      const label = e.subject.findObject('LABEL')
      if (label !== null) {
        label.visible = e.subject.fromNode.data.category === 'Conditional'
      }
    },
    save() {
      this.nodes = []
      this.jsonGenerator = this.myDiagram.model.toJson()
      this.jsonGenerator = JSON.parse(this.jsonGenerator)
      this.jsonGenerator.nodeDataArray.forEach((element) => {
        this.node.push(element)
      })
      this.myDiagram.isModified = false
    },
    load() {
      this.myDiagram.model = go.Model.fromJson(
        document.getElementById('mySavedModel').value
      )
    },
    animateFadeDown(e) {
      const diagram = e.diagram
      const animation = new go.Animation()
      animation.isViewportUnconstrained = true // So Diagram positioning rules let the animation start off-screen
      animation.easing = go.Animation.EaseOutExpo
      animation.duration = 900
      // Fade "down", in other words, fade in from above
      animation.add(
        diagram,
        'position',
        diagram.position.copy().offset(0, 200),
        diagram.position
      )
      animation.add(diagram, 'opacity', 0, 1)
      animation.start()
    },
  },
}
</script>

<style scoped>
#myParamsEditor {
  width: 20rem;
  margin-right: 2px;
  margin-left: 2px;
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  cursor: auto;
}
#myDraggableItems {
  width: 9rem;
  margin-right: 2px;
  background-color: rgb(40, 44, 52);
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  cursor: auto;
}
.introductionEditor,
.questionEditor {
  border: 1px solid black;
  height: 50%;
  border-radius: 20px;
}
</style>

<style>
body {
  margin: 0;
}
</style>
