interface Node {
  id: string
  type: string
  outputId: string
  inputId: string
  introduction: string
  question: string
  children: [Node]
}
interface NodeTree {
  nodes: [Node]
  connections: [string]
}
interface State {
  nodeTree: NodeTree
  showModal: boolean
  jsonDataTree: string
}

export const state = () => ({
  // définir comment on construit notre tree
  nodeTree: {
    nodes: [],
    connections: [],
  },
  jsonDataTree: '' as string,
  showModal: false as boolean,
})

export const mutations = {
  // remplacer les any
  SET_NODE_TREE(state: State, data: Node) {
    let isFind;

    (function findElement(data: Node) {
      state.nodeTree.nodes.forEach((el) => {
        if (el.id === data.id) {
          isFind = el
          return
        }
        if (el.children) {
          el.children.forEach((children) => {
            return findElement(children)
          })
        }
      })
    })(data)

    if (!isFind) {
      state.nodeTree.nodes.push(data)
    }
  },

  SET_SHOW_MODAL(state: State, isShow: boolean) {
    state.showModal = isShow
  },
  SET_JSON_DATA_TREE(state: State, tree: string) {
    state.jsonDataTree = tree
  },
}
