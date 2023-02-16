export type Node = {
  id: string
  type: string
  outputId: string
  inputId: string
  introduction: string
  question: string
  children: [Node]
}

export type  NodeTree = {
  nodes: [Node]
  connections: [string]
}

export type BakLavaState = {
  nodeTree: NodeTree
  showModal: boolean
  jsonDataTree: string
}


export const state = (): BakLavaState => ({
  // définir comment on construit notre tree
  nodeTree: {
    nodes: [],
    connections: [],
  },
  jsonDataTree: '' as string,
  showModal: false as boolean,
})

export default state
