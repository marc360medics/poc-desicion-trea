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

function test(nodes, data) {
  let isFind = false
  // bug ici
  nodes.forEach((node) => {
    if(node.id === data.id) {
      isFind = true
      return
    }
    if(node.children.length) {
      test(node.children, data)
    }
  })
  return isFind
}

export const mutations = {
  // remplacer les any
  SET_NODE_TREE(state: State, data: Node) {

    // ici on a un bug
   const isFind = test(state.nodeTree.nodes, data)

    console.log(isFind)

    if (!isFind) {
      state.nodeTree.nodes.push(data)
    }
  },

  SET_SHOW_MODAL(state: State, isShow: boolean) {
    state.showModal = isShow
  },
  SET_JSON_DATA_TREE(state: State, tree: any) {
    state.nodeTree.connections = tree.connections
    if(tree.connections.length) {
      state.nodeTree.nodes.forEach((node) => {
        testGetTree(state, node)
      })
    }
  },
}

function testGetTree (state: State, node: Node) {
  state.nodeTree.connections.forEach((item: any) => {
    if(node.outputId === item.from) {
      getChildrenMatch(state, node, item)
    }
  })
}

function getChildrenMatch (state, element, item) {
  state.nodeTree.nodes.forEach((node) => {
    if(item.to === node.inputId) {
      element.children.push(node)
     const index = state.nodeTree.nodes.findIndex((el) => el.id === node.id )
     state.nodeTree.nodes.splice(index, 1)
    }
  })
}
