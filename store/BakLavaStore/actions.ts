import { Store } from 'vuex'
import { BakLavaState, Node } from './state'

export function findNode(store: Store<BakLavaState>, data) {
  const isFind =  test(store.state.nodeTree.nodes, data)
  console.log(isFind, 'find')
  if(!isFind) {
    store.commit('SET_NODE_TREE', data)
  }
}

// @TODO: any a changer

function test(nodes: any, data: any): boolean {
 let isFind = false
  nodes.forEach( (node: Node) => {
    if (node.id === data.id) {
      isFind = true
      return
    }
    if (node.children.length) {
         isFind = test(node.children, data)
    }
  })
  return isFind
}
