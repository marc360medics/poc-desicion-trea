import { BakLavaState, Node } from './state'

export function SET_NODE_TREE(state: BakLavaState, data: Node) {
  state.nodeTree.nodes.push(data)
}
export function SHOW_MODAL(state: BakLavaState, isShow: boolean) {
  state.showModal = isShow
}
export function SET_JSON_DATA_TREE(state: BakLavaState, tree: any) {

  state.nodeTree.connections = tree.connections

  if (tree.connections.length) {
    state.nodeTree.nodes.forEach((node) => {
      state.nodeTree.connections.forEach((item: any) => {
        if (node.outputId === item.from) {
          getChildrenMatch(state, node, item)
        }
      })
    })
  }
}

function getChildrenMatch(state: BakLavaState, element, item) {
  state.nodeTree.nodes.forEach((node) => {
    if (item.to === node.inputId) {
      element.children.push(node)
      const index = state.nodeTree.nodes.findIndex((el) => el.id === node.id)
      state.nodeTree.nodes.splice(index, 1)
    }
  })
}
